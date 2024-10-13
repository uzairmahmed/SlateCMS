import type { FC } from 'react';
import { Announcement } from '../interfaces';
import AnnouncementCard from '../components/AnnouncementCard';

interface AnnouncementListProps {
    announcements: Announcement[]
}

const AnnouncementList: FC<AnnouncementListProps> = ({ announcements }) => {
    return (
        <div className='flex flex-col gap-5 p-10'>
            {announcements.map(announcement => (
                <AnnouncementCard announcement={announcement} />
            ))}
        </div>
    );
}
export default AnnouncementList;