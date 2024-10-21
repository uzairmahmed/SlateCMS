import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const createAnnouncementSchema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
});

export const validateCreateAnnouncement = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createAnnouncementSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};
