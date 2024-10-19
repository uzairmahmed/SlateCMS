import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { User } from '../models/userModels';

// Source: https://medium.com/@ravipatel.it/building-a-secure-user-registration-and-login-api-with-express-js-mongodb-and-jwt-10b6f8f3741d

dotenv.config();
const jwtSecret = process.env.JWT_SECRET || 'uzair';

export const registerAdmin = async (req: Request, res: Response) => {
    /*
    Registers a new admin.
    JSON Body:
    {
        "email": <email>,
        "password": <password>,
        "name": <name>,
        "phone": <phone>
    }
    */
    try {
        const { email, password, name, phone } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Name, Email, and Password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email address already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = new User({
            email,
            password: hashedPassword,
            name,
            phone: phone || "",
            usertype: "admin",
            uid: uuidv4()
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const registerTeacher = async (req: Request, res: Response) => {
    /*
    Registers a new teacher.
    JSON Body:
    {
        "email": <email>,
        "password": <password>,
        "name": <name>,
        "phone": <phone>
    }
    */
    try {
        const { email, password, name, phone } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Name, Email, and Password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email address already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newTeacher = new User({
            email,
            password: hashedPassword,
            name,
            phone: phone || "",
            usertype: "teacher",
            uid: uuidv4()
        });

        await newTeacher.save();

        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const registerStudent = async (req: Request, res: Response) => {
    /*
    Registers a new student.
    JSON Body:
    {
        "email": <email>,
        "password": <password>,
        "name": <name>,
        "phone": <phone>
    }
    */
    try {
        const { email, password, name, phone } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Name, Email, and Password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email address already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newStudent = new User({
            email,
            password: hashedPassword,
            name,
            phone: phone || "",
            usertype: "student",
            uid: uuidv4()
        });

        await newStudent.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



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

        const token = jwt.sign({ _id: user._id, email: user.email, usertype: user.usertype }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token, user: { _id: user._id, email: user.email, userType: user.usertype } }); // Need to add more variables here for user role etc etc
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
        res.status(200).json(user);  // Need to add more variables here for user role etc etc
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    /*
    gets a list of all users.
    */
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const getAllStudents = async (req: Request, res: Response) => {
    /*
    gets a list of all students.
    */
    try {
        const users = await User.find({ usertype: 'student' })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllTeachers = async (req: Request, res: Response) => {
    /*
    gets a list of all teachers.
    */
    try {
        const users = await User.find({ usertype: 'teacher' })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllAdmins = async (req: Request, res: Response) => {
    /*
    gets a list of all admins.
    */
    try {
        const users = await User.find({ usertype: 'admin' })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getUserChatHistory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('chatHistory');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.chatHistory);
    } catch (error) {
        console.error('Error retrieving chat history:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

