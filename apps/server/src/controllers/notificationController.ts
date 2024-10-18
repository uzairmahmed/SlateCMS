import { Request, Response } from 'express';
import { Notification } from "../models/notificationModels";
import mongoose from 'mongoose';

export const getNotificationsForUser = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ recipients: req.user._id }).populate(
            { path: 'course', select: 'courseCode' }
        );
        res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createNotification = async (notType: string, message: string, courseId: mongoose.Types.ObjectId, recipients: any[]) => {
    await Notification.create({
        type: notType,
        message: message,
        course: courseId,
        recipients: recipients,
    });
};
