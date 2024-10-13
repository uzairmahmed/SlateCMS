import type { FC } from 'react';
import { Discussion } from '../interfaces';
import DiscussionThread from '../components/DiscussionThread';
import DiscussionReplyCard from '../components/DiscussionReplyCard';
import DiscussionReplyForm from '../components/DiscussionReplyForm';

interface DiscussionThreadPageProps {
    discussion: Discussion
}

const DiscussionThreadPage: FC<DiscussionThreadPageProps> = ({ discussion }) => {
    return (
        <div className='flex flex-col h-full gap-5 p-10'>
            <DiscussionThread discussion={discussion} viewButton={false} />
            {discussion.replies.map(reply => (
                <>
                    <DiscussionReplyCard reply={reply} />
                </>
            ))}
            <DiscussionReplyForm discussion={discussion} />

        </div>
    );
}
export default DiscussionThreadPage;