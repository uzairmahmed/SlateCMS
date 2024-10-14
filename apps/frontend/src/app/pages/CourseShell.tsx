import { FC, useEffect, useState } from 'react';
import { CourseWithUsers } from '../interfaces';
import AnnouncementList from '../subpages/AnnouncementList';
import ContentList from '../subpages/ContentList';
import DiscussionList from '../subpages/DiscussionList';
import DiscussionThreadPage from './DiscussionThreadPage';
import { getCourseData } from '../../apis/api';
import { checkLoggedIn } from '../../apis/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';

interface CourseShellProps { }

const CourseShell: FC<CourseShellProps> = ({ }) => {
    const [course, setCourse] = useState<CourseWithUsers>();
    const [currentPage, setCurrentPage] = useState('home');
    const { courseCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = checkLoggedIn();
        if (!isLoggedIn) {
            navigate('/login');
        }

        getData()
    }, [courseCode, navigate]);

    const getData = async () => {
        if (courseCode) {
            const courseData = await getCourseData(courseCode)
            setCourse(courseData)
        }
    }

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row w-full p-5 border-b justify-between items-center'>
                <label htmlFor="sidebar-drawer" className="flex md:hidden btn btn-ghost drawer-button">
                    <MdMenu size={20} />
                </label>
                {course && <h1 className='font-bold text-xl self-center'>{course.courseCode}: {course?.name}</h1>}
                {/* <div className='w-20'></div> */}
                {/* {course && <h3 className='font-semibold text-xl'>Instructor: {course?.teachers[0]?.name}</h3>} */}
            </div>
            <div className='flex flex-row w-full p-1 border-b items-center'>
                <button onClick={() => setCurrentPage('home')} className='btn btn-sm btn-ghost'>Home</button>
                <button onClick={() => setCurrentPage('content')} className='btn btn-sm btn-ghost'>Content</button>
                <button onClick={() => setCurrentPage('discussions')} className='btn btn-sm btn-ghost'>Discussions</button>
            </div>
            <div className={`flex-grow w-full ${currentPage === 'content' ? "h-full" : "overflow-y-scroll"}`}>
                {course && currentPage === 'home' && <AnnouncementList announcements={course.announcements} course={course} refresh={getData} />}
                {course && currentPage === 'content' && <ContentList contents={course.content} course={course} refresh={getData} />}
                {course && currentPage === 'discussions' && <DiscussionList discussions={course.discussions} course={course} refresh={getData} />}
                {course && currentPage === '' && <DiscussionThreadPage discussion={course.discussions[0]} course={course} refresh={getData} />}
            </div>
        </div >
    );
}
export default CourseShell;