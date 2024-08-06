import express from 'express';
import { loginUser, registerUser, getUserRole } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

let userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/role', authMiddleware, getUserRole);

export default userRouter;