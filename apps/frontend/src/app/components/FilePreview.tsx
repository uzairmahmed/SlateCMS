import type { FC } from 'react';
import { FaFilePdf, FaFilePowerpoint, FaFileWord, FaTimes } from 'react-icons/fa';

interface FilePreviewProps {
    file: File,
    onRemove: () => void
}

const FilePreview: FC<FilePreviewProps> = ({ file, onRemove }) => {

    const renderFilePreview = (file: File) => {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        switch (fileType) {
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
        <div key={`${file.name}-preview`} className="relative flex flex-col items-center ">
            {renderFilePreview(file)}
            <span className="text-xs text-center mt-2 break-all">{file.name}</span>
            <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={(e) => {
                    e.stopPropagation()
                    onRemove()
                }}
            >
                <FaTimes size={12} />
            </button>
        </div>
    );
}
export default FilePreview;