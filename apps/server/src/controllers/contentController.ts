import { Request, Response } from 'express';
import { Course } from '../models/courseModels';
import { Content } from '../models/contentModels';
import { v4 as uuidv4 } from 'uuid';
import { createNotification } from './notificationController';
import { bucket, openAIEmbedding } from '../main';

export const createContent = async (req: Request, res: Response) => {
    /*
    Creates a new content given a course ID.
    JSON Body:
    {
        "title": <title>,
        "document": <rich text content>,
        "files": [<files>],
        "links": [<links>]
    }
    */
    try {
        const { title, document, links } = req.body;
        const { files } = req;

        const { courseCode } = req.params;
        const MAX_FILE_SIZE = 250 * 1024 * 1024;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const course = await Course.findOne({ courseCode: courseCode })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        
        const fileUrls = [];
        if (files && files.length > 0) {
            for (const file of files) {
                if (file.size > MAX_FILE_SIZE) {
                    return res.status(400).json({ error: `File "${file.name}" exceeds the 250MB size limit.` });
                }
                const blobName = `${Date.now()}-${file.originalname}`;
                const blob = bucket.file(blobName);

                const blobStream = blob.createWriteStream({
                    resumable: false,
                    contentType: 'auto', 
                });

                blobStream.on('error', (err) => {
                    throw new Error('File upload error: ' + err.message);
                });

                await new Promise((resolve, reject) => {
                    blobStream.on('finish', resolve);
                    blobStream.end(file.buffer);
                });

                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                fileUrls.push(publicUrl);
            }
        }


        const embedding = await openAIEmbedding.embedDocuments([document]);

        const newContent = new Content({
            uid: uuidv4(),
            title,
            document,
            embedding: embedding[0],
            author: req.user._id,
            files: fileUrls,
            links: JSON.parse(links)

        });

        await newContent.save();

        course.content.push(newContent._id);
        await course.save();

        createNotification('content', `New content: ${newContent.title}`, course._id, course.students.map(user => user._id))

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