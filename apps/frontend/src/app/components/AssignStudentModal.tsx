import { FC, useEffect, useState } from 'react';
import { assignStudentsToCourse, getStudents, postContent } from '../../apis/api';
import { CourseWithUsers, User } from '../interfaces';

interface AssignStudentModalProps {
    courseCode: string,
    course: CourseWithUsers
}

const AssignStudentModal: FC<AssignStudentModalProps> = ({ courseCode, course }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [students, setStudents] = useState<User[]>([]);


    useEffect(() => {
        if (course.students.length > 0) {
            setSelectedOptions(course.students)
        }
        const fetchStudents = async () => {
            try {
                const studentData = await getStudents();
                setStudents(studentData);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
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
        await assignStudentsToCourse(courseCode, selectedOptions); // Adjust this function for student assignment
        document.getElementById("assignstudent")?.close();
    }

    return (
        <>
            <button className="btn btn-neutral" onClick={() => document.getElementById("assignstudent").showModal()}>Add Students</button>
            <dialog id={"assignstudent"} className="modal">
                <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-lg">Assign Students to Course</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <div className='w-full'>
                            {students.map((student) => (
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