import { FC, useState } from 'react';
import { postDiscussion } from '../../apis/api';

interface NewDiscussionModalProps {
    courseCode: string,
    refresh: () => void;
}

const NewDiscussionModal: FC<NewDiscussionModalProps> = ({ courseCode, refresh }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postDiscussion(courseCode, title, message)
        setTitle("")
        setMessage("")
        refresh()
        document.getElementById("newdiscussion")?.close()
    }

    return (
        <>
            <button className="btn btn-neutral" onClick={() => document.getElementById("newdiscussion").showModal()}>Create New Discussion Thread</button>
            <dialog id={"newdiscussion"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Create a new Discussion Thread</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <input type="text" placeholder="Title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea placeholder="Message" className="textarea textarea-bordered w-full" value={message} onChange={(e) => setMessage(e.target.value)} />
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
export default NewDiscussionModal;