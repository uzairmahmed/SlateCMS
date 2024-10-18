import { Request, Response } from 'express';
import { Course } from '../models/courseModels';
import { Content } from '../models/contentModels';
import { v4 as uuidv4 } from 'uuid';
import { createNotification } from './notificationController';

export const createContent = async (req: Request, res: Response) => {
    /*
    Creates a new content given a course ID.
    JSON Body:
    {
        "title": <title>,
        "document": <docuuemtn>
    }
    */
    try {
        const { title, document } = req.body;
        const { courseCode } = req.params;

        if (!title || !document) {
            return res.status(400).json({ error: 'Title and document are required' });
        }

        const course = await Course.findOne({ courseCode: courseCode })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }


        const newContent = new Content({
            uid: uuidv4(),
            title,
            document,
            // embedding: ???,
            author: req.user._id
        });

        // Save the new announcement
        await newContent.save();

        // Add the announcement to the course
        course.content.push(newContent._id);
        await course.save();

        createNotification('content', `New content posted: ${newContent.title}`, course._id, course.students.map(user => user._id))
        res.status(201).json(newContent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const viewContentByCourse = async (req: Request, res: Response) => {
    /*
    View content given a course id
    */
    try {
        const { courseCode } = req.params;
        const course = await Course.findOne({ courseCode: courseCode }).populate({
            path: 'content',
            populate: [
                { path: 'author', select: 'name email' }
            ]
        });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course.content);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const viewAllContent = async (req: Request, res: Response) => {
    /*
    View content given a course id
    */
    try {
        const contents = await Content.find().populate({ path: 'author', select: 'name email' })

        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const searchContent = async (req: Request, res: Response) => {
    // ???
}