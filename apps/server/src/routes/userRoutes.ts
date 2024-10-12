import { Router } from "express";
import { getUserDetails, loginUser, registerUser } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)

router.get('/user', verifyToken, getUserDetails)

export default router