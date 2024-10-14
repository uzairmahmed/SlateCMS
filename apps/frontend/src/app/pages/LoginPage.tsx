import { FC, useState } from 'react';
import { MdKey, MdMail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../apis/api';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({ }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginStatus = await loginUser(email, password)
        setEmail("")
        setPassword("")
        if (loginStatus) {
            navigate('/courses')
        }
    };


    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-8 space-y-8 bg-white border shadow-lg rounded-xl'>
                <h1 className='text-md font-semibold'>Login</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <MdMail />
                    <input type="text" className="w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdKey />
                    <input type="password" className="w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" className='btn btn-neutral'>
                    Login
                </button>

                <h1 className='text-sm font-semibold'>Don't have an Account? <span className='link-primary'><a href='/signup'>Sign Up.</a></span></h1>
            </form>
        </div>
    );
}
export default LoginPage;