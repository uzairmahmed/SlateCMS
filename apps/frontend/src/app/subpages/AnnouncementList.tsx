import type { FC } from 'react';
import { Announcement, Course, CourseWithUsers } from '../interfaces';
import AnnouncementCard from '../components/AnnouncementCard';
import CourseHeader from '../components/CourseHeader';
import NewAnnouncementModal from '../components/NewAnnouncementModal';
import { getUserDetails } from '../../apis/auth';
import AssignStudentModal from '../components/AssignStudentModal';
import AssignTeacherModal from '../components/AssignTeacherModal';

interface AnnouncementListProps {
    course: CourseWithUsers,
    announcements: Announcement[]
    refresh: () => void;
}

const AnnouncementList: FC<AnnouncementListProps> = ({ announcements, course, refresh }) => {
    return (
        <div className='flex flex-col h-full'>
            <CourseHeader course={course} />
            <div className='flex flex-col-reverse gap-5 p-10'>
                {announcements.length > 0 ?
                    announcements.map(announcement => (
                        <AnnouncementCard announcement={announcement} />
                    ))
                    :
                    <div className='flex w-full h-32 bg-slate-100 rounded-xl border items-center'>
                        <h2 className='text-lg w-full align-middle text-center'>No Content</h2>
                    </div>
                }
                <div className='flex w-full justify-end gap-5'>
                    {(getUserDetails().userType === "admin" &&
                        <>
                            <AssignStudentModal courseCode={course.courseCode} course={course} />
                            <AssignTeacherModal courseCode={course.courseCode} course={course} />
                        </>
                    )}
                    {(getUserDetails().userType === "admin" || getUserDetails().userType === "teacher") &&
                        <NewAnnouncementModal courseCode={course.courseCode} refresh={refresh} />
                    }
                </div>
            </div>
        </div>
    );
}
export default AnnouncementList;