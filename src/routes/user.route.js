// filepath: src/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users/me', authenticate, getCurrentUser);
export default router;