import { Router } from 'express';
import { userController } from '../controllers/userController.js';

const router = Router();

router.post('/', userController.upsertUser);
router.get('/:userId', userController.getUser);

export default router;
