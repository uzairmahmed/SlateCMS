import { FC, useEffect, useState } from 'react';
import { assignStudentsToCourse, assignTeachersToCourse, getStudents, getTeachers, postContent } from '../../apis/api';
import { CourseWithUsers, User } from '../interfaces';

interface AssignTeacherModalProps {
    courseCode: string,
    course: CourseWithUsers
}

const AssignTeacherModal: FC<AssignTeacherModalProps> = ({ courseCode, course }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [teachers, setTeachers] = useState<User[]>([]);


    useEffect(() => {
        if (course.teachers.length > 0) {
            setSelectedOptions(course.teachers)
        }
        const fetchTeachers = async () => {
            try {
                const teacherData = await getTeachers();
                setTeachers(teacherData);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };
        fetchTeachers();
    }, []);

    const handleSelectOption = (value: string) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(selectedOptions);
        await assignTeachersToCourse(courseCode, selectedOptions); // Adjust this function for teacher assignment
        document.getElementById("assignteacher")?.close();
    }

    return (
        <>
            <button className="btn btn-neutral" onClick={() => document.getElementById("assignteacher").showModal()}>Add Teachers</button>
            <dialog id={"assignteacher"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Assign Teachers to Course</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <div className='w-full'>
                            {teachers.map((teacher) => (
                                <div className='flex justify-between w-full gap-2 border-b px-5 py-2 my-1' key={teacher._id}>
                                    <span className="label-text">{teacher.name} ({teacher.email})</span>
                                    <input type="checkbox" className="toggle toggle-success" checked={selectedOptions.includes(teacher._id)} onChange={() => handleSelectOption(teacher._id)} />

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
export default AssignTeacherModal;