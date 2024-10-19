import { Request, Response } from 'express';
import { Notification } from "../models/notificationModels";
import mongoose from 'mongoose';
import { User } from '../models/userModels';

export const getNotificationsForUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'notifications',
            populate: { path: 'course', select: 'courseCode' }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.notifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createNotification = async (notType: string, message: string, courseId: mongoose.Types.ObjectId, recipients: any[]) => {
    const notification = await Notification.create({
        type: notType,
        message: message,
        course: courseId,
    });

    await User.updateMany(
        { _id: { $in: recipients } },
        { $push: { notifications: notification._id } }
    );

};

export const markNotificationAsRead = async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { notifications: notificationId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}