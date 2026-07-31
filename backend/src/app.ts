import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.js';
import userRoutes from './routes/userRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes & Health Checks
app.use('/api', healthRoutes);
app.use('/api', submissionRoutes);
app.use('/api', uploadRoutes);
app.use('/api', certificateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
