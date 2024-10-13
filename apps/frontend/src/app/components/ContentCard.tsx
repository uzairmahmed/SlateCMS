import { FC, useState } from 'react';
import { Content } from '../interfaces';
import PDFViewer from './PDFViewer';

interface ContentCardProps {
    content: Content
}

const ContentCard: FC<ContentCardProps> = ({ content }) => {

    return (
        <div className='w-full'>
            <h1 className='text-xl font-semibold'>{content.title}</h1>
            <h1 className='text-lg'>{content.message}</h1>
            <div className='flex w-full justify-between mt-5'>
                <h1>By {content.author}</h1>
                <h1>Posted on {content.createdAt}</h1>
            </div>
            <PDFViewer url='https://cors-anywhere.herokuapp.com/https://gradschool.fsu.edu/sites/g/files/upcbnu761/files/media/Files/Manuscript%20Clearance/HowTo--Inserting_a_PDF_into_a_WORD_Doc_Via_PDF_or_Image.pdf' />
        </div>
    );
}
export default ContentCard;