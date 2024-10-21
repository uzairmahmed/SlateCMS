import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const createDiscussionThreadSchema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
});

export const validateCreateDiscussionThread = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createDiscussionThreadSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};


export const createDiscussionThreadReplySchema = Joi.object({
    message: Joi.string().required(),
});

export const validateCreateDiscussionThreadReply = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createDiscussionThreadReplySchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};
