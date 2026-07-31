import { sql } from '../db/client.js';

export async function setupDb() {
  console.log('⚡ Running Neon DB migrations/schema setup...');

  try {
    await sql`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
         NEW.updated_at = CURRENT_TIMESTAMP;
         RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        service VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS lesson_completions (
        id BIGSERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        service VARCHAR(50) NOT NULL,
        lesson_id VARCHAR(100) NOT NULL,
        reward_points INT DEFAULT 0,
        completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id BIGSERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        lesson_id VARCHAR(100) NOT NULL,
        progress_percent INT DEFAULT 0,
        video_watched BOOLEAN DEFAULT FALSE,
        quiz_done BOOLEAN DEFAULT FALSE,
        checklist_done BOOLEAN DEFAULT FALSE,
        scenario_attempted BOOLEAN DEFAULT FALSE,
        action_done BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_progress UNIQUE (user_id, lesson_id)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS campus_ambassador_applications (
        id BIGSERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        college_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'interested',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS certificate_logs (
        id BIGSERIAL PRIMARY KEY,
        certificate_id VARCHAR(100) UNIQUE NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        pathway_name VARCHAR(255) NOT NULL,
        certificate_url TEXT,
        metadata JSONB DEFAULT '{}'::jsonb,
        issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activity_submissions (
        id BIGSERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        service VARCHAR(50),
        lesson_id VARCHAR(100) NOT NULL,
        activity_title VARCHAR(255) NOT NULL,
        submission_type VARCHAR(100) NOT NULL,
        form_data JSONB DEFAULT '{}'::jsonb,
        submission_data JSONB DEFAULT '{}'::jsonb,
        status VARCHAR(50) DEFAULT 'pending',
        review_notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`ALTER TABLE activity_submissions ALTER COLUMN user_id TYPE VARCHAR(255) USING user_id::varchar;`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS lesson_id VARCHAR(100);`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS activity_title VARCHAR(255);`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS submission_type VARCHAR(100);`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS submission_data JSONB DEFAULT '{}'::jsonb;`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS review_notes TEXT;`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS service VARCHAR(50);`;
    await sql`ALTER TABLE activity_submissions ADD COLUMN IF NOT EXISTS form_data JSONB DEFAULT '{}'::jsonb;`;
    await sql`ALTER TABLE activity_submissions DROP COLUMN IF EXISTS provider_uid;`;
    await sql`ALTER TABLE activity_submissions DROP COLUMN IF EXISTS upa_id;`;

    await sql`ALTER TABLE certificate_logs ADD COLUMN IF NOT EXISTS certificate_url TEXT;`;
    await sql`ALTER TABLE certificate_logs ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;`;

    console.log('✅ Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Error executing database setup:', error);
    throw error;
  }
}

if (process.argv[1]?.endsWith('setupDb.ts') || process.argv[1]?.endsWith('setupDb.js')) {
  setupDb().then(() => process.exit(0)).catch(() => process.exit(1));
}
