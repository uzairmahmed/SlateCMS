import { FC, useEffect, useState } from 'react';
import { getCourses } from '../../apis/api';
import { MinimalCourse } from '../interfaces';
import CourseCard from '../components/CourseCard';
import { checkLoggedIn } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';

interface CoursesGridProps { }


const CoursesGrid: FC<CoursesGridProps> = ({ }) => {
    const [courses, setCourses] = useState<MinimalCourse[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const isLoggedIn = checkLoggedIn();
        if (!isLoggedIn) {
          navigate('/login');
        }

        const getData = async () => {
            const courseData = await getCourses()
            setCourses(courseData)
        }
        getData()
        return () => {

        };
    }, []);


    return (
        <div className='flex flex-row flex-wrap w-full p-10 gap-10 overflow-y-scroll'>
            {courses.map((course) => (
                <CourseCard course={course} />
            ))}
        </div>
    );
}
export default CoursesGrid;