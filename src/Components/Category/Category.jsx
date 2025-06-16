import React, { useEffect, useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { useNavigate } from 'react-router';

const Category = () => {
  const [categories, setCategories] = useState([]);
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
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (language) => {
    navigate(`/find-tutors/${language}`);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error}</div>;

  return (
    <div className='container mx-auto md:mb-15'>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:mt-15 ">
        <h1 className="col-span-2 md:col-span-4 text-4xl font-bold md:mb-10 text-center  !text-indigo-700">Explore Languages</h1>
      {categories.map((lang, i) => (
        <div
          key={i}
          onClick={() => handleClick(lang)}
          className="cursor-pointer shadow p-4 rounded-lg bg-gradient-to-r from-blue-200 via-purple-200 to-pink-100 hover:bg-blue-50 transition flex flex-col justify-center"
        >
          <img src={`https://img.icons8.com/ios-filled/100/language.png`} alt={lang} className="w-12 h-12 mx-auto" /> 
          <div className='flex items-center justify-between mt-4'>
            <h2 className="text-xl font-semibold mt-2">{lang}</h2>
          <IoIosArrowDropright className='md:w-[30px] md:h-[30px]' />
            
          </div>
          
        </div>
      ))}
    </div>
    </div>
  );
};

export default Category;