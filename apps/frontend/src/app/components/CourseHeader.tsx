import type { FC } from 'react';
import { Course, CourseWithUsers } from '../interfaces';

interface CourseHeaderProps {
    course: CourseWithUsers
}

const CourseHeader: FC<CourseHeaderProps> = ({ course }) => {
    return (
        <div className="flex w-full bg-black bg-[url('https://images.unsplash.com/photo-1625535069654-cfeb8f829088?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center relative">

            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

            <div className="relative w-full flex flex-col justify-center items-center text-center z-10 py-10">
                <h1 className="text-white font-bold text-4xl">{course.courseCode}</h1>
                <h1 className="text-white font-semibold text-xl">{course.name}</h1>
                <h1 className="text-white text-lg max-w-xl mb-10">Instructed by {course.teachers[0]?.name}</h1>
                <h1 className="text-white text-lg max-w-xl">{course.description}</h1>
            </div>
        </div>
    );
}
export default CourseHeader;