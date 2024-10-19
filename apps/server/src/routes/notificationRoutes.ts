import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware';
import { getNotificationsForUser, markNotificationAsRead } from "../controllers/notificationController";

const router = Router();

router.get('/notifications', verifyToken, getNotificationsForUser);
router.delete('/notifications/:notificationId', verifyToken, markNotificationAsRead);

export default router