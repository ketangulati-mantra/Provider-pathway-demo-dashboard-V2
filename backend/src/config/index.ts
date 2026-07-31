import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend-specific .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const isProd = process.env.NODE_ENV === 'production';
const targetPort = process.env.PORT ? parseInt(process.env.PORT, 10) : (isProd ? 80 : 5000);

export const config = {
  port: targetPort,
  databaseUrl: process.env.DATABASE_URL || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  }
};

if (!config.databaseUrl) {
  console.warn('⚠️ Warning: DATABASE_URL is not defined in backend/.env');
}
