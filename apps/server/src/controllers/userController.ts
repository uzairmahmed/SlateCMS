import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { User } from '../models/userModels';

// Source: https://medium.com/@ravipatel.it/building-a-secure-user-registration-and-login-api-with-express-js-mongodb-and-jwt-10b6f8f3741d

dotenv.config();
const jwtSecret = process.env.JWT_SECRET || 'uzair';

export const registerUser = async (req: Request, res: Response) => {
    /*
    Registers a user with the system.
    JSON Body:
    {
        "email": <email>,
        "password": <password>
    }
    */
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email address already exists" })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    /*
   Logs a user in with the system and returns the user information.
   JSON Body:
   {
       "email": <email>,
       "password": <password>
   }
   */
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token, user: { email: user.email } }); // Need to add more variables here for user role etc etc
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getUserDetails = async (req: Request, res: Response) => {
    /*
        Retrieves a user's details based on provided email.
        Needs Authenticated Bearer Token
        Query Params: "email": <email>
    */
    const query = req.query.email
    try {
        const user = await User.findOne({ email: query })
        if (!user) {
            return res.status(404).json({ error: 'User Not Found' });
        }
        res.status(200).json({ email: user.email });  // Need to add more variables here for user role etc etc
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}