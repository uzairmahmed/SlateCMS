import { Router } from "express";
import { createCourse, assignStudentsToCourse, assignTeachersToCourse, editCourse, getCourseInfo, getAllCourses, getCourseInfoWithUsers } from '../controllers/courseController';
import { verifyAdminOnly, verifyAdminTeacher, verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdminOnly, createCourse);
router.get('/', verifyToken, getAllCourses);
router.post('/:courseCode/assign-students', verifyToken, verifyAdminTeacher, assignStudentsToCourse);
router.post('/:courseCode/assign-teachers', verifyToken, verifyAdminOnly, assignTeachersToCourse);
router.put('/:courseCode/edit', verifyToken, verifyAdminTeacher, editCourse);
router.get('/:courseCode', verifyToken, getCourseInfo);
router.get('/:courseCode/users', verifyToken, verifyAdminTeacher, getCourseInfoWithUsers);

export default router