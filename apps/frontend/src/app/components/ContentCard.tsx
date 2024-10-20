import { FC, useState } from 'react';
import { Content } from '../interfaces';
import DocumentViewer from './DocumentViewer';
import { formatTime } from '../../apis/utility';
import LinkPreview from './LinkPreview';

interface ContentCardProps {
    content: Content
}

const ContentCard: FC<ContentCardProps> = ({ content }) => {

    return (
        <div className='w-full bg-white shadow-lg p-10 mt-5 rounded-lg border mx-auto'>
            <div>
                <h1 className='text-xl font-semibold'>{content.title}</h1>
                <div className='flex w-full justify-between mt-1'>
                    <h1 className='text-xs'>By {content.author.name}</h1>
                    <h1 className='text-xs'>Posted on {formatTime(content.createdAt)}</h1>
                </div>
            </div>
            <div className='divider'></div>
            <div className="">
                <div
                    className="rich-text-content mt-5"
                    dangerouslySetInnerHTML={{ __html: content.document }}
                />
            </div>
            <div className='divider'></div>

            <div className='grid grid-rows-3 md:grid-rows-1 grid-cols-1 md:grid-cols-3'>
                {content.links.map(link =>
                    <LinkPreview link={link} />
                )}
            </div>
            <div className='divider'></div>

            <DocumentViewer fileUrls={content.files} />
        </div>
    );
}
export default ContentCard;