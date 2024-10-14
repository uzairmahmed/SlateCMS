import { FC, useEffect, useState } from 'react';
import { getCourses } from '../../apis/api';
import { MinimalCourse } from '../interfaces';
import CourseCard from '../components/CourseCard';
import { checkLoggedIn, getUserDetails, saveCourseDetails } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';
import NewCourseModal from '../components/NewCourseModal';

interface CoursesGridProps {
}


const CoursesGrid: FC<CoursesGridProps> = ({ }) => {
    const [courses, setCourses] = useState<MinimalCourse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = checkLoggedIn();
        if (!isLoggedIn) {
            navigate('/login');
        }
        getData()
        return () => {

        };
    }, []);

    const getData = async () => {
        const details = getUserDetails()
        const courseData = await getCourses(details.userType, details.userId)
        setCourses(courseData)
        saveCourseDetails(courseData)
    }

    return (
        <div className='flex flex-row flex-wrap w-full p-10 gap-10 overflow-y-scroll'>
            {(getUserDetails().userType === "admin") &&
                <div className='flex w-full justify-end'>
                    <NewCourseModal refresh={getData} />
                </div>
            }

            {courses.length > 0 ?
                courses.map((course) => (
                    <CourseCard course={course} />
                ))
                :
                <div className='flex flex-col w-full h-64 bg-slate-100 rounded-xl border items-center justify-center'>
                    <h2 className='text-lg w-full align-middle text-center font-semibold'>You are not enrolled in any courses. </h2>
                    <h2 className='text-lg w-full align-middle text-center'>Please wait to be assigned to one by an Administrator.</h2>
                </div>

            }
        </div>
    );
}
export default CoursesGrid;