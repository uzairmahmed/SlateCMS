import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaTimes } from 'react-icons/fa';
import FilePreview from './FilePreview';
import { toast } from 'react-toastify';

interface FileUploadProps {
    files: File[];
    setFiles: (files: File[]) => void;
}

const MAX_SIZE_MB = 250 * 1024 * 1024;

const FileUpload: FC<FileUploadProps> = ({ files, setFiles }) => {
    const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            rejectedFiles.forEach((file) => {
                toast.error(`File "${file.file.name}" is too large. Maximum size is 250MB.`);
            });
        }

        setFiles([...files, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        maxSize: MAX_SIZE_MB,
    });

    const removeFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <div {...getRootProps({ className: 'dropzone p-4 text-center mb-4 border-2 border-dashed hover:border-primary transition-all' })}>
            <input {...getInputProps()} />
            <p className=''>Drag & drop files here, or click to select files</p>

            {files.length > 0 &&
                <div className="grid grid-cols-3 gap-4 mt-10">
                    {files.map((file, index) => (
                        <FilePreview file={file} onRemove={() => removeFile(index)} />
                    ))}
                </div>
            }
        </div>
    );
};

export default FileUpload;

