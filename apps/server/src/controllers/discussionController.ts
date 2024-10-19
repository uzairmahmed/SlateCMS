import { Request, Response } from 'express';
import { Course } from "../models/courseModels";
import { DiscussionThread, DiscussionReply } from "../models/discussionModels";
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '../models/notificationModels';
import { openAIEmbedding } from '../main';

export const createDiscussionThread = async (req: Request, res: Response) => {
    /*
    Creates a new discussion thread for a course.
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

        const newThread = new DiscussionThread({
            uid: uuidv4(),
            title,
            message,
            date: new Date(),
            author: req.user._id,
            replies: [],
            embedding: embedding
        });

        await newThread.save();

        course.discussions.push(newThread._id);
        await course.save();

        await Notification.create({
            type: 'discussion',
            message: `New discussion thread: ${newThread.title}`,
            course: course._id,
            recipients: course.students.map(user => user._id),
        })

        res.status(201).json(newThread);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const viewDiscussionThreadsByCourse = async (req: Request, res: Response) => {
    /*
    View discussion threads given a course id
    - includeReplies: Boolean to include replies in the response.
    */
    try {
        const { courseCode } = req.params;
        const course = await Course.findOne({ courseCode: courseCode }).populate({
            path: 'discussions',
            populate: [
                { path: 'replies', populate: { path: 'author', select: 'name email' } },
                { path: 'author', select: 'name email' }
            ]
        });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course.discussions);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const viewSpecificDiscussionThread = async (req: Request, res: Response) => {
    /*
    View a specific discussion given a thread ID.
    - includeReplies: Boolean to include replies in the response.
    */
    try {
        const { threadId } = req.params;

        const discussionThread = await DiscussionThread.findById(threadId)
            .populate([
                { path: 'replies', populate: { path: 'author', select: 'name email' } },
                { path: 'author', select: 'name email' }
            ]);

        if (!discussionThread) {
            return res.status(404).json({ error: 'Discussion thread not found' });
        }

        res.status(200).json(discussionThread);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createDiscussionThreadReply = async (req: Request, res: Response) => {
    /*
    Replies to a thread.
    JSON Body:
    {
        "message": <message>
    }
    */
    try {
        const { message } = req.body;
        const { threadId } = req.params;

        if (!message) {
            return res.status(400).json({ error: 'Message are required' });
        }

        const discussionThread = await DiscussionThread.findById(threadId);
        if (!discussionThread) {
            return res.status(404).json({ error: 'Discussion thread not found' });
        }

        const embedding = await openAIEmbedding.embedQuery(message);

        const newReply = new DiscussionReply({
            uid: uuidv4(),
            thread: threadId,
            message,
            author: req.user._id,
            date: new Date(),
            embedding: embedding
        });

        await newReply.save();

        // Add the reply to the discussion thread
        discussionThread.replies.push(newReply._id);
        await discussionThread.save();

        // await Notification.create({
        //     type: 'discussionreply',
        //     message: `New reply to "${discussionThread.title}"`,
        //     course: course._id,
        //     recipients: course.students.map(user => user._id),
        // })

        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
