import { Router } from "express";
import { verifyAdminOnly, verifyToken } from '../middleware/authMiddleware';
import { updateEmbeddings } from "../controllers/utilityfunctions";

const router = Router();

router.get('/update_embeddings', verifyToken, verifyAdminOnly, updateEmbeddings);

export default router