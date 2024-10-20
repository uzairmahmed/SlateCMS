import { FC, useState } from 'react';
import DocViewer, { PNGRenderer, BMPRenderer, HTMLRenderer, DocRenderer, JPGRenderer, MSDocRenderer, TXTRenderer, TIFFRenderer, ImageProxyRenderer } from "react-doc-viewer";
import CustomPDFRenderer from './CustomPDFRenderer';
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


interface DocumentViewerProps {
    fileUrls: string[]
}

const DocumentViewer: FC<DocumentViewerProps> = ({ fileUrls }) => {
    const [showDocuments, setShowDocuments] = useState(false);
    const docs = fileUrls.map((url) => ({ uri: url }));

    return (
        <div className=''>
            <button
                className="btn"
                onClick={() => setShowDocuments(!showDocuments)}
            >
                {showDocuments ? "Hide Documents" : "View Documents"}
            </button>

            {showDocuments &&
                <DocViewer
                    pluginRenderers={[CustomPDFRenderer, PNGRenderer, BMPRenderer, HTMLRenderer, JPGRenderer, MSDocRenderer, TXTRenderer, TIFFRenderer, ImageProxyRenderer]}
                    documents={docs}
                    className='mt-5 w-full justify-center items-center bg-white'
                    config={{
                        header: {
                            disableFileName: true,
                            disableHeader: true,
                        }
                    }}
                />
            }
        </div>
    );
}
export default DocumentViewer;