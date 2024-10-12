import { Router } from "express";
import {
    createDiscussionThread,
    viewDiscussionThreadsByCourse,
    viewSpecificDiscussionThread,
    createDiscussionThreadReply
} from '../controllers/discussionController';
import { verifyToken} from '../middleware/authMiddleware';

const router = Router();

router.post('/:courseCode/discussions', verifyToken, createDiscussionThread);
router.get('/:courseCode/discussions', verifyToken, viewDiscussionThreadsByCourse);
router.get('/discussions/:threadId', verifyToken, viewSpecificDiscussionThread);
router.put('/discussions/:threadId', verifyToken, createDiscussionThreadReply);

export default router;
