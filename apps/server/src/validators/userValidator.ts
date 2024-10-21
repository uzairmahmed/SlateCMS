import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const registerAdminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    phone: Joi.string().optional(),
});

export const validateRegisterAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerAdminSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};

export const registerTeacherSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    phone: Joi.string().optional(),
});

export const validateRegisterTeacher = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerTeacherSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};

export const registerStudentSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    phone: Joi.string().optional(),
});

export const validateRegisterStudent = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerStudentSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    next();
};
