import type { FC } from 'react';
import { Announcement } from '../interfaces';
import { MdAnnouncement } from "react-icons/md";
import { formatTime } from "../../utility/utility";

interface AnnouncementCardProps {
    announcement: Announcement
}

const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement }) => {
    return (
        <div className='flex flex-col w-full p-10 bg-white border rounded-3xl shadow gap-2'>
            <div className='flex gap-5 justify-start items-center'>
                <MdAnnouncement />
                <h1 className='text-md'>Announcement</h1>
            </div>
            <h1 className='text-lg font-semibold'>{announcement.title}</h1>
            <h1 className='text-md'>{announcement.message}</h1>
            <div className='flex flex-col md:flex-row w-full justify-between mt-5'>
                <h1 className='text-xs'>By {announcement.author}</h1>
                <h1 className='text-xs'>Posted on {formatTime(announcement.createdAt)}</h1>
            </div>
        </div>
    );
}
export default AnnouncementCard;