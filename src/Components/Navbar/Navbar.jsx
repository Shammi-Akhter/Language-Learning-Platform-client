import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router'; 
import { ThemeContext } from '../../Theme';
import { FiMoon, FiSun } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const defaultAvatar = 'https://i.ibb.co/ZYW3VTp/brown-brim.png';

  return (
    <div className="text-black border-b-2 border-white" style={{ backgroundColor: 'rgb(225, 230, 237)' }}>
      <div className="container mx-auto navbar flex justify-between items-center p-4">
      
        <div className="">
          <Link to="/">
            <img
              className="lg:w-[170px] w-[80px] md:h-[50px]  h-[20px] md:p-2"
              src="https://i.postimg.cc/t4V4pcdf/logo-11-2nd-removebg-preview.png"
              alt="Logo"
            />
          </Link>
        </div>

        
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1 flex gap-5 items-center">
            <NavLink to="/" className="text-blue-600 font-semibold">Home</NavLink>
            <NavLink to="/find-tutors" className="text-blue-600 font-semibold">Find Tutors</NavLink>
            {user && <NavLink to="/my-booked-tutors" className="text-amber-500 font-semibold">My Booked Tutor</NavLink>}
            {user && <NavLink to="/add-tutorials" className="text-blue-600 font-semibold">Add Tutorials</NavLink>}
            {user && <NavLink to="/my-tutorials" className="text-amber-500 font-semibold">My Tutorials</NavLink>}
          </ul>
        </div>

        
        <div className="hidden lg:flex items-center gap-4">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL || defaultAvatar}
                  alt="user"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-3 py-1 text-sm font-bold bg-blue-400 text-white rounded hidden group-hover:block whitespace-nowrap z-50">
                  {user.displayName}
                </span>
              </div>
              <button onClick={logout} className="btn btn-sm bg-blue-300 text-white rounded-2xl">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn rounded-2xl bg-blue-200 text-white">Log In</Link>
              <Link to="/register" className="btn rounded-2xl bg-blue-200 text-white">Register</Link>
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
            <NavLink to="/category" onClick={() => setIsMenuOpen(false)} className="block">Find Tutors</NavLink>
            {user && <NavLink to="/my-booked-tutors" onClick={() => setIsMenuOpen(false)} className="block">My Booked Tutor</NavLink>}
            {user && <NavLink to="/add-tutorials" onClick={() => setIsMenuOpen(false)} className="block">Add Tutorials</NavLink>}
            {user && <NavLink to="/my-tutorials" onClick={() => setIsMenuOpen(false)} className="block">My Tutorials</NavLink>}
          </ul>

          <div className="mt-4 flex flex-col items-center gap-3">
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : user ? (
              <>
                <div className="relative group">
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-sm bg-blue-500 text-white rounded hidden group-hover:block">
                    {user.displayName}
                  </span>
                </div>
                <button onClick={logout} className="btn btn-sm bg-blue-300 text-white rounded-2xl">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-400 text-white rounded-2xl">Log In</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-400 text-white rounded-2xl">Register</Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="text-2xl text-gray-500 hover:text-yellow-500"
            >
              {theme === "dark-theme" ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
