import type { FC } from 'react';
import { Announcement } from '../interfaces';

interface AnnouncementCardProps {
    announcement: Announcement
}

const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement }) => {
    return (
        <div className='w-full p-10 bg-white border rounded-3xl shadow'>
            <h1 className='text-xl font-semibold'>{announcement.title}</h1>
            <h1 className='text-lg'>{announcement.message}</h1>
            <div className='flex w-full justify-between mt-5'>
                <h1>By {announcement.author}</h1>
                <h1>Posted on {announcement.createdAt}</h1>
            </div>
        </div>
    );
}
export default AnnouncementCard;