import { Router } from "express";

import { verifyToken, verifyAdminTeacher, verifyAdminOnly } from '../middleware/authMiddleware';
import { upload } from "../middleware/contentMiddleware";

import {
    getAllAdmins, getAllStudents, getAllTeachers, getAllUsers, getUserChatHistory,
    getUserDetails, loginUser, registerAdmin, registerTeacher, registerStudent, assignStudentsToCourse,
    assignTeachersToCourse, createCourse, getCourseInfo, getUserCourses, createAnnouncement,
    createDiscussionThread, createDiscussionThreadReply, viewSpecificDiscussionThread,
    createContent, viewAllContent, getNotificationsForUser, markNotificationAsRead
} from '../controllers';

import {
    validateCreateContent, validateCreateDiscussionThread, validateCreateDiscussionThreadReply,
    validateCreateAnnouncement, validateAssignStudentsToCourse, validateAssignTeachersToCourse,
    validateCreateCourse, validateRegisterAdmin, validateRegisterStudent, validateRegisterTeacher
} from "../validators";

const router = Router();

router.post('/auth/register/admin', validateRegisterAdmin, registerAdmin)
router.post('/auth/register/teacher', validateRegisterTeacher, registerTeacher)
router.post('/auth/register/student', validateRegisterStudent, registerStudent)

router.post('/auth/login', loginUser)

router.get('/user', verifyToken, getUserDetails)
router.get('/users', verifyToken, verifyAdminOnly, getAllUsers)
router.get('/users/admins', verifyToken, verifyAdminOnly, getAllAdmins)
router.get('/users/teachers', verifyToken, verifyAdminOnly, getAllTeachers)
router.get('/users/students', verifyToken, verifyAdminTeacher, getAllStudents)
router.get('/users/:userId/chat-history', verifyToken, getUserChatHistory)


router.post('/courses/', verifyToken, verifyAdminOnly, validateCreateCourse, createCourse);
router.get('/courses/', verifyToken, getUserCourses);
router.get('/courses/:courseCode', verifyToken, getCourseInfo);
router.post('/courses/:courseCode/assign-students', verifyToken, verifyAdminTeacher, validateAssignStudentsToCourse, assignStudentsToCourse);
router.post('/courses/:courseCode/assign-teachers', verifyToken, verifyAdminOnly, validateAssignTeachersToCourse, assignTeachersToCourse);

router.post('/courses/:courseCode/announcements', verifyToken, verifyAdminTeacher, validateCreateAnnouncement, createAnnouncement);

router.post('/courses/:courseCode/discussions', verifyToken, validateCreateDiscussionThread, createDiscussionThread);
router.get('/courses/discussions/:threadId', verifyToken, viewSpecificDiscussionThread);
router.put('/courses/discussions/:threadId', verifyToken, validateCreateDiscussionThreadReply, createDiscussionThreadReply);

router.post('/courses/:courseCode/content', verifyToken, verifyAdminTeacher, upload.array('files'), createContent);
router.get('/courses/content/all', verifyToken, viewAllContent);

router.get('/notifications', verifyToken, getNotificationsForUser);
router.delete('/notifications/:notificationId', verifyToken, markNotificationAsRead);

export default router