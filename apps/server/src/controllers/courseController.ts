import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

import { bucket, openAIEmbedding } from '../main';

import { Course, Student, Teacher} from '../models';

export const getUserCourses = async (req: Request, res: Response) => {
    /*
    gets a list of all courses that a user signs up for
    JSON Body:
    {
        "userID": <user ID>,
        "userType": <userType>
    }    
    */
    try {
        const { userId, userType } = req.query;
        const objectId = new mongoose.Types.ObjectId(userId as string);

        let courses = []

        if (userType === "admin") {
            courses = await Course.find()
        } else if (userType === 'teacher') {
            courses = await Course.find({ teachers: { $in: [objectId] } })
        } else {
            courses = await Course.find({ students: { $in: [objectId] } })
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    /*
    creates a new course.
    JSON Body:
    {
        "name": <course name>,
        "uid": <course unique identifier>,
        "description": <course description>
    }
    */
    try {
        const { name, courseCode, description } = req.body
        if (!name || !courseCode || !description) {
            return res.status(400).json({ error: 'Name, Course Code, and description are required' });
        }

        const embedding = await openAIEmbedding.embedDocuments([description]);

        const newCourse = new Course({
            name,
            courseCode,
            uid: uuidv4(),
            description,
            announcements: [],
            content: [],
            discussions: [],
            embedding: embedding
        })

        await newCourse.save()
        res.status(201).json(newCourse)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getCourseInfo = async (req: Request, res: Response) => {
    /*
    course information including announcements, content, and discussions.
    */
    try {
        const { courseCode } = req.params;
        const course = await Course.findOne({ courseCode: courseCode })
            .populate({
                path: 'announcements',
                populate: [
                    { path: 'author', select: 'name email' }
                ],
            })
            .populate({
                path: 'content',
                populate: [
                    { path: 'author', select: 'name email' }
                ],
            })
            .populate({
                path: 'discussions',
                populate: [
                    { path: 'author', select: 'name email' }
                ],
            });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        let courseObj = course.toObject()
        
        delete courseObj.embedding;
        
        courseObj.announcements.forEach((announcement: any) => {
            delete announcement.embedding;
        });

        courseObj.discussions.forEach((discussion: any) => {
            delete discussion.embedding;
        });

        courseObj.content = await Promise.all(courseObj.content.map(async (content: any) => {
            delete content.embeddings;
            if (content.files && content.files.length > 0) {
                const signedUrls = [];
                for (const fileUrl of content.files) {
                    const fileName = fileUrl.split('/').pop();
                    const file = bucket.file(fileName);
        
                    const [signedUrl] = await file.getSignedUrl({
                        action: 'read',
                        expires: Date.now() + 360 * 60 * 1000, // 6 hours
                    });
        
                    signedUrls.push(signedUrl);
                }
                content.files = signedUrls; 
            }
            return content;
        }));
        
        res.status(200).json(courseObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const assignStudentsToCourse = async (req: Request, res: Response) => {
    /*
    Assigns students to a course.
    JSON Body:
    {
        "studentIds": [<student_id_1>, <student_id_2>, ...]
    }
    */
    try {
        const { courseCode } = req.params;
        const { studentIds } = req.body;

        const course = await Course.findOne({ courseCode: courseCode })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        await Course.updateOne(
            { courseCode: courseCode },
            { $set: { students: studentIds } }
        );


        const updatedStudents = await Student.updateMany(
            { _id: { $in: studentIds } },
            { $addToSet: { courses: course._id } }
        );

        await Student.updateMany(
            { _id: { $nin: studentIds }, courses: course._id },
            { $pull: { courses: course._id } }
        );

        res.status(200).json({ message: 'Students assigned successfully', updatedStudents });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const assignTeachersToCourse = async (req: Request, res: Response) => {
    /*
    Assigns teachers to a course.
    JSON Body:
    {
        "teacherIds": [<teacher_id_1>, <teacher_id_2>, ...]
    }
    */
    try {
        const { courseCode } = req.params;
        const { teacherIds } = req.body;

        const course = await Course.findOne({ courseCode: courseCode })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        await Course.updateOne(
            { courseCode: courseCode },
            { $set: { teachers: teacherIds } }
        );

        const updatedTeachers = await Teacher.updateMany(
            { _id: { $in: teacherIds } },
            { $addToSet: { courses: course._id } }
        );

        await Teacher.updateMany(
            { _id: { $nin: teacherIds }, courses: course._id },
            { $pull: { courses: course._id } }
        );

        res.status(200).json({ message: 'Teachers assigned successfully', updatedTeachers });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
