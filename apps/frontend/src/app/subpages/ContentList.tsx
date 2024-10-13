import { FC, useState } from 'react';
import { Content, CourseWithUsers } from '../interfaces';
import ContentCard from '../components/ContentCard';
import NewContentModal from '../components/NewContentModal';

interface ContentProps {
    course: CourseWithUsers,
    contents: Content[],
    refresh: () => void;
}

const ContentList: FC<ContentProps> = ({ contents, course, refresh }) => {
    const [currentDocument, setCurrentDocument] = useState(0);
    return (
        <div className='flex h-full'>
            <div className='flex flex-col w-48 h-full border-r p-4'>
                <div className='font-semibold'>
                    <ul className="menu text-lg">
                        {contents.map((content, index) => (
                            <button className='btn btn-link text-black' onClick={() => setCurrentDocument(index)} key={content.title}>
                                <h1 className='text-md'>{content.title}</h1>
                            </button>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='flex flex-col gap-5 p-10 w-full overflow-y-scroll'>
                <div className='flex w-full justify-end'>
                    <NewContentModal courseCode={course.courseCode} refresh={refresh} />
                </div>

                {contents[currentDocument] && <ContentCard content={contents[currentDocument]} />}
            </div>
        </div>
    );
}
export default ContentList;