import React, { useEffect, useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { useNavigate } from 'react-router';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://secjaf-server-side.vercel.app/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }
        setCategories(data);
        setFilteredCategories(data);
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
    navigate(`/tutors-category/${language}`);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error}</div>;

  return (
    <div className='container mx-auto  md:my-10 my-5  md:p-5'>
      <h1 className="md:text-3xl text-xl font-bold text-center text-indigo-700 mb-6">Choose a Language to Learn</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((lang, i) => (
            <div
              key={i}
              className=" shadow p-4 rounded-lg bg-gradient-to-r  from-blue-200 to-blue-100 transition flex flex-col justify-between h-full"
            >
              <img
                src={`https://img.icons8.com/ios-filled/100/language.png`}
                alt={lang}
                className="w-16 h-16 mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold !text-gray-700  text-center mb-2">{lang}</h2>
              <p className="!text-gray-700 text-sm text-center mb-4 flex-1">Learn {lang} from expert tutors and interactive lessons. Start your journey today!</p>
              <div className='flex justify-center'>
                <button
                  onClick={() => handleClick(lang)}
                  className="mt-auto w-[100px] cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded-3xl transition"
                >
                  See More
                </button>
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
