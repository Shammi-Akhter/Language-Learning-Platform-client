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
    <div className="text-black border-b-2 border-white shadow-xl">
      <div className="container mx-auto navbar flex justify-between items-center p-4">

        <Link to="/">
          <img
            className="lg:w-[170px] w-[80px] md:h-[50px] h-[20px] md:p-2"
            src="https://i.postimg.cc/t4V4pcdf/logo-11-2nd-removebg-preview.png"
            alt="Logo"
          />
        </Link>


        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1 flex gap-5 items-center">
            <NavLink to="/" className="text-blue-600 font-semibold">Home</NavLink>
            <NavLink to="/find-tutors" className="text-blue-600 font-semibold">Find Tutors</NavLink>
            {user && <NavLink to="/my-booked-tutors" className="text-amber-500 font-semibold">My Booked Tutor</NavLink>}
            {user && <NavLink to="/add-tutorials" className="text-blue-600 font-semibold">Add Tutorials</NavLink>}
            {user && <NavLink to="/my-tutorials" className="text-amber-500 font-semibold">My Tutorials</NavLink>}
          </ul>
        </div>


        <div className="hidden lg:flex items-center gap-6 relative">
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
                  className={`absolute right-0 top-full mt-3 w-48 p-3 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 z-50 ${isProfileOpen ? 'block' : 'hidden'
                    }`}
                >
                  <div className="text-center font-semibold ">{user.displayName}</div>


                </div>
              </div>


              <button
                onClick={logout}
                className="btn btn-sm bg-red-400 text-white rounded-2xl hover:bg-red-500 transition"
              >
                Logout
              </button>


             
            </>
          ) : (
            <>
              <Link to="/login" className="btn rounded-2xl bg-blue-200 text-white">
                Log In
              </Link>
              <Link to="/register" className="btn rounded-2xl bg-blue-200 text-white">
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
        <div className="lg:hidden px-6 pb-4">
          <ul className="space-y-3 text-center">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block">Home</NavLink>
            <NavLink to="/find-tutors" onClick={() => setIsMenuOpen(false)} className="block">Find Tutors</NavLink>
            {user && <NavLink to="/my-booked-tutors" onClick={() => setIsMenuOpen(false)} className="block">My Booked Tutor</NavLink>}
            {user && <NavLink to="/add-tutorials" onClick={() => setIsMenuOpen(false)} className="block">Add Tutorials</NavLink>}
            {user && <NavLink to="/my-tutorials" onClick={() => setIsMenuOpen(false)} className="block">My Tutorials</NavLink>}
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
                    <div className="absolute  top-[-10px] left-10 mt-2 px-1 py-1 w-[130px] text-sm bg-blue-500 text-white rounded shadow text-center">
                      {user.displayName}
                    </div>
                  )}
                </div>
                <button onClick={logout} className="btn btn-sm bg-blue-300 text-white rounded-2xl">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-400 text-white rounded-2xl">Log In</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-400 text-white rounded-2xl">Register</Link>
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
    </div>
  );
};

export default Navbar;
