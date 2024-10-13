import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    url: string,
    corsBypass: boolean
}

const PDFViewer: FC<PDFViewerProps> = ({ url, corsBypass }) => {
    const [numPages, setNumPages] = useState<number>();

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };



    return (
        <div className=' flex flex-col m-5 p-5 border'>
            <Document
                file={corsBypass? `https://cors-anywhere.herokuapp.com/${url}` : url}
                onLoadSuccess={onDocumentLoadSuccess}
                className=''
            >
                {numPages ? (
                    Array.from(new Array(numPages), (el, index) => (
                        <div key={`page_${index + 1}`} className="mb-8 flex justify-center">
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