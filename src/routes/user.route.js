// filepath: src/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.get('/',(req, res)=> {
    res.send('Version 1.0 of the API');
})
export default router;