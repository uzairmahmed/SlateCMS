import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config()
const jwtSecret = process.env.JWT_SECRET || 'uzair';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded as { _id:string, email: string, usertype: string };
        next();
    })
}

export const verifyAdminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.usertype === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
};

export const verifyAdminTeacher = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && (req.user.usertype === 'admin' || req.user.usertype === 'teacher')) {
        next();
    } else {
        return res.status(403).json({ error: 'Access denied. Admins and Teachers only.' });
    }
};
