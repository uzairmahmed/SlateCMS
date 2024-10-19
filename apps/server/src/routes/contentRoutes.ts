import { Router } from "express";
import { createContent, viewAllContent, viewContentByCourse } from "../controllers/contentController";
import { verifyAdminOnly, verifyAdminTeacher, verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/:courseCode/content', verifyToken, verifyAdminTeacher, createContent);
router.get('/:courseCode/content', verifyToken, viewContentByCourse);
router.get('/content/all', verifyToken, viewAllContent);

export default router