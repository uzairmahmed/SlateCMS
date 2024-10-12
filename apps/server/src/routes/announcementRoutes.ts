import { Router } from "express";
import { createAnnouncement, viewAnnouncementsByCourse } from "../controllers/announcementController";
import { verifyAdminOnly, verifyAdminTeacher, verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/:courseCode/announcements', verifyToken, verifyAdminTeacher, createAnnouncement);
router.get('/:courseCode/announcements', verifyToken, viewAnnouncementsByCourse);

export default router