import { Router } from "express";
import { createContent, searchContent, viewAllContent, viewContentByCourse } from "../controllers/contentController";
import { verifyAdminOnly, verifyAdminTeacher, verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/:courseCode/content', verifyToken, verifyAdminTeacher, createContent);
router.get('/:courseCode/content', verifyToken, viewContentByCourse);
router.get('/content/all', verifyToken, viewAllContent);
router.get('/content/search', verifyToken, searchContent);

export default router