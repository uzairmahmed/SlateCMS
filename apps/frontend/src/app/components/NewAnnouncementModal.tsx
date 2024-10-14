import { FC, useState } from 'react';
import { postAnnouncement } from '../../apis/api';

interface NewAnnouncementModalProps {
    courseCode : string,
    refresh: () => void;
}

const NewAnnouncementModal: FC<NewAnnouncementModalProps> = ({ courseCode, refresh }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postAnnouncement(courseCode, title, message)
        setTitle("")
        setMessage("")
        document.getElementById("newannouncement")?.close()
        refresh()
    }

    return (
        <>
            <button className="btn btn-neutral" onClick={() => document.getElementById("newannouncement").showModal()}>Create New Announcement</button>
            <dialog id={"newannouncement"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Create a new Announcement</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <input type="text" placeholder="Title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)}/>
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
export default NewAnnouncementModal;