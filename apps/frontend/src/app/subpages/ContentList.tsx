import { FC, useState } from 'react';
import { Content, CourseWithUsers } from '../interfaces';
import ContentCard from '../components/ContentCard';
import NewContentModal from '../components/NewContentModal';
import { getUserDetails } from '../../apis/auth';

interface ContentProps {
    course: CourseWithUsers,
    contents: Content[],
    refresh: () => void;
}

const ContentList: FC<ContentProps> = ({ contents, course, refresh }) => {
    const [currentDocument, setCurrentDocument] = useState(0);
    return (
        <div className='flex flex-col md:flex-row h-full'>
            <div className='flex flex-row md:flex-col w-full md:w-48 md:h-full border-b border-r p-4'>
                {contents.map((content, index) => (
                    <button className='btn btn-link text-black h-fit btn-xs md:btn-md' onClick={() => setCurrentDocument(index)} key={content.title}>
                        <h1 className='text-md'>{content.title}</h1>
                    </button>
                ))}
            </div>

            <div className='flex flex-col gap-5 p-10 w-full overflow-y-scroll'>
                {(getUserDetails().userType === "admin" || getUserDetails().userType === "teacher") &&
                    <div className='flex w-full justify-end'>
                        <NewContentModal courseCode={course.courseCode} refresh={refresh} />
                    </div>
                }

                {contents.length > 0 ?
                    contents[currentDocument] && <ContentCard content={contents[currentDocument]} />
                    :
                    <div className='flex w-full h-32 bg-slate-100 rounded-xl border items-center'>
                        <h2 className='text-lg w-full align-middle text-center'>No Content</h2>
                    </div>
                }
            </div>
        </div>
    );
}
export default ContentList;