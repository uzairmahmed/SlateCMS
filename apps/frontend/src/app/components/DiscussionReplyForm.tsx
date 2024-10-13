import type { FC } from 'react';
import { Discussion } from '../interfaces';

interface DiscussionReplyFormProps {
    discussion: Discussion
}

const DiscussionReplyForm: FC<DiscussionReplyFormProps> = ({ discussion }) => {
    return (
        <div className='w-[90%] self-end p-10 space-y-5 bg-slate-200 border rounded-3xl shadow'>
            <h1 className='text-lg font-semibold'>Reply to Discussion</h1>
            <div className='flex flex-row gap-5'>
                <input type="text" placeholder="Type here" className="input w-full" />
                <button className='btn btn-primary'>Post</button>
            </div>
        </div>
    );
}
export default DiscussionReplyForm;