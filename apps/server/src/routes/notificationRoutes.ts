import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware';
import { getNotificationsForUser } from "../controllers/notificationController";

const router = Router();

router.get('/notifications', verifyToken, getNotificationsForUser);

export default router