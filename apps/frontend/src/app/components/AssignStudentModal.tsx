import { FC, useEffect, useState } from 'react';
import { assignStudentsToCourse, getStudents, postContent } from '../../apis/api';
import { CourseWithUsers, User } from '../interfaces';

interface AssignStudentModalProps {
    courseCode: string,
    course: CourseWithUsers
    refresh: () => void;
}

const AssignStudentModal: FC<AssignStudentModalProps> = ({ courseCode, course, refresh }) => {
    const [selectedOptions, setSelectedOptions] = useState<User[]>([]);
    const [students, setStudents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchStudents = async () => {
        setLoading(true)
        try {
            const studentData = await getStudents();
            setStudents(studentData);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching students:", error);
            setLoading(false)
        }
    };

    const handleSelectOption = (value: string) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const handleLoad = () => {
        setSelectedOptions(course.students)
        fetchStudents()
        document.getElementById("assignstudent").showModal()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await assignStudentsToCourse(courseCode, selectedOptions);
        setSelectedOptions([])
        refresh()
        document.getElementById("assignstudent")?.close();
    }

    return (
        <>
            <button className="btn btn-neutral" onClick={() => handleLoad()}>Add Students</button>
            <dialog id={"assignstudent"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Assign Students to Course</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <div className='w-full'>
                            {!loading && students.map((student) => (
                                <div className='flex justify-between w-full gap-2 border-b px-5 py-2 my-1' key={student._id}>
                                    <span className="label-text">{student.name} ({student.email})</span>
                                    <input type="checkbox" className="toggle toggle-success" checked={selectedOptions.includes(student._id)} onChange={() => handleSelectOption(student._id)} />

                                </div>
                            ))}
                        </div>



                    </div>
                    <div className="modal-action">
                        {/* <form method="dialog"> */}
                        <button type="submit" className="btn">Assign</button>
                        {/* </form> */}
                    </div>
                </form>
            </dialog>
        </>
    );
}
export default AssignStudentModal;