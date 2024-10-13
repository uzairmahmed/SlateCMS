import type { FC } from 'react';
import { DiscussionReply } from '../interfaces';

interface DiscussionReplyCardProps {
    reply: DiscussionReply
}

const DiscussionReplyCard: FC<DiscussionReplyCardProps> = ({ reply }) => {
    return (
        <div className='w-[90%] self-end p-10 bg-slate-200 border rounded-3xl shadow'>
            <h1 className='text-lg'>{reply.message}</h1>
            <div className='flex w-full justify-between mt-5'>
                <h1>By {reply.author}</h1>
                <h1>Posted on {reply.createdAt}</h1>
            </div>
        </div>
    );
}
export default DiscussionReplyCard;