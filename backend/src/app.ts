import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import healthRoutes from './routes/health.js';
import userRoutes from './routes/userRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import campusRoutes from './campus-program/routes/campusRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/api/campus-program', campusRoutes);

// Serve Frontend Static Assets in Production (supporting root and subpaths)
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));
app.use('/provider_dashboard_v1', express.static(distPath));
app.use('/provider_pathways_dashboard_v1', express.static(distPath));
app.use('/provider_pathways_v2_testing', express.static(distPath));
app.use('/provider_pathways', express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next();
  });
});

// Error Middleware
app.use(errorHandler);

export default app;
