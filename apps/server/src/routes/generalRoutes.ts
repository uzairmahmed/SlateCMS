import { Router } from "express";
import { verifyAdminOnly, verifyToken } from '../middleware/authMiddleware';
import { filterAndAnswer } from "../controllers/generalController";

const router = Router();

router.post('/knowledge/search', verifyToken, verifyAdminOnly, filterAndAnswer);

export default router