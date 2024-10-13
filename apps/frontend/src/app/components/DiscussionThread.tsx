import type { FC } from 'react';
import { Discussion } from '../interfaces';
import { MdQuestionAnswer } from 'react-icons/md';
import { formatTime } from '../../utility/utility';
import { useNavigate } from 'react-router-dom';

interface DiscussionThreadProps {
    discussion: Discussion,
    viewButton: boolean
}

const DiscussionThread: FC<DiscussionThreadProps> = ({ discussion, viewButton }) => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col gap-2 w-full p-10 bg-white border rounded-3xl shadow'>
            <div className='flex gap-5 justify-start items-center'>
                <MdQuestionAnswer  />
                <h1 className='text-md'>Discussion Thread</h1>
            </div>
            <h1 className='text-lg font-semibold'>{discussion.title}</h1>
            <h1 className='text-md'>{discussion.message}</h1>
            <div className='flex w-full justify-between mt-5'>
                <div className='flex flex-col justify-end'>
                    <h1 className='text-xs'>By discussion.author</h1>
                    <h1 className='text-xs'>Posted on {formatTime(discussion.createdAt)}</h1>
                </div>
                <div className='flex flex-col gap-2 justify-end'>
                    <h1 className='text-xs text-end font-semibold'>{discussion.replies.length} Replies</h1>
                    {viewButton && <button onClick={() => navigate(`/discussion/${discussion._id}`)} className='btn btn-neutral btn-sm'>View Thread</button>}
                </div>
            </div>
        </div>
    );
}
export default DiscussionThread;