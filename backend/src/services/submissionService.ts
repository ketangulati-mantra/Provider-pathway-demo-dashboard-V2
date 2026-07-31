import { sql } from '../db/client.js';

export interface CreateSubmissionInput {
  userId: string;
  service?: string;
  lessonId: string;
  activityTitle: string;
  submissionType: string;
  formData?: Record<string, any> | any;
  submissionData?: Record<string, any> | any;
}

export interface GetSubmissionsQuery {
  page?: number;
  limit?: number;
  status?: string;
  lessonId?: string;
  submissionType?: string;
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export interface ReviewSubmissionInput {
  status: 'pending' | 'approved' | 'rejected' | string;
  reviewNotes?: string;
}

export const submissionService = {
  async createSubmission(input: CreateSubmissionInput) {
    const {
      userId,
      service,
      lessonId,
      activityTitle,
      submissionType,
      formData = {},
      submissionData = {},
    } = input;

    const jsonFormData = typeof formData === 'string' ? formData : JSON.stringify(formData);
    const jsonSubmissionData = typeof submissionData === 'string' ? submissionData : JSON.stringify(submissionData);

    const result = await sql`
      INSERT INTO activity_submissions (
        user_id,
        service,
        lesson_id,
        activity_title,
        submission_type,
        form_data,
        submission_data,
        status,
        created_at,
        updated_at
      )
      VALUES (
        ${userId},
        ${service || null},
        ${lessonId},
        ${activityTitle},
        ${submissionType},
        ${jsonFormData}::jsonb,
        ${jsonSubmissionData}::jsonb,
        'pending',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING *;
    `;

    return result[0];
  },

  async getAllSubmissions(options: GetSubmissionsQuery = {}) {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
    const offset = (page - 1) * limit;

    const status = options.status?.trim();
    const lessonId = options.lessonId?.trim();
    const submissionType = options.submissionType?.trim();
    const search = options.search?.trim();

    let submissions = await sql`
      SELECT * FROM activity_submissions
      ORDER BY created_at DESC;
    `;

    if (status) {
      submissions = submissions.filter((s: any) => s.status?.toLowerCase() === status.toLowerCase());
    }

    if (lessonId) {
      submissions = submissions.filter((s: any) => s.lesson_id === lessonId);
    }

    if (submissionType) {
      submissions = submissions.filter((s: any) => s.submission_type === submissionType);
    }

    if (search) {
      const q = search.toLowerCase();
      submissions = submissions.filter((s: any) =>
        s.activity_title?.toLowerCase().includes(q) ||
        s.user_id?.toLowerCase().includes(q) ||
        s.lesson_id?.toLowerCase().includes(q) ||
        JSON.stringify(s.form_data || {}).toLowerCase().includes(q) ||
        JSON.stringify(s.submission_data || {}).toLowerCase().includes(q)
      );
    }

    const sortBy = options.sortBy || 'created_at';
    const isAsc = options.order?.toUpperCase() === 'ASC';

    submissions.sort((a: any, b: any) => {
      let valA = a[sortBy] ?? a.created_at;
      let valB = b[sortBy] ?? b.created_at;
      if (valA instanceof Date) valA = valA.getTime();
      if (valB instanceof Date) valB = valB.getTime();

      if (valA < valB) return isAsc ? -1 : 1;
      if (valA > valB) return isAsc ? 1 : -1;
      return 0;
    });

    const totalRecords = submissions.length;
    const totalPages = Math.ceil(totalRecords / limit);
    const paginatedSubmissions = submissions.slice(offset, offset + limit);

    return {
      submissions: paginatedSubmissions,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },

  async getSubmissionById(id: string) {
    const rows = await sql`
      SELECT * FROM activity_submissions 
      WHERE id::text = ${id};
    `;
    return rows[0] || null;
  },

  async getSubmissionsByUser(userId: string) {
    return await sql`
      SELECT * FROM activity_submissions 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC;
    `;
  },

  async reviewSubmission(id: string, input: ReviewSubmissionInput) {
    const { status, reviewNotes } = input;
    const normalizedStatus = String(status || '').toLowerCase().trim();
    const validStatuses = ['pending', 'approved', 'rejected'];

    if (!validStatuses.includes(normalizedStatus)) {
      throw new Error(`Invalid status '${status}'. Must be one of: pending, approved, rejected`);
    }

    const rows = await sql`
      UPDATE activity_submissions
      SET 
        status = ${normalizedStatus},
        review_notes = ${reviewNotes !== undefined ? reviewNotes : null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id::text = ${id}
      RETURNING *;
    `;

    return rows[0] || null;
  }
};
