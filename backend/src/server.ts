import app from './app.js';
import { config } from './config/index.js';

process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception caught to keep server alive:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Provider Pathways Backend server running on port ${PORT}`);
});
