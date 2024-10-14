import { Request, Response } from 'express';
import { Notification } from "../models/notificationModels";

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
