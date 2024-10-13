import type { FC } from 'react';
import { Discussion } from '../interfaces';
import DiscussionThread from '../components/DiscussionThread';

interface DiscussionListProps {
    discussions: Discussion[]
}

const DiscussionList: FC<DiscussionListProps> = ({ discussions }) => {
    return (
        <div className='flex flex-col gap-5 p-10'>
            {discussions.map(discussion => (
                <DiscussionThread discussion={discussion} viewButton={true} />
            ))}
        </div>
    );
}
export default DiscussionList;