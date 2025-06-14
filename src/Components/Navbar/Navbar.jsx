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
    <div className="bg-white text-black nav border-b-2 border-white">
      <div className="container  mx-auto navbar lg:flex">
      
        <div className="navbar-start">
          <Link to="/">
            <img
              className="lg:w-[220px] w-[150px] "
              src="/images/logo.png"
              alt="Logo"
            />
          </Link>
        </div>

      
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-5">
            <NavLink to="/" className="cursor-pointer text-blue-600 md:font-bold">Home</NavLink>
            {user && <NavLink to="/my-booked-tutors" className="cursor-pointer text-amber-400 md:font-bold">My Booked Tutor</NavLink>}
            {user && <NavLink to="/add-tutorials" className="cursor-pointer text-blue-600 md:font-bold">Add Tutorials</NavLink>}
            {user && <NavLink to="/my-tutorials" className="cursor-pointer text-amber-400 md:font-bold">My Tutorials</NavLink>}
          </ul>
        </div>

      
        <div className="navbar-end hidden lg:flex gap-2 items-center">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <>
              <div className="relative group">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                ) : (
                  <img
                    src={defaultAvatar}
                    alt="default user"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                )}
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-3 py-1 text-sm font-bold bg-blue-400 text-white rounded hidden group-hover:block whitespace-nowrap z-50">
                  {user.displayName}
                </span>
              </div>
              <Link to="/">
              <button onClick={logout} className="btn btn-sm bg-amber-500 text-white rounded-2xl">Logout
               
              </button>
               </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn rounded-2xl bg-blue-400 text-white">Log In</Link>
              <Link to="/register" className="btn rounded-2xl bg-blue-400 text-white">Register</Link>
            </>
          )}

          <div>
            <button
              onClick={toggleTheme}
              className="text-2xl text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark-theme" ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>

        
        <div className="lg:hidden navbar-end">
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
          <ul className="space-y-3 text-base-100 text-sm text-center">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block">Home</NavLink>
            <NavLink to="/all-groups" onClick={() => setIsMenuOpen(false)} className="block text-blue-400">All Groups</NavLink>
            {user && <NavLink to="/my-group-page" onClick={() => setIsMenuOpen(false)} className="block">My Group</NavLink>}
            {user && <NavLink to="/create-group" onClick={() => setIsMenuOpen(false)} className="block">Create Group</NavLink>}
          </ul>

          <div className="mt-4 flex flex-col gap-2 text-center">
            {loading ? (
              <span className="loading loading-spinner loading-sm mx-auto"></span>
            ) : user ? (
              <div className="flex items-center justify-center gap-2">
                <div className="relative group">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="user"
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  ) : (
                    <img
                      src={defaultAvatar}
                      alt="default user"
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  )}
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-sm bg-blue-500 text-white rounded hidden group-hover:block whitespace-nowrap z-50">
                    {user.displayName}
                  </span>
                </div>
                <Link to="/">
              <button onClick={logout} className="btn btn-sm bg-amber-500 text-white rounded-2xl">Logout
      
              </button>
               </Link>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-400 text-white rounded-2xl">Log In</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn bg-blue-400 text-white rounded-2xl">Register</Link>
              </>
            )}
            <div>
            <button
              onClick={toggleTheme}
              className="text-2xl text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark-theme" ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;
