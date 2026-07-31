import { Router } from 'express';
import { submissionController } from '../controllers/submissionController.js';

const router = Router();

// GET /api/activity-submissions/export/csv - Download all submissions in CSV format (Excel & Google Sheets compatible)
router.get('/activity-submissions/export/csv', submissionController.exportSubmissionsCSV);

// POST /api/activity-submissions - Create new activity submission
router.post('/activity-submissions', submissionController.createSubmission);

// GET /api/activity-submissions - List submissions with pagination, filtering, searching & sorting
router.get('/activity-submissions', submissionController.getAllSubmissions);

// GET /api/activity-submissions/user/:userId - Get submissions for specific user
router.get('/activity-submissions/user/:userId', submissionController.getSubmissionsByUser);

// GET /api/activity-submissions/:id - Get single submission by ID
router.get('/activity-submissions/:id', submissionController.getSubmissionById);

// PATCH & PUT /api/activity-submissions/:id/review - Review submission (approve, reject, add notes)
router.patch('/activity-submissions/:id/review', submissionController.reviewSubmission);
router.put('/activity-submissions/:id/review', submissionController.reviewSubmission);
router.patch('/activity-submissions/:id/status', submissionController.reviewSubmission);

export default router;
