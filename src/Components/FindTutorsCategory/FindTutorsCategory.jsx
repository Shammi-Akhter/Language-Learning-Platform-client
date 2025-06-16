import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const FindTutorsCategory = () => {
  const { category } = useParams();
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/find-tutors/${category}`)
      .then(res => res.json())
      .then(data => setTutors(data));
  }, [category]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 !text-indigo-700 text-center"> {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {tutors.map((tutor, idx) => (
          <div key={idx} className="p-4 border rounded-lg shadow">
            <img src={tutor.image} alt={tutor.name} className="w-full h-40 object-cover rounded" />
            <h2 className="mt-2 text-xl font-semibold">{tutor.name}</h2>
            <p>Language: {tutor.language}</p>
            <p>Price: ${tutor.price}</p>
            <p>Rating: {tutor.review}</p>
            <p className="text-sm mt-1">{tutor.details}</p>
            <p className="text-xs text-gray-500 mt-1">Email: {tutor.email}</p>

            <Link to={`/tutors/${tutor._id}`}>
              <button className="mt-2 bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer">Details</button>
            </Link>

          </div>

        ))}
      </div>
      <div className="flex justify-center">
  <Link to="/category">
    <button className="mt-2 md:mt-10 bg-blue-400 text-black px-4 py-1 rounded hover:bg-blue-600 cursor-pointer">
      Back to Categories
    </button>
  </Link>
</div>

    </div>
  );
};

export default FindTutorsCategory;
