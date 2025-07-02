import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ThemeContext } from '../../Theme';
import { FiMoon, FiSun } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const defaultAvatar = 'https://i.ibb.co/ZYW3VTp/brown-brim.png';

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="nav sticky top-0 z-50 text-black dark:text-white border-b-2 border-white dark:border-gray-800 shadow-xl">
      <div className="container mx-auto navbar flex justify-between items-center p-4">

        <Link to="/">
          <img
            className="lg:w-[170px] w-[80px] md:h-[50px] h-[20px] md:p-2"
            src="https://i.postimg.cc/t4V4pcdf/logo-11-2nd-removebg-preview.png"
            alt="Logo"
          />
        </Link>


        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1 flex gap-1 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2 py-1 rounded-lg transition-all duration-200 font-semibold 
                ${isActive ? "bg-blue-400 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow "  : "text-blue-600 dark:text-blue-300"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/find-tutors"
              className={({ isActive }) =>
                `px-2 py-1 rounded-lg transition-all duration-200 font-semibold 
                ${isActive ? "bg-blue-400 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow" : "text-blue-600 dark:text-blue-300"}`
              }
            >
              Find Tutors
            </NavLink>
            {user && (
              <NavLink
                to="/my-booked-tutors"
                className={({ isActive }) =>
                  `px-2 py-1 rounded-lg transition-all duration-200 font-semibold 
                  ${isActive ? "bg-blue-400 dark:bg-amber-700 text-amber-700 dark:text-white font-bold shadow" : "text-amber-500 dark:text-amber-300"}`
                }
              >
                My Booked Tutor
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/add-tutorials"
                className={({ isActive }) =>
                  `px-2 py-1 rounded-lg transition-all duration-200 font-semibold 
                  ${isActive ? "bg-blue-400 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow" : "text-blue-600 dark:text-blue-300"}`
                }
              >
                Add Tutorials
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/my-tutorials"
                className={({ isActive }) =>
                  `px-2 py-1 rounded-lg transition-all duration-200 font-semibold 
                  ${isActive ? "bg-blue-400 dark:bg-amber-700 text-amber-700 dark:text-white font-bold shadow" : "text-amber-500 dark:text-amber-300"}`
                }
              >
                My Tutorials
              </NavLink>
            )}
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `px-2 py-1 rounded-lg transition-all duration-200 font-semibold 
                ${isActive ? "bg-blue-400 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow" : "text-blue-600 dark:text-blue-300"}`
              }
            >
              About us
            </NavLink>
          </ul>
        </div>


        <div className="hidden lg:flex items-center gap-2 relative">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <>

              <div className="relative group flex items-center">
                <span className="mr-2 text-sm font-semibold text-gray-700 hidden group-hover:inline-block transition-all duration-300">
                  {user.displayName}
                </span>
                <img
                  src={user.photoURL || defaultAvatar}
                  alt="user"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={toggleProfileDropdown}
                />


                <div
                  className={`absolute right-0 top-full mt-3 w-48 p-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 ${isProfileOpen ? 'block' : 'hidden'
                    }`}
                >
                  <div className="text-center font-semibold ">{user.displayName}</div>


                </div>
              </div>


              <button
                onClick={logout}
                className="btn btn-sm bg-blue-400 text-white rounded-2xl hover:bg-red-500 transition"
              >
                Logout
              </button>


             
            </>
          ) : (
            <>
              <Link to="/login" className="btn rounded-2xl bg-blue-400 dark:bg-blue-700 text-white">
                Log In
              </Link>
              <Link to="/register" className="btn rounded-2xl bg-blue-400 dark:bg-blue-700 text-white">
                Register
              </Link>
               
            </>
          )}

          <button
                onClick={toggleTheme}
                className="text-2xl text-gray-500 hover:text-yellow-500 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark-theme" ? <FiSun /> : <FiMoon />}
              </button>
        </div>



        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost text-2xl"
          >
            ☰
          </button>
        </div>
      </div>


      {isMenuOpen && (
        <div className="lg:hidden px-6 pb-4 bg-white dark:bg-black">
          <ul className="space-y-3 text-center">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-1 rounded-lg transition-all duration-200 font-semibold  ${isActive ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow" : "text-blue-600 dark:text-blue-300"}`}>Home</NavLink>
            <NavLink to="/find-tutors" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-1 rounded-lg transition-all duration-200 font-semibold  ${isActive ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow" : "text-blue-600 dark:text-blue-300"}`}>Find Tutors</NavLink>
            {user && <NavLink to="/my-booked-tutors" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-1 rounded-lg transition-all duration-200 font-semibold  ${isActive ? "bg-amber-100 dark:bg-amber-700 text-amber-700 dark:text-white font-bold shadow" : "text-amber-500 dark:text-amber-300"}`}>My Booked Tutor</NavLink>}
            {user && <NavLink to="/add-tutorials" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-1 rounded-lg transition-all duration-200 font-semibold  ${isActive ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow" : "text-blue-600 dark:text-blue-300"}`}>Add Tutorials</NavLink>}
            {user && <NavLink to="/my-tutorials" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-1 rounded-lg transition-all duration-200 font-semibold  ${isActive ? "bg-amber-100 dark:bg-amber-700 text-amber-700 dark:text-white font-bold shadow" : "text-amber-500 dark:text-amber-300"}`}>My Tutorials</NavLink>}
            <NavLink to="/about-us" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-1 rounded-lg transition-all duration-200 font-semibold  ${isActive ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white font-bold shadow" : "text-blue-600 dark:text-blue-300"}`}>About us</NavLink>
          </ul>


          <div className="mt-4 flex flex-col items-center gap-3 relative">
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : user ? (
              <>
                <div className="relative">

                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="user"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={toggleProfileDropdown}
                  />
                  {isProfileOpen && (
                    <div className="absolute  top-[-10px] left-10 mt-2 px-1 py-1 w-[130px] text-sm bg-blue-500 dark:bg-blue-800 text-white rounded shadow text-center">
                      {user.displayName}
                    </div>
                  )}
                </div>
                <button onClick={logout} className="btn btn-sm bg-blue-300 dark:bg-blue-700 text-white rounded-2xl">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-600 dark:bg-blue-700 text-white rounded-2xl">Log In</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-600 dark:bg-blue-700 text-white rounded-2xl">Register</Link>
                <button
              onClick={toggleTheme}
              className="text-2xl text-gray-500 hover:text-yellow-500"
            >
              {theme === 'dark-theme' ? <FiSun /> : <FiMoon />}
            </button>
              </>
            )}

          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
