import { FC, useState } from 'react';
import { MdKey, MdMail, MdPerson, MdPhone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { loginUser, signUpUser } from '../../apis/api';
import { toast } from 'react-toastify';

interface SignupPageProps { }

const SignupPage: FC<SignupPageProps> = ({ }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setAccountType] = useState('student');

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && phone && password && confirmPassword) {
            if (password === confirmPassword) {
                const signupStatus = await signUpUser(accountType, email, password, name, phone)

                if (signupStatus) {
                    setName("")
                    setEmail("")
                    setPhone("")
                    setPassword("")
                    setConfirmPassword("")

                    navigate('/login')
                }
            } else {
                toast("Passwords don't match")
            }
        } else {
            toast("All fields are required")
        }
    };


    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-8 space-y-8 bg-white border shadow-lg rounded-xl'>
                <h1 className='text-md font-semibold'>Sign Up</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <MdPerson />
                    <input type="text" className="w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdMail />
                    <input type="text" className="w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdPhone />
                    <input type="text" className="w-full" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdKey />
                    <input type="password" className="w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdKey />
                    <input type="password" className="w-full" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <div className="flex flex-col items-center gap-1 w-full ">
                    <div className='flex w-full gap-5 cursor-pointer select-none hover:bg-slate-200 transition-all py-1 px-1 rounded-2xl' onClick={() => setAccountType('student')}>
                        <input checked={accountType === 'student'} type="radio" name="radio-10" className="radio checked:bg-blue-500" />
                        <span className="label-text">I am a Student</span>
                    </div>
                    <div className='flex w-full gap-5 cursor-pointer select-none hover:bg-slate-200 transition-all py-1 px-1 rounded-2xl' onClick={() => setAccountType('teacher')} >
                        <input checked={accountType === 'teacher'} type="radio" name="radio-10" className="radio checked:bg-blue-500" />
                        <span className="label-text">I am a Teacher</span>
                    </div>

                </div>

                <button type="submit" className='btn btn-neutral'>
                    Sign up
                </button>

                <h1 className='text-sm font-semibold'>Already have an Account? <span className='link-primary'><a href='/login'>Login.</a></span></h1>

            </form>
        </div>
    );
}
export default SignupPage;