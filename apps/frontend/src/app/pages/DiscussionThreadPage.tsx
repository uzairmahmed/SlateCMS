import { FC, useEffect, useState } from 'react';
import { Discussion } from '../interfaces';
import DiscussionThread from '../components/DiscussionThread';
import DiscussionReplyCard from '../components/DiscussionReplyCard';
import DiscussionReplyForm from '../components/DiscussionReplyForm';
import { getDiscussionData } from '../../apis/api';
import { checkLoggedIn } from '../../apis/auth';
import { useNavigate, useParams } from 'react-router-dom';

interface DiscussionThreadPageProps {

}

const DiscussionThreadPage: FC<DiscussionThreadPageProps> = ({ }) => {
    const [discussion, setDiscussion] = useState<Discussion>();
    const { discussionID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = checkLoggedIn();
        if (!isLoggedIn) {
            navigate('/login');
        }

        getData()

        return () => {

        };
    }, []);

    const getData = async () => {
        if (discussionID) {
            const discussionData = await getDiscussionData(discussionID)
            setDiscussion(discussionData)
        }
    }

    return (
        <div className='flex flex-col h-full w-full overflow-y-scroll'>
            <div className='flex flex-row w-full p-5 border-b justify-between items-end'>
                <h1 className='font-bold text-xl'>Discussion</h1>
            </div>
            {discussion &&
                <div className='flex flex-col p-5 gap-5'>
                    <DiscussionThread discussion={discussion} viewButton={false} />
                    {discussion.replies.map(reply => (
                        <DiscussionReplyCard reply={reply} />
                    ))}
                    <DiscussionReplyForm discussion={discussion} refreshDiscussion={getData} />
                </div>
            }
        </div>
    );
}
export default DiscussionThreadPage;