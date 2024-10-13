import type { FC } from 'react';
import { Content } from '../interfaces';
import ContentCard from '../components/ContentCard';

interface ContentProps {
    contents: Content[]
}

const ContentList: FC<ContentProps> = ({ contents }) => {
    return (
        <div className='flex h-full'>
            <div className='flex flex-col w-52 h-full border-r p-4'>
                <div className='font-semibold'>
                    <ul className="menu text-lg">
                        {contents.map(content => (
                            <li key={content.title}>
                                <a href="#">{content.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='flex flex-col gap-5 p-10 w-full'>
                {/* {contents.map(content => ( */}
                {contents[0] && <ContentCard content={contents[0]} />}
                {/* ))} */}
            </div>
        </div>
    );
}
export default ContentList;