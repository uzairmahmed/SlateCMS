import type { FC } from 'react';
import { logout } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';

interface SidebarProps { }

const Sidebar: FC<SidebarProps> = ({ }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
        window.location.reload()
    }
    return (
        <div className="flex flex-col w-80 h-full border-r p-4 justify-between">
            <div className="">
                <a className="text-xl">Slate</a>

                <div className='font-semibold'>
                    <ul className="menu text-lg">
                        <li>
                            <a href="/courses">Courses</a>
                        </li>
                        <li>
                            <a href="/knowledgebase">Knowledge Base</a>
                        </li>
                        <li>
                            <a href="/ai">AI Teacher</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='flex justify-end self-start'>
                <div className="dropdown dropdown-top dropdown-right">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <button onClick={() => handleLogout()} className='btn btn-outline btn-sm btn-error'>Logout</button>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;