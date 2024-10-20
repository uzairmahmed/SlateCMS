import { FC, useState } from 'react';
import { postContent } from '../../apis/api';
import RichTextEditor from './RichTextEditor';
import FileUpload from './FileUpload';
import LinkInput from './LinkInput';

interface NewContentModalProps {
    courseCode: string;
    refresh: () => void;
}

const NewContentModal: FC<NewContentModalProps> = ({ courseCode, refresh }) => {
    const [title, setTitle] = useState('');
    const [rtf, setRtf] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [links, setLinks] = useState<string[]>([]);

    const [showRichTextEditor, setShowRichTextEditor] = useState(false);
    const [showFileUploader, setShowFileUploader] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log({ courseCode: courseCode, title: title, rtf: rtf, files: files, links: links });
        const postedSuccess = await postContent(courseCode, title, rtf, files, links);
        if (postedSuccess) {
            setTitle('');
            setRtf('');
            setFiles([]);
            setLinks([]);
            refresh();
            document.getElementById('newcontent')?.close();
        }
    };

    return (
        <>
            <button className="btn btn-neutral" onClick={() => document.getElementById("newcontent").showModal()}>Post new content</button>
            <dialog id={"newcontent"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Post new PDF content</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <input type="text" placeholder="Title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-2 mt-4">
                            <button type="button" className="btn btn-outline" onClick={() => setShowRichTextEditor(!showRichTextEditor)}>
                                {showRichTextEditor ? 'Remove Text Editor' : 'Add Text'}
                            </button>
                            <button type="button" className="btn btn-outline" onClick={() => setShowFileUploader(!showFileUploader)}>
                                {showFileUploader ? 'Remove File Upload' : 'Upload Files'}
                            </button>
                            <button type="button" className="btn btn-outline" onClick={() => setShowLinkInput(!showLinkInput)}>
                                {showLinkInput ? 'Remove Link Input' : 'Add Links'}
                            </button>
                        </div>

                        <div className="mt-4">
                            {showRichTextEditor && <RichTextEditor rtf={rtf} setRtf={setRtf} />}
                            {showFileUploader && <FileUpload files={files} setFiles={setFiles} />}
                            {showLinkInput && <LinkInput links={links} setLinks={setLinks} />}
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn">Post</button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default NewContentModal;
