import React, { useContext, useEffect, useState } from 'react';

import { Outlet, useLocation } from 'react-router';
import { Toaster } from 'react-hot-toast';
import "../App.css"
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { ThemeContext } from '../Theme';

const Root = () => {
  const location = useLocation();
   const [loading, setLoading] = useState(false);

  useEffect(() => {
  setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, [location.pathname]);
const { theme } = useContext(ThemeContext);
  return (
   <div className={`App ${theme}`}>
    <Toaster/>
      <Navbar />
       {loading && (
        <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
