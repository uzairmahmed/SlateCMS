import type { FC } from 'react';
import { Announcement, Course, CourseWithUsers } from '../interfaces';
import AnnouncementCard from '../components/AnnouncementCard';
import CourseHeader from '../components/CourseHeader';
import NewAnnouncementModal from '../components/NewAnnouncementModal';

interface AnnouncementListProps {
    course: CourseWithUsers,
    announcements: Announcement[]
    refresh: () => void;
}

const AnnouncementList: FC<AnnouncementListProps> = ({ announcements, course, refresh }) => {
    return (
        <div className='flex flex-col'>
            <CourseHeader course={course} />
            <div className='flex flex-col-reverse gap-5 p-10'>
                {announcements.map(announcement => (
                    <AnnouncementCard announcement={announcement} />
                ))}
                <div className='flex w-full justify-end'>
                    <NewAnnouncementModal courseCode={course.courseCode} refresh={refresh}/>
                </div>
            </div>
        </div>
    );
}
export default AnnouncementList;