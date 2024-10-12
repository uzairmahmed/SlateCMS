import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config()
const jwtSecret = process.env.JWT_SECRET || 'uzair';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded as { email: string };
        next();
    })
}