import type { FC } from 'react';
import { FaDownload, FaEye, FaFilePdf, FaFilePowerpoint, FaFileWord, FaTimes } from 'react-icons/fa';

interface FileViewPreviewProps {
    filepath: string,
    filename: string | undefined,
    filetype: string | undefined,
    onView: (e: string) => void
}

const FileViewPreview: FC<FileViewPreviewProps> = ({ filepath, filename, filetype, onView }) => {
    const renderFilePreview = () => {
        switch (filetype) {
            case 'pdf':
                return <FaFilePdf size={40} className="text-red-500" />;
            case 'doc':
            case 'docx':
                return <FaFileWord size={40} className="text-blue-500" />;
            case 'ppt':
            case 'pptx':
                return <FaFilePowerpoint size={40} className="text-orange-500" />;
            default:
                return <FaFileWord size={40} className="text-gray-500" />;
        }
    };

    return (
        <div key={`${filename}-preview`} className="relative flex flex-col items-center p-4 border rounded-lg shadow-md gap-2">
            {renderFilePreview()}
            <span className="text-xs text-center mt-2 break-all">{filename}</span>
            <div className='flex flex-row w-full justify-evenly gap-5'>
                <a
                    href={filepath} download={filepath}
                    className="btn w-1/3 btn-sm btn-success"
                    onClick={(e) => {
                        e.stopPropagation()
                        // onView()
                    }}
                >
                    <FaDownload size={12} color='white' />
                </a>
                <button
                    type="button"
                    className="btn w-1/3 btn-sm btn-primary"
                    onClick={(e) => {
                        e.stopPropagation()
                        onView(filepath)
                    }}
                >
                    <FaEye size={12} color='white' />
                </button>
            </div>
        </div>
    );
}
export default FileViewPreview;