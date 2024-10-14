import { FC, useEffect, useState } from 'react';
import { logout } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';
import { MdAndroid, MdLibraryBooks, MdLogout, MdMenu, MdOutlineViewQuilt, MdSchool } from 'react-icons/md';
import { getNotifications } from '../../apis/api';

interface SidebarProps { }

const Sidebar: FC<SidebarProps> = ({ }) => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const storedCourses = localStorage.getItem('courses');
        let courses = [];
        if (typeof storedCourses === 'string') {
            courses = JSON.parse(storedCourses);
            setCourses(courses);
        }

        return () => { };
    }, [navigate]);

    const renderLinks = () => (
        <>
            <div
                onClick={() => navigate('/courses')}
                className="flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl bg-slate-200 hover:bg-slate-300 transition-all cursor-pointer select-none"
            >
                <MdSchool /> Courses
            </div>
            <div className="flex flex-col">
                {courses &&
                    courses.map(course => (
                        <div
                            onClick={() => navigate(`${course.url}`)}
                            className="flex flex-row w-full justify-start items-center gap-5 p-3 rounded-xl hover:bg-slate-200 transition-all cursor-pointer select-none"
                            key={course.courseCode}
                        >
                            {course.courseCode}
                        </div>
                    ))}
            </div>
            <div className="divider"></div>
            <div
                onClick={() => navigate('/kb')}
                className="flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl bg-slate-200 hover:bg-slate-300 transition-all cursor-pointer select-none"
            >
                <MdLibraryBooks /> Knowledge Base
            </div>
            <div
                onClick={() => navigate('/ai')}
                className="flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl bg-slate-200 hover:bg-slate-300 transition-all cursor-pointer select-none"
            >
                <MdAndroid /> SlateAI
            </div>
        </>
    );

    const renderLogout = () => (
        <div
            onClick={handleLogout}
            className="flex flex-row w-full items-center gap-5 px-5 py-5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer select-none text-error"
        >
            <MdLogout /> Logout
        </div>
    );

    return (
        <>
            {/* Drawer for smaller screens */}
            <div className="md:hidden">
                <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side z-50">
                    <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
                    <div className="flex flex-col w-80 h-full border-r p-4 justify-between bg-base-100">
                        <div>
                            <a className="flex flex-row w-full justify-center items-center gap-3 px-3 pt-5 text-2xl font-bold pr-5">
                                <MdOutlineViewQuilt className="mt-0.5" size={30} /> Slate
                            </a>
                            <div className="divider"></div>
                            <div className="flex flex-col gap-2">
                                {renderLinks()}
                            </div>
                        </div>
                        <div className="flex">{renderLogout()}</div>
                    </div>
                </div>
            </div>

            {/* Sidebar for larger screens */}
            <div className="hidden md:flex flex-col w-80 h-full border-r p-4 justify-between">
                <div>
                    <a className="flex flex-row w-full justify-center items-center gap-3 px-3 pt-5 text-2xl font-bold pr-5">
                        <MdOutlineViewQuilt className="mt-0.5" size={30} /> Slate
                    </a>
                    <div className="divider"></div>
                    <div className="flex flex-col gap-2">
                        {renderLinks()}
                    </div>
                </div>
                <div className="flex">{renderLogout()}</div>
            </div>
        </>
    );
};

export default Sidebar;
