import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const FindTutor = () => {
    const [tutors, setTutors] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredTutors, setFilteredTutors] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');

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
        let filtered = tutors.filter(tutor =>
            tutor.language && tutor.language.toLowerCase().includes(searchText.toLowerCase())
        );
        if (languageFilter) {
            filtered = filtered.filter(tutor => tutor.language === languageFilter);
        }
        if (sortBy === 'name-asc') {
            filtered = [...filtered].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        } else if (sortBy === 'name-desc') {
            filtered = [...filtered].sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        } else if (sortBy === 'language') {
            filtered = [...filtered].sort((a, b) => (a.language || '').localeCompare(b.language || ''));
        } else if (sortBy === 'price-asc') {
            filtered = [...filtered].sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        } else if (sortBy === 'price-desc') {
            filtered = [...filtered].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        }
        setFilteredTutors(filtered);
    }, [searchText, tutors, sortBy, languageFilter]);

    // Get unique languages for filter dropdown
    const uniqueLanguages = Array.from(new Set(tutors.map(t => t.language)));

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-6">All Tutors</h2>

            {/* Sort and Filter Controls */}
            <form onSubmit={e => e.preventDefault()} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by language..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="w-full md:w-1/6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Sort By</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                   
                </select>
                <select
                    value={languageFilter}
                    onChange={e => setLanguageFilter(e.target.value)}
                    className="w-full md:w-1/6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Languages</option>
                    {uniqueLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map(tutor => (
                        <div key={tutor._id} className="stat-card rounded-2xl shadow-lg p-5">
                            <img
                                src={tutor.image}
                                alt={tutor.name}
                                className="w-full h-60 object-cover rounded-xl mb-4"
                            />
                            <h3 className="text-xl font-semibold text-indigo-600">Name: {tutor.name}</h3>
                            <h3 className=" text-gray-700"><span className="font-semibold">Email:</span>  {tutor.email}</h3>
                            <p className="text-gray-700"><span className="font-semibold">Language:</span> {tutor.language}</p>
                            <p className="text-gray-700"><span className="font-semibold">Review:</span> {tutor.review }</p>
                            <p className="text-gray-600 mt-2"><span className="font-semibold">Description: </span>{tutor.description?.slice(0, 100)}...</p>
                            <Link to={`/tutorial-details/${tutor._id}`}>
                                <button className="mt-2 bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-500 cursor-pointer">Details</button>
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
