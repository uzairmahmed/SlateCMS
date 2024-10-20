import { Router } from "express";
import { createContent, viewAllContent, viewContentByCourse } from "../controllers/contentController";
import { verifyAdminOnly, verifyAdminTeacher, verifyToken } from '../middleware/authMiddleware';
import { upload } from "../middleware/contentMiddleware";

const router = Router();

router.post('/:courseCode/content', verifyToken, verifyAdminTeacher, upload.array('files'), createContent);
router.get('/:courseCode/content', verifyToken, viewContentByCourse);
router.get('/content/all', verifyToken, viewAllContent);

export default router