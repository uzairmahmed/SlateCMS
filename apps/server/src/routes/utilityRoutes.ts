import { Router } from "express";
import { verifyAdminOnly, verifyToken } from '../middleware/authMiddleware';

const router = Router();


export default router