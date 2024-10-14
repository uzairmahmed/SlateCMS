import type { FC } from 'react';
import { MinimalCourse } from '../interfaces';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
    course: MinimalCourse
}

const CourseCard: FC<CourseCardProps> = ({course}) => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col h-fit bg-slate-100 shadow rounded-2xl p-10'>
            <h2 className='font-bold text-2xl'>{course.courseCode}</h2>
            <h3 className='font-semibold text-xl mb-2'>{course.name}</h3>
            <p>{course.description}</p>
            <div className='flex w-full h-full justify-end items-end'>
                <button onClick={() => navigate(`/${course.courseCode}`)} className='btn btn-neutral'>View Course</button>
            </div>
        </div>
    );
}
export default CourseCard;