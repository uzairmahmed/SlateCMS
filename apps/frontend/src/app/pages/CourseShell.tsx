import { FC, useEffect, useState } from 'react';
import { BsChevronLeft } from "react-icons/bs";
import { CourseWithUsers } from '../interfaces';
import AnnouncementList from '../subpages/AnnouncementList';
import ContentList from '../subpages/ContentList';
import DiscussionList from '../subpages/DiscussionList';
import DiscussionThreadPage from '../subpages/DiscussionThreadPage';

interface CourseShellProps { }

const CourseShell: FC<CourseShellProps> = ({ }) => {
    const [course, setCourse] = useState<CourseWithUsers>();
    const [currentPage, setCurrentPage] = useState('home');

    const placeholderData: CourseWithUsers = {
        "_id": "670ab5ae9aee0686dde5ef02",
        "uid": "f1a325ad-7701-4217-b921-0e534792771b",
        "name": "Data Structures",
        "courseCode": "CPS305",
        "description": "Introduction to data structures and algorithms. Data structures covered will include stacks, queues, lists, trees, and graphs. Algorithm topics will include searching, sorting, hashing, algorithm design, greedy approaches, dynamic programming, recursion and complexity analysis.",
        "announcements": [
            {
                "_id": "670ac4812818df7f7e907d89",
                "uid": "30586b34-c031-4955-b73c-a8b2e595e143",
                "title": "Welcome!",
                "message": "Hi guys welcome to my class!!!",
                "author": "670a1a744bf36458f6f8c2bf",
                "createdAt": "2024-10-12T18:48:33.680Z",
                "updatedAt": "2024-10-12T18:48:33.680Z",
                "__v": 0
            },
            {
                "_id": "670aca1682e8a595641860f2",
                "uid": "8a161b5f-a44a-4d9b-8a0c-c948b8422b17",
                "title": "Welcome!!",
                "message": "Hi guys welcome to my class!!!",
                "author": "670a1a744bf36458f6f8c2bf",
                "createdAt": "2024-10-12T19:12:22.752Z",
                "updatedAt": "2024-10-12T19:12:22.752Z",
                "__v": 0
            }
        ],
        "content": [
            {
                "_id": "670ac678c80e9cf2a6945e17",
                "uid": "418cf2a9-7135-4860-8fa5-14a4990aff3c",
                "title": "Lesson 1",
                "message": "Intro to programming and cs",
                "documentURL": "https://www.uvm.edu/~cbcafier/itpacs/itpacs_cafiero.pdf",
                "author": "670a1a744bf36458f6f8c2bf",
                "createdAt": "2024-10-12T18:56:56.159Z",
                "updatedAt": "2024-10-12T18:56:56.159Z",
                "__v": 0
            },
            {
                "_id": "670aca0982e8a595641860ec",
                "uid": "aa448be6-a1df-4628-b4d9-5d6ba251b27d",
                "title": "Lesson 2",
                "message": "Intro to programming and cs",
                "documentURL": "https://www.uvm.edu/~cbcafier/itpacs/itpacs_cafiero.pdf",
                "author": "670a1a744bf36458f6f8c2bf",
                "createdAt": "2024-10-12T19:12:09.510Z",
                "updatedAt": "2024-10-12T19:12:09.510Z",
                "__v": 0
            }
        ],
        "discussions": [
            {
                "_id": "670ac197dec04a657db54b9f",
                "uid": "18e31c57-2cd7-4d52-bddd-10618c04069b",
                "title": "Question",
                "message": "Answer",
                "replies": [
                    {
                        "_id": "670ac39584d026c277a9bf1a",
                        "uid": "9e1580cf-8f75-4050-9bbc-25f69a5914bd",
                        "thread": "670ac197dec04a657db54b9f",
                        "message": "yes",
                        "author": "670a1a744bf36458f6f8c2bf",
                        "createdAt": "2024-10-12T18:44:37.996Z",
                        "updatedAt": "2024-10-12T18:44:37.996Z",
                        "__v": 0
                    }, {
                        "_id": "670ac39584d026c277a9bf1a",
                        "uid": "9e1580cf-8f75-4050-9bbc-25f69a5914bd",
                        "thread": "670ac197dec04a657db54b9f",
                        "message": "yes",
                        "author": "670a1a744bf36458f6f8c2bf",
                        "createdAt": "2024-10-12T18:44:37.996Z",
                        "updatedAt": "2024-10-12T18:44:37.996Z",
                        "__v": 0
                    }, {
                        "_id": "670ac39584d026c277a9bf1a",
                        "uid": "9e1580cf-8f75-4050-9bbc-25f69a5914bd",
                        "thread": "670ac197dec04a657db54b9f",
                        "message": "yes",
                        "author": "670a1a744bf36458f6f8c2bf",
                        "createdAt": "2024-10-12T18:44:37.996Z",
                        "updatedAt": "2024-10-12T18:44:37.996Z",
                        "__v": 0
                    }, {
                        "_id": "670ac39584d026c277a9bf1a",
                        "uid": "9e1580cf-8f75-4050-9bbc-25f69a5914bd",
                        "thread": "670ac197dec04a657db54b9f",
                        "message": "yes",
                        "author": "670a1a744bf36458f6f8c2bf",
                        "createdAt": "2024-10-12T18:44:37.996Z",
                        "updatedAt": "2024-10-12T18:44:37.996Z",
                        "__v": 0
                    },
                    {
                        "_id": "670ac9f582e8a595641860e5",
                        "uid": "d15ed65f-fa67-42dd-9cd8-0ec56d3be059",
                        "thread": "670ac197dec04a657db54b9f",
                        "message": "yes",
                        "author": "670a1a744bf36458f6f8c2bf",
                        "createdAt": "2024-10-12T19:11:49.177Z",
                        "updatedAt": "2024-10-12T19:11:49.177Z",
                        "__v": 0
                    }
                ],
                "createdAt": "2024-10-12T18:36:07.868Z",
                "updatedAt": "2024-10-12T19:11:49.242Z",
                "__v": 2
            }
        ],
        "createdAt": "2024-10-12T17:45:18.434Z",
        "updatedAt": "2024-10-12T19:12:22.784Z",
        "__v": 11,
        "students": [
            {
                "_id": "670a1a8a4bf36458f6f8c2c2",
                "email": "uzairmahmedstudent@gmail.com",
                "password": "$2a$12$5i6s.WGB7MhUcnK9p4jvr.GKwSeJS8B/03ZN781.fN2vSNkDXBBvW",
                "phone": "1231231234",
                "name": "Uzair Student",
                "usertype": "student",
                "uid": "9c0fb7af-650f-4f23-9eb0-baee8dea3046",
                "courses": [
                    "670ab5ae9aee0686dde5ef02"
                ],
                "createdAt": "2024-10-12T06:43:22.733Z",
                "updatedAt": "2024-10-12T19:12:58.700Z",
                "__v": 0
            },
            {
                "_id": "670aa123c3b48dc10ae85d07",
                "email": "uzairmahmedstudent2@gmail.com",
                "password": "$2a$12$TfERiqiQOyiXIvRm8ACfmuctpxhW7rQsrU8ojnVr/50wEDiM8tNMm",
                "phone": "1231231234",
                "name": "Uzair Student2",
                "usertype": "student",
                "uid": "24c74718-68d7-4eae-a38d-13698815d572",
                "courses": [
                    "670aa8d5b848e5bf62c670d9",
                    "670ab5ae9aee0686dde5ef02"
                ],
                "createdAt": "2024-10-12T16:17:39.659Z",
                "updatedAt": "2024-10-12T19:12:58.700Z",
                "__v": 0
            }
        ],
        "teachers": [
            {
                "_id": "670a1a644bf36458f6f8c2bc",
                "email": "uzairmahmedteacher@gmail.com",
                "password": "$2a$12$AuPatcTcqopdl7mnfsYtH..fhDUNWS8hDfJ2QFaaxY7aLuNyVr4P2",
                "phone": "1231231234",
                "name": "Uzair Teacher",
                "usertype": "teacher",
                "uid": "aeb42304-f92c-4b41-bea7-fb08dfc9580e",
                "courses": [
                    "670aa8d5b848e5bf62c670d9",
                    "670ab5ae9aee0686dde5ef02"
                ],
                "createdAt": "2024-10-12T06:42:44.287Z",
                "updatedAt": "2024-10-13T00:50:06.474Z",
                "__v": 0
            }
        ]
    }

    useEffect(() => {
        setCourse(placeholderData)
        return () => {

        };
    }, []);

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row w-full p-5 border-b justify-between items-end'>
                <h1 className='font-bold text-xl'>{course?.courseCode}: {course?.name}</h1>
                <h3 className='font-semibold text-xl'>Instructor: {course?.teachers[0].name}</h3>
            </div>
            <div className='flex flex-row w-full p-1 border-b items-center'>
                <button onClick={() => setCurrentPage('home')} className='btn btn-sm btn-ghost'>Home</button>
                <button onClick={() => setCurrentPage('content')} className='btn btn-sm btn-ghost'>Content</button>
                <button onClick={() => setCurrentPage('discussions')} className='btn btn-sm btn-ghost'>Discussions</button>
            </div>
            <div className='flex-grow w-full overflow-y-scroll'>
                {course && currentPage === 'home' && <AnnouncementList announcements={course.announcements} />}
                {course && currentPage === 'content' && <ContentList contents={course.content} />}
                {course && currentPage === 'discussions' && <DiscussionList discussions={course.discussions} />}
                {course && currentPage === '' && <DiscussionThreadPage discussion={course.discussions[0]} />}
            </div>
        </div >);
}
export default CourseShell;