import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';

const FindTutorsCategory = () => {
  const { category } = useParams();
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  setLoading(true); 

  fetch(`https://secjaf-server-side.vercel.app/find-tutors/${category}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("No tutors found for this category");
      }
      return res.json();
    })
    .then((data) => {
      if (!data || data.length === 0) {
        setLoading(false); 
        navigate('/error');
      } else {
        setTutors(data);
        setError('');
        setLoading(false); 
      }
    })
    .catch((err) => {
      console.error(err);
      setError(err.message);
      setLoading(false); 
      navigate('/error');
    });
}, [category, navigate]);


  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Loading tutors for <span className="font-semibold">{category}</span>...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
        <Link to="/category" className="text-blue-600 underline">Back to categories</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700 text-center">
        {category} Tutors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutors.map((tutor, idx) => (
          <div key={idx} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="mt-2 text-xl font-semibold">{tutor.name}</h2>
            <p><strong>Language:</strong> {tutor.language}</p>
            <p><strong>Price:</strong> ${tutor.price}</p>
            <p><strong>Rating:</strong> {tutor.review}</p>
            <p className="text-sm mt-1">{tutor.details}</p>
            <p className="text-xs text-gray-500 mt-1">Email: {tutor.email}</p>
            <Link to={`/tutor-details/${tutor._id}`}>
              <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link to="/category">
          <button className="mt-8 bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600">
            Back to Categories
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FindTutorsCategory;
