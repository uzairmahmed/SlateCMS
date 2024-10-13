import { FC, FormEvent, useState } from 'react';
import { Discussion } from '../interfaces';
import { replyToDiscussion } from '../../apis/api';

interface DiscussionReplyFormProps {
    discussion: Discussion,
    refreshDiscussion: () => void;
}

const DiscussionReplyForm: FC<DiscussionReplyFormProps> = ({ discussion, refreshDiscussion }) => {
    const [reply, setReply] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (reply.trim()) {
            const success = await replyToDiscussion(discussion._id, reply);
            setReply("");
            if (success) {
                setReply(""); 
                refreshDiscussion();
            }

        }
    };
    return (
        <form onSubmit={handleSubmit} className='w-[90%] self-end p-10 space-y-5 bg-slate-200 border rounded-3xl shadow'>
            <h1 className='text-lg font-semibold'>Reply to Discussion</h1>
            <div className='flex flex-row gap-5'>
                <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply here"
                    className="input w-full"
                />
                <button type="submit" className='btn btn-primary'>Post</button>
            </div>
        </form >
    );
}
export default DiscussionReplyForm;