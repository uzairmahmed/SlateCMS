import { FC, useEffect, useState } from 'react';
import { logout } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';
import { MdAndroid, MdGrid3X3, MdLibraryBooks, MdLogout, MdOutlineViewQuilt, MdPowerOff, MdSchool, MdSquare } from 'react-icons/md';

interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = ({ }) => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
        window.location.reload()
    }

    useEffect(() => {
        const storedcourses = localStorage.getItem('courses')
        let courses = []
        if (typeof storedcourses === 'string') {
            courses = JSON.parse(storedcourses)
            setCourses(courses)
        }

        return () => {

        };
    }, [navigate]);

    return (
        <div className="flex flex-col w-80 h-full border-r p-4 justify-between">
            <div className="">
                <a className="flex flex-row w-full justify-center items-center gap-3 px-3 pt-5 text-2xl font-bold pr-5"><MdOutlineViewQuilt className='mt-0.5' size={30} /> Slate</a>
                <div className="divider"></div>
                <div className='flex flex-col gap-2'>
                    <div onClick={() => navigate('/courses')} className='flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl bg-slate-200 hover:bg-slate-300 transition-all cursor-pointer select-none'><MdSchool /> Courses</div>
                    <div className='flex flex-col'>
                        {courses &&
                            courses.map(course => (
                                <div onClick={() => navigate(`${course.url}`)} className='flex flex-row w-full justify-start items-center gap-5 p-3 rounded-xl hover:bg-slate-200 transition-all cursor-pointer select-none'>{course.courseCode}</div>
                            ))}
                    </div>
                    <div className="divider"></div>

                    <div onClick={() => navigate('/knowledgebase')} className='flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl bg-slate-200 hover:bg-slate-300 transition-all cursor-pointer select-none'><MdLibraryBooks /> Knowledge Base</div>
                    <div onClick={() => navigate('/ai')} className='flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl bg-slate-200 hover:bg-slate-300 transition-all cursor-pointer select-none'><MdAndroid /> AI Teacher</div>
                </div>
            </div>

            <div className='flex'>
                <div onClick={() => handleLogout()} className='flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer select-none text-error'><MdLogout /> Logout</div>
            </div>
        </div>
    );
}
export default Sidebar;