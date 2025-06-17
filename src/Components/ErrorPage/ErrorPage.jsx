import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router';


const ErrorPage = () => {
    return (
        <div >
            <Helmet>
                <title>Error Page | Secjaf</title>
            </Helmet>
            <div className="min-h-screen flex flex-col items-center justify-center  text-center p-4">
      <h1 className="text-6xl font-bold  mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">No Tutor is Found</h2>
      <p className=" mb-6">
        Please select <span className="font-semibold">"Home"</span> to see wanted instructor.
      </p>
      <Link to="/">
       
        <button className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-white px-6 py-2 rounded-xl shadow">
          Go to Home
        </button>
      </Link>
    </div>

        </div>
    );
};

export default ErrorPage;