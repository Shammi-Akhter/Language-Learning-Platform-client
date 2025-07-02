import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const FindTutor = () => {
    const [tutors, setTutors] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredTutors, setFilteredTutors] = useState([]);

    useEffect(() => {
        fetch('https://secjaf-server-side.vercel.app/tutors')
            .then(res => res.json())
            .then(data => {
                setTutors(data);
                setFilteredTutors(data);
            })
            .catch(err => console.error('Error fetching tutors:', err));
    }, []);

    useEffect(() => {
        const filtered = tutors.filter(tutor =>
            tutor.language.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredTutors(filtered);
    }, [searchText, tutors]);

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-6">All Tutors</h2>


            <div className="mb-8 text-center">
                <input
                    type="text"
                    placeholder="Search by language..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map(tutor => (
                        <div key={tutor._id} className="stat-card rounded-2xl shadow-lg p-5">
                            <img
                                src={tutor.image}
                                alt={tutor.name}
                                className="w-full h-60 object-cover rounded-xl mb-4"
                            />
                            <h3 className="text-xl font-semibold text-indigo-600">Name: {tutor.userName}</h3>
                            <h3 className=" text-gray-700"><span className="font-semibold">Email:</span>  {tutor.email}</h3>
                            <p className="text-gray-700"><span className="font-semibold">Language:</span> {tutor.language}</p>
                            <p className="text-gray-700"><span className="font-semibold">Review:</span> {tutor.review }</p>
                            <p className="text-gray-600 mt-2"><span className="font-semibold">Description: </span>{tutor.description?.slice(0, 100)}...</p>
                            <Link to={`/tutorial-details/${tutor._id}`}>
                                <button className="mt-2 bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer">Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No tutors found for "{searchText}"</p>
                )}
            </div>
        </div>
    );
};

export default FindTutor;
