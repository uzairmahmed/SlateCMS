import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { openAIEmbedding } from '../main';
import { createNotification } from '../utility';

import { Course, Announcement} from '../models/';

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

        if (!title || !message) {
            return res.status(400).json({ error: 'Title and message are required' });
        }

        const course = await Course.findOne({ courseCode: courseCode })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const embedding = await openAIEmbedding.embedQuery(message);

        const newAnnouncement = new Announcement({
            uid: uuidv4(),
            title,
            message,
            date: new Date(),
            author: req.user._id,
            embedding: embedding
        });

        await newAnnouncement.save();

        course.announcements.push(newAnnouncement._id);
        await course.save();

        createNotification('content', `New announcement: ${newAnnouncement.title}`, course._id, course.students.map(user => user._id))

        const announcementObj = newAnnouncement.toObject();
        delete announcementObj.embedding;

        res.status(201).json(announcementObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};