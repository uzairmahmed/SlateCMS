import { Router } from "express";
import { getAllAdmins, getAllStudents, getAllTeachers, getAllUsers, getUserChatHistory, getUserDetails, loginUser, registerAdmin, registerStudent, registerTeacher } from '../controllers/userController';
import { verifyToken, verifyAdminTeacher, verifyAdminOnly } from '../middleware/authMiddleware';

const router = Router();

router.post('/auth/register/admin', registerAdmin)
router.post('/auth/register/teacher', registerTeacher)
router.post('/auth/register/student', registerStudent)

router.post('/auth/login', loginUser)

router.get('/user', verifyToken, getUserDetails)
router.get('/users', verifyToken, verifyAdminOnly, getAllUsers)
router.get('/users/admins', verifyToken, verifyAdminOnly, getAllAdmins)
router.get('/users/teachers', verifyToken, verifyAdminOnly, getAllTeachers)
router.get('/users/students', verifyToken, verifyAdminTeacher, getAllStudents)
router.get('/users/:userId/chat-history', verifyToken, getUserChatHistory)

export default router