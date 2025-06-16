import React, { useEffect, useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { useNavigate } from 'react-router';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }
        setCategories(data);
        setFilteredCategories(data); // initialize filtered categories
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();
    const filtered = categories.filter(lang =>
      lang.toLowerCase().includes(lowerSearch)
    );
    setFilteredCategories(filtered);
  }, [searchText, categories]);

  const handleClick = (language) => {
    navigate(`/find-tutors/${language}`);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error}</div>;

  return (
    <div className='container mx-auto md:mt-10 mt-5 md:mb-15 md:p-5'>
      <h1 className="md:text-4xl text-xl font-bold text-center text-indigo-700 mb-6">Choose a Language to Learn</h1>


      <div className="mb-6 flex justify-center px-4">
        <input
          type="text"
          placeholder="Search language..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((lang, i) => (
            <div
              key={i}
              onClick={() => handleClick(lang)}
              className="cursor-pointer shadow p-4 rounded-lg bg-gradient-to-r from-blue-200 via-purple-200 to-pink-100 hover:bg-blue-50 transition flex flex-col justify-between"
            >
              <img
                src={`https://img.icons8.com/ios-filled/100/language.png`}
                alt={lang}
                className="w-12 h-12 mx-auto"
              />
              <div className='flex items-center justify-between mt-4'>
                <h2 className="text-xl font-semibold mt-2">{lang}</h2>
                <IoIosArrowDropright className='md:w-[30px] md:h-[30px]' />
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">No matching languages found.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
