import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const createContentSchema = Joi.object({
    // title: Joi.string().required(),
    // document: Joi.string().optional(),
    // files: Joi.array().items(Joi.any().optional()),
    // links: Joi.array().items(Joi.string().uri().optional()),
});

export const validateCreateContent = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createContentSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};
