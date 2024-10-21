import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const createCourseSchema = Joi.object({
    name: Joi.string().required(),
    courseCode: Joi.string().required(),
    description: Joi.string().required(),
});

export const validateCreateCourse = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createCourseSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};

export const assignTeachersToCourseSchema = Joi.object({
    teacherIds: Joi.array().items(Joi.string().required()).required(),
});

export const validateAssignTeachersToCourse = (req: Request, res: Response, next: NextFunction) => {
    const { error } = assignTeachersToCourseSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};

export const assignStudentsToCourseSchema = Joi.object({
    studentIds: Joi.array().items(Joi.string().required()).required(),
});

export const validateAssignStudentsToCourse = (req: Request, res: Response, next: NextFunction) => {
    const { error } = assignStudentsToCourseSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};

