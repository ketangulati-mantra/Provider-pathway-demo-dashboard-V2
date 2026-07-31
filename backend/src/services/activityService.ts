import { sql } from '../db/client.js';

export interface CompleteActivityInput {
  userId: string;
  service: string;
  lessonId: string;
  rewardPoints?: number;
}

export interface ProgressInput {
  userId: string;
  lessonId: string;
  progressPercent: number;
  videoWatched?: boolean;
  quizDone?: boolean;
  checklistDone?: boolean;
  scenarioAttempted?: boolean;
  actionDone?: boolean;
}

export const activityService = {
  async completeActivity(input: CompleteActivityInput) {
    const { userId, service, lessonId, rewardPoints = 0 } = input;
    const result = await sql`
      INSERT INTO lesson_completions (user_id, service, lesson_id, reward_points, completed_at, updated_at)
      VALUES (${userId}, ${service}, ${lessonId}, ${rewardPoints}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET
        service = EXCLUDED.service,
        reward_points = EXCLUDED.reward_points,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    return result[0];
  },

  async getUserCompletions(userId: string) {
    return await sql`
      SELECT * FROM lesson_completions WHERE user_id = ${userId};
    `;
  },

  async saveProgress(input: ProgressInput) {
    const { 
      userId, lessonId, progressPercent, 
      videoWatched = false, quizDone = false, 
      checklistDone = false, scenarioAttempted = false, actionDone = false 
    } = input;

    const result = await sql`
      INSERT INTO user_progress (
        user_id, lesson_id, progress_percent, 
        video_watched, quiz_done, checklist_done, scenario_attempted, action_done, updated_at
      )
      VALUES (
        ${userId}, ${lessonId}, ${progressPercent}, 
        ${videoWatched}, ${quizDone}, ${checklistDone}, ${scenarioAttempted}, ${actionDone}, CURRENT_TIMESTAMP
      )
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET
        progress_percent = EXCLUDED.progress_percent,
        video_watched = EXCLUDED.video_watched,
        quiz_done = EXCLUDED.quiz_done,
        checklist_done = EXCLUDED.checklist_done,
        scenario_attempted = EXCLUDED.scenario_attempted,
        action_done = EXCLUDED.action_done,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    return result[0];
  },

  async getUserProgress(userId: string, lessonId: string) {
    const result = await sql`
      SELECT * FROM user_progress WHERE user_id = ${userId} AND lesson_id = ${lessonId};
    `;
    return result[0] || null;
  }
};
