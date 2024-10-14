import type { FC } from 'react';
import { DiscussionReply } from '../interfaces';
import { MdReply } from 'react-icons/md';
import { formatTime } from '../../utility/utility';

interface DiscussionReplyCardProps {
    reply: DiscussionReply
}

const DiscussionReplyCard: FC<DiscussionReplyCardProps> = ({ reply }) => {
    return (
        <div className='flex flex-col gap-2 w-[90%] self-end p-10 bg-slate-200 border rounded-3xl shadow'>
            <div className='flex gap-5 justify-start items-center'>
                <MdReply />
                <h1 className='text-md'>Response</h1>
            </div>
            <h1 className='text-md font-semibold'>{reply.message}</h1>
            <div className='flex flex-col md:flex-row w-full justify-between mt-5'>
                <h1 className='text-xs'>By {reply.author}</h1>
                <h1 className='text-xs'>Posted on {formatTime(reply.createdAt)}</h1>
            </div>
        </div>
    );
}
export default DiscussionReplyCard;