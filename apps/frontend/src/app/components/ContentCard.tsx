import { FC, useState } from 'react';
import FileViewer from 'react-file-viewer';

import { Content } from '../interfaces';
import { formatTime } from '../../apis/utility';
import LinkPreview from './LinkPreview';
import FileViewPreview from './FileViewPreview';
import { FaDownload, FaTimes } from 'react-icons/fa';

interface ContentCardProps {
    content: Content
}

const ContentCard: FC<ContentCardProps> = ({ content }) => {
    const [currentDocView, setCurrentDocView] = useState('');

    const getfilename = (file: string) => {
        return file.split('/').pop().split('?')[0];
    }

    const getfiletype = (file: string) => {
        return file.split('/').pop().split('?')[0].split('.').pop();
    }


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

            <div className='grid grid-rows-3 md:grid-rows-1 grid-cols-1 md:grid-cols-3 gap-5 mb-5'>
                {content.links.map(link =>
                    <LinkPreview link={link} />
                )}
            </div>
            <div className='grid grid-rows-3 md:grid-rows-1 grid-cols-1 md:grid-cols-3 gap-5'>
                {content.files.map(file =>
                    <FileViewPreview
                        filepath={file}
                        filename={getfilename(file)}
                        filetype={getfiletype(file)}
                        onView={(e) => setCurrentDocView(e)} />
                )}
            </div>

            <div className='divider'></div>
            {currentDocView !== '' &&
                <div className='flex flex-col justify-center items-center border py-10'>
                    <div className='flex flex-row justify-between items-center w-full max-w-3xl font-semibold text-center'>
                        <a href={currentDocView} download={currentDocView} className='btn btn-square btn-success btn-outline btn-sm'><FaDownload /></a>
                        {getfilename(currentDocView)}
                        <button onClick={() => setCurrentDocView('')} className='btn btn-square btn-error btn-outline btn-sm'><FaTimes /></button>
                    </div>
                    <div className="flex w-full h-auto max-w-full justify-center">

                        <FileViewer
                            fileType={getfiletype(currentDocView)}
                            filePath={currentDocView}
                        />
                    </div>
                </div>
            }

        </div>
    );
}
export default ContentCard;