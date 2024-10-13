import type { FC } from 'react';

interface SidebarProps { }

const Sidebar: FC<SidebarProps> = ({ }) => {
    return (
        <div className="flex flex-col w-80 h-full border-r p-4 justify-between">
            <div className="">
                <a className="btn btn-ghost text-xl">Slate</a>

                <div className='font-semibold'>
                    <ul className="menu text-lg">
                        <li>
                            <a href="#">Courses</a>
                        </li>
                        <li>
                            <a href="#">Knowledge Base</a>
                        </li>
                        <li>
                            <a href="#">AI Teacher</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='flex justify-end self-end'>
                <div className="dropdown dropdown-end">
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
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;