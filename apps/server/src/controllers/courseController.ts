import { Request, Response } from 'express';
import { Course } from '../models/courseModels';
import { Content } from '../models/contentModels';
import { Student, Teacher, User } from '../models/userModels';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export const getAllCourses = async (req: Request, res: Response) => {
    /*
    gets a list of all courses.
    */
    try {
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

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

        const newCourse = new Course({
            name,
            courseCode,
            uid: uuidv4(),
            description,
            announcements: [],
            content: [],
            discussions: [],
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
            .populate('announcements')
            .populate('content')
            .populate({
                path: 'discussions',
                populate: {
                    path: 'replies',
                    model: 'DiscussionReply',
                },
            });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCourseInfoWithUsers = async (req: Request, res: Response) => {
    /*
    course information including announcements, content, and discussions, and teachers and students
    */
    try {
        const { courseCode } = req.params;
        const course = await Course.findOne({ courseCode: courseCode })
            .populate('announcements')
            .populate('content')
            .populate({
                path: 'discussions',
                populate: {
                    path: 'replies',
                    model: 'DiscussionReply',
                },
            });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const students = await Student.find({ courses: course._id });
        const teachers = await Teacher.find({ courses: course._id });
        const detailedCourseInfo = {
            ...course.toObject(),
            students,
            teachers,
        };


        res.status(200).json(detailedCourseInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const editCourse = async (req: Request, res: Response) => {
    /*
    Edits the course infromation.
    JSON Body:
    {
        "name": <course name>,
        "description": <course description>
    }
    */
    try {
        const { courseCode } = req.params;
        const { name, description } = req.body;

        const updatedCourse = await Course.findOneAndUpdate(
            { courseCode: courseCode },
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
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
            { $addToSet: { students: { $each: studentIds } } }
        );


        const updatedStudents = await Student.updateMany(
            { _id: { $in: studentIds } },
            { $addToSet: { courses: course._id } }
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
            { $addToSet: { teachers: { $each: teacherIds } } }
        );

        const updatedTeachers = await Teacher.updateMany(
            { _id: { $in: teacherIds } },
            { $addToSet: { courses: course._id } }
        );

        res.status(200).json({ message: 'Teachers assigned successfully', updatedTeachers });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
