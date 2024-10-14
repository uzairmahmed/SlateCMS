import { Request, Response } from 'express';
import { Course } from '../models/courseModels';
import { Announcement } from '../models/announcementModels';
import { v4 as uuidv4 } from 'uuid';


export const createAnnouncement = async (req: Request, res: Response) => {
    /*
    Creates a new announcement given a course ID.
    JSON Body:
    {
        "title": <title>,
        "message": <message>
    }
    */
    try {
        const { title, message } = req.body;
        const { courseCode } = req.params;
        console.log("req.user._id");
        console.log(req.user);
        console.log("req.user._id");


        if (!title || !message) {
            return res.status(400).json({ error: 'Title and message are required' });
        }

        const course = await Course.findOne({ courseCode: courseCode })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const newAnnouncement = new Announcement({
            uid: uuidv4(),
            title,
            message,
            date: new Date(),
            author: req.user._id
        });

        // Save the new announcement
        await newAnnouncement.save();

        // Add the announcement to the course
        course.announcements.push(newAnnouncement._id);
        await course.save();

        res.status(201).json(newAnnouncement);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const viewAnnouncementsByCourse = async (req: Request, res: Response) => {
    /*
    View all announcements given a course ID.
    */
    try {
        const { courseCode } = req.params;

        const course = await Course.findOne({ courseCode: courseCode }).populate({
            path: 'announcements',
            populate: [
                { path: 'author', select: 'name email' }
            ]
        });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course.announcements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
