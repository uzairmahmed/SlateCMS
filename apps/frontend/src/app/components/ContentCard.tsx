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
            <h1 className='text-lg'>{content.message}</h1>
            <div className='flex w-full justify-between mt-5'>
                <h1 className='text-xs'>By {content.author}</h1>
                <h1 className='text-xs'>Posted on {formatTime(content.createdAt)}</h1>
            </div>
            <PDFViewer corsBypass={true} url={content.documentURL} />
        </div>
    );
}
export default ContentCard;