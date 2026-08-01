import { sql } from '../backend/dist/db/client.js';

async function test() {
  try {
    const res = await sql`SELECT NOW()`;
    console.log('✅ Connected to Neon DB successfully:', res);
  } catch (err) {
    console.error('❌ Failed to query Neon DB:', err);
  }
}

test();
