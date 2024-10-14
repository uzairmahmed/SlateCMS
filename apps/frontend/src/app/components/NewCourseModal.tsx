import { FC, useState } from 'react';
import { createCourse, postContent } from '../../apis/api';

interface NewCourseModalProps {
    refresh: () => void;
}

const NewCourseModal: FC<NewCourseModalProps> = ({ refresh }) => {
    const [name, setName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createCourse(name, courseCode, description)
        setName("")
        setCourseCode("")
        setDescription("")
        refresh()
        document.getElementById("newcourse")?.close()
    }

    return (
        <>
            <button className="btn btn-neutral" onClick={() => document.getElementById("newcourse").showModal()}>New Course</button>
            <dialog id={"newcourse"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Create a new Course</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <input type="text" placeholder="Course Code" className="input input-bordered w-full" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
                        <input type="text" placeholder="Name" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} />
                        <textarea placeholder="Description" className="textarea textarea-bordered w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="modal-action">
                        {/* <form method="dialog"> */}
                        <button type="submit" className="btn">Create</button>
                        {/* </form> */}
                    </div>
                </form>
            </dialog>
        </>
    );
}
export default NewCourseModal;