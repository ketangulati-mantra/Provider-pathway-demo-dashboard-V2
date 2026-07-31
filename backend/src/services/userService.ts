import { sql } from '../db/client.js';

export interface UserInput {
  userId: string;
  name?: string;
  email?: string;
  service?: string;
}

export const userService = {
  async upsertUser(input: UserInput) {
    const { userId, name, email, service } = input;
    const result = await sql`
      INSERT INTO users (user_id, name, email, service, updated_at)
      VALUES (${userId}, ${name || null}, ${email || null}, ${service || null}, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        service = EXCLUDED.service,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    return result[0];
  },

  async getUserById(userId: string) {
    const result = await sql`
      SELECT * FROM users WHERE user_id = ${userId};
    `;
    return result[0] || null;
  }
};
