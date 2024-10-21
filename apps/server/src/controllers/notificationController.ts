import { Request, Response } from 'express';

import { User } from '../models';

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