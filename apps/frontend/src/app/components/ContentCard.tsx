import { FC, useState } from 'react';
import { Content } from '../interfaces';
import PDFViewer from './PDFViewer';
import { formatTime } from '../../utility/utility';

interface ContentCardProps {
    content: Content
}

const ContentCard: FC<ContentCardProps> = ({ content }) => {

    return (
        <div className='w-full'>
            <h1 className='text-xl font-semibold'>{content.title}</h1>
            {/* <h1 className='text-lg'>{content.message}</h1> */}
            <div className='flex w-full justify-between mt-5'>
                <h1 className='text-xs'>By {content.author.name}</h1>
                <h1 className='text-xs'>Posted on {formatTime(content.createdAt)}</h1>
            </div>
            <div className="bg-white shadow-lg p-10 mt-5 rounded-lg border max-w-3xl mx-auto">

                <div
                    className="rich-text-content mt-5"
                    dangerouslySetInnerHTML={{ __html: content.document }}
                />
            </div>
        </div>
    );
}
export default ContentCard;