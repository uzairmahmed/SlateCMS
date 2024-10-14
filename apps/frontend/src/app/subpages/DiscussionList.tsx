import type { FC } from 'react';
import { CourseWithUsers, Discussion } from '../interfaces';
import DiscussionThread from '../components/DiscussionThread';
import NewDiscussionModal from '../components/NewDiscussionModal';
import { getUserDetails } from '../../apis/auth';

interface DiscussionListProps {
    discussions: Discussion[]
    course: CourseWithUsers,
    refresh: () => void;
}

const DiscussionList: FC<DiscussionListProps> = ({ discussions, course, refresh }) => {
    return (
        <div className='flex flex-col-reverse gap-5 p-10'>
            {discussions.length > 0 ?
                discussions.map(discussion => (
                    <DiscussionThread discussion={discussion} viewButton={true} />
                ))
                :
                <div className='flex w-full h-32 bg-slate-100 rounded-xl border items-center'>
                    <h2 className='text-lg w-full align-middle text-center'>No Content</h2>
                </div>
            }
            {(getUserDetails().userType === "admin" || getUserDetails().userType === "teacher") &&
                <div className='flex w-full justify-end'>
                    <NewDiscussionModal courseCode={course.courseCode} refresh={refresh} />
                </div>
            }
        </div>
    );
}
export default DiscussionList;