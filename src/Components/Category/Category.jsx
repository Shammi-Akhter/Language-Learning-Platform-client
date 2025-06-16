import React, { useEffect, useState } from 'react';
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <h1 className="col-span-2 md:col-span-4 text-2xl font-bold mb-4 text-center">Explore Languages</h1>
      {categories.map((lang, i) => (
        <div
          key={i}
          onClick={() => handleClick(lang)}
          className="cursor-pointer shadow p-4 rounded-lg bg-white hover:bg-blue-50 transition"
        >
          <img src={`https://img.icons8.com/ios-filled/100/language.png`} alt={lang} className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-2">{lang}</h2>
        </div>
      ))}
    </div>
  );
};

export default Category;