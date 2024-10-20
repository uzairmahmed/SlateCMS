import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { _id:string, email: string, usertype: string; }
            files?: Express.Multer.File[];
        }
    }
}