import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const StatsSection = () => {
  const [userCount, setUserCount] = useState(null);
  const [languageCount, setLanguageCount] = useState(null);
  const [tutorCount, setTutorCount] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://secjaf-server-side.vercel.app/firebase-user-count')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setUserCount(data.userCount))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const [tutorsRes, tutorialsRes] = await Promise.all([
        fetch('https://secjaf-server-side.vercel.app/tutors'),
        fetch('https://secjaf-server-side.vercel.app/tutorials'),
      ]);

      if (!tutorsRes.ok || !tutorialsRes.ok) throw new Error('Network response was not ok');

      const tutors = await tutorsRes.json();
      const tutorials = await tutorialsRes.json();

      
      setTutorCount(tutors.length + tutorials.length);

      
      const uniqueLanguages = new Set(tutors.map(tutor => tutor.language));
      setLanguageCount(uniqueLanguages.size);

      
      const tutorsWithGoodReviews = tutors.filter(tutor => tutor.review > 4);
      setReviewsCount(tutorsWithGoodReviews.length);

    } catch (err) {
      setError(err.message);
    }
  };

  fetchStats();
}, []);


  if (error) return <div>Error: {error}</div>;
  if (userCount === null || tutorCount === null || languageCount === null || reviewsCount === null)
    return  <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>;

  return (
    <section className="container md:mx-auto md:my-10 my-5 md:px-4 px-2 md:py-10 py-5">
      <h2 className="md:text-3xl text-xl font-bold text-center mb-8 ">Platform Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:px-0 px-10 md:py-0 py-5 ">
        <div className="stat-card shadow-lg rounded-2xl md:p-6 text-center hover:shadow-indigo-200 transition">
          <p className="md:text-4xl text-xl font-bold text-indigo-600">{tutorCount}</p>
          <p className="md:text-lg font-medium text-gray-700 mt-2">Tutors</p>
        </div>
          <div className="stat-card shadow-lg rounded-2xl md:p-6 text-center hover:shadow-indigo-200 transition">
          <p className="md:text-4xl text-xl font-bold text-indigo-600">{reviewsCount} <span className="text-xs">Tutors</span></p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="md:text-lg font-medium text-gray-700 ">Rating </p>
            <FaStar className="text-yellow-500 md:text-lg"  />
            <FaStar className="text-yellow-500 md:text-lg"  />
            <FaStar className="text-yellow-500 md:text-lg"  />
            <FaStar className="text-yellow-500 md:text-lg"  />
            <p className="md:text-lg">+</p>
          </div>
        </div>
         <div className="stat-card shadow-lg rounded-2xl md:p-6 text-center hover:shadow-indigo-200 transition">
          <p className="md:text-4xl text-xl font-bold text-indigo-600">{languageCount}</p>
          <p className="md:text-lg font-medium text-gray-700 mt-2">Languages</p>
        </div>
        <div className="stat-card shadow-lg rounded-2xl md:p-6 text-center hover:shadow-indigo-200 transition">
          <h1 className="md:text-4xl text-xl font-bold text-indigo-600">{userCount}</h1>
          <p className="md:text-lg font-medium text-gray-700 mt-2">Users</p>
        </div>
       
        
      
      </div>
    </section>
  );
};

export default StatsSection;
