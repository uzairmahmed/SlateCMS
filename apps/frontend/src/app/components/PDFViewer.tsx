import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    url: string
}

const PDFViewer: FC<PDFViewerProps> = ({ url }) => {
    const [numPages, setNumPages] = useState<number>();

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };



    return (
        <div className=' flex flex-col mt-4'>
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                className='w-full'
            >
                {numPages ? (
                    Array.from(new Array(numPages), (el, index) => (
                        <div key={`page_${index + 1}`} className="mb-8">
                            <Page pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
                        </div>
                    ))
                ) : (
                    <p>Loading PDF...</p>
                )}
            </Document>

        </div>
    );
}
export default PDFViewer;