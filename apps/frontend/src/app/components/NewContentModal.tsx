import { FC, useState } from 'react';
import { postContent } from '../../apis/api';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface NewContentModalProps {
    courseCode: string,
    refresh: () => void;
}

const NewContentModal: FC<NewContentModalProps> = ({ courseCode, refresh }) => {
    const [title, setTitle] = useState('');
    // const [message, setMessage] = useState('');
    const [rtf, setRtf] = useState('')
    // const [url, setUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postContent(courseCode, title, rtf)
        setTitle("")
        // setMessage("")
        // setUrl("")
        setRtf("")
        refresh()
        document.getElementById("newcontent")?.close()
    }

    return (
        <>
            <button className="btn btn-neutral" onClick={() => document.getElementById("newcontent").showModal()}>Post new content</button>
            <dialog id={"newcontent"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Post new PDF content</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <input type="text" placeholder="Title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {/* <textarea placeholder="Message" className="textarea textarea-bordered w-full" value={message} onChange={(e) => setMessage(e.target.value)} /> */}

                        <ReactQuill
                            value={rtf}
                            onChange={setRtf}
                            className="w-full"
                        />

                    </div>
                    <div className="modal-action">
                        {/* <form method="dialog"> */}
                        <button type="submit" className="btn">Post</button>
                        {/* </form> */}
                    </div>
                </form>
            </dialog>
        </>
    );
}
export default NewContentModal;