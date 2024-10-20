import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

const CustomPDFRenderer = ({ mainState }) => {
    const [numPages, setNumPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
    const { currentDocument } = mainState;

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages || 1));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    if (!currentDocument) return null;

    return (
        <div id="my-pdf-renderer" className="">
            <div className="flex justify-between items-center my-4">
                <button
                    className="btn btn-sm btn-primary"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <p>
                    Page {currentPage} of {numPages}
                </p>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={goToNextPage}
                    disabled={currentPage === numPages}
                >
                    Next
                </button>
            </div>

            <Document
                file={currentDocument.uri}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error("Error loading document:", error)}
                onSourceError={(error) => console.error("Error with document source:", error)}
            >
                <div className="flex justify-center">
                    <Page
                        pageNumber={currentPage}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </div>
            </Document>


        </div>
    );
};

CustomPDFRenderer.fileTypes = ["pdf", "application/pdf"];
CustomPDFRenderer.weight = 1;

export default CustomPDFRenderer;
