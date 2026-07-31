import { neon } from '@neondatabase/serverless';
import { config } from '../config/index.js';

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is missing in backend configuration.');
}

export const sql = neon(config.databaseUrl);
