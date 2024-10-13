import type { FC } from 'react';
import { Discussion } from '../interfaces';

interface DiscussionThreadProps {
    discussion: Discussion,
    viewButton: boolean
}

const DiscussionThread: FC<DiscussionThreadProps> = ({ discussion, viewButton }) => {
    return (
        <div className='w-full p-10 bg-white border rounded-3xl shadow'>
            <h1 className='text-xl font-semibold'>{discussion.title}</h1>
            <h1 className='text-lg'>{discussion.message}</h1>
            <div className='flex w-full justify-between mt-5'>
                <div className='flex flex-col justify-end'>
                    <h1>By discussion.author</h1>
                    <h1>Posted on {discussion.createdAt}</h1>
                </div>
                <div className='flex flex-col gap-2 justify-end'>
                    <h1 className='text-right font-semibold'>{discussion.replies.length} Replies</h1>
                    {viewButton && <button className='btn btn-neutral'>View Thread</button>}
                </div>
            </div>
        </div>
    );
}
export default DiscussionThread;