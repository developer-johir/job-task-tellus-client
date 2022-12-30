import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="navbar bg-info ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-info rounded-box w-52">
                            <li><Link>Media</Link></li>
                            <li><Link>Message</Link></li>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">JS Media</Link>
                </div>
                <div className=" hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ml-96">
                        <li><Link to='/allPost'>Media</Link></li>
                        <li><Link>Message</Link></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://i.ibb.co/7KD3NwY/80-800194-transparent-users-icon-png-flat-user-icon-png.png" alt='' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-info rounded-box w-52">
                        <li>
                            <Link to='/about' className="justify-between">
                                <button> About </button>
                            </Link>
                        </li>
                        <li><Link>Settings</Link></li>
                        <li><Link>
                            <button onClick={handleLogOut}> Logout </button>
                        </Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;