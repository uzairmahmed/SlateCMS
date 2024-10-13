import { FC, useEffect, useState } from 'react';
import { getCourses } from '../../apis/api';
import { MinimalCourse } from '../interfaces';
import CourseCard from '../components/CourseCard';

interface CoursesGridProps { }


const CoursesGrid: FC<CoursesGridProps> = ({ }) => {
    const [courses, setCourses] = useState<MinimalCourse[]>([]);

    const placeholderData: MinimalCourse[] = [
        {
            _id: "670aa8d5b848e5bf62c670d9",
            uid: "4a01583b-250f-46b4-8380-27c2d1f52735",
            name: "Database Systems I",
            courseCode: "CPS510",
            description: "Advanced file management techniques involving fundamentals of database organization, design and management...",
            announcements: [],
            content: [],
            discussions: [],
            createdAt: "2024-10-12T16:50:29.974Z",
            updatedAt: "2024-10-12T16:50:29.974Z"
        },
        {
            _id: "670aa8fbb848e5bf62c670db",
            uid: "b4403fac-25c8-4fb4-bc01-e62eec901f82",
            name: "Computer Science I",
            courseCode: "CPS109",
            description: "An introductory programming course designed to introduce fundamental Computer Science concepts...",
            announcements: [],
            content: [],
            discussions: [],
            createdAt: "2024-10-12T16:51:07.436Z",
            updatedAt: "2024-10-12T16:51:07.436Z"
        },
        {
            _id: "670ab5ae9aee0686dde5ef02",
            uid: "f1a325ad-7701-4217-b921-0e534792771b",
            name: "Data Structures",
            courseCode: "CPS305",
            description: "Introduction to data structures and algorithms...",
            announcements: ["670abd4963beae327b7b4683"],
            content: ["670ac678c80e9cf2a6945e17"],
            discussions: ["670ac197dec04a657db54b9f"],
            createdAt: "2024-10-12T17:45:18.434Z",
            updatedAt: "2024-10-12T19:12:22.784Z"
        }
    ];

    useEffect(() => {
        setCourses(placeholderData);
        // const fetchData = async () => {
        //     try {
        //         const courses = await getCourses();
        //         setCourses(courses)
        //     } catch (error) {
        //         console.error('Failed to fetch data:', error);
        //     }
        // };
        // fetchData();
    }, []);


    return (
        <div className='grid grid-cols-3 grid-rows-3 w-full p-10 gap-10'>
            {courses.map((course) => (
                <CourseCard course={course} />
            ))}
        </div>
    );
}
export default CoursesGrid;