// interfaces.ts

export interface User {
    _id: string;
    email: string;
    password: string;
    phone: string;
    name: string;
    usertype: 'student' | 'teacher' | 'admin';
    uid: string;
    courses: string[]; // Array of course IDs
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Message {
    from: string;
    msg: string;
}


export interface Announcement {
    _id: string;
    uid: string;
    title: string;
    message: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Content {
    _id: string;
    uid: string;
    title: string;
    document: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
    files: string[]; 
    links: string[]; 
    __v: number;
}

export interface DiscussionReply {
    _id: string;
    uid: string;
    thread: string;
    message: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Discussion {
    _id: string;
    uid: string;
    title: string;
    message: string;
    replies: DiscussionReply[];
    createdAt: string;
    updatedAt: string;
    author: Author;
    __v: number;
}

export interface Course {
    _id: string;
    uid: string;
    name: string;
    courseCode: string;
    description: string;
    announcements: Announcement[];
    content: Content[];
    discussions: Discussion[];
    createdAt: string;
    updatedAt: string;
}

export interface MinimalCourse {
    _id: string;
    uid: string;
    name: string;
    courseCode: string;
    description: string;
    announcements: string[];
    content: string[];
    discussions: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CourseWithUsers extends Course {
    students: User[];
    teachers: User[];
}

export interface Author {
    _id: string,
    email: string,
    name: string,
}