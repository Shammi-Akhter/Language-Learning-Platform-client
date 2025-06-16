import React, { useEffect, useState } from "react";

const StatsSection = () => {
  const [stats, setStats] = useState({
    tutors: 0,
    reviews: 0,
    languages: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tutorsRes, reviewsRes, languagesRes, usersRes] = await Promise.all([
          fetch("http://localhost:5000/tutors"),
          fetch("http://localhost:5000/reviews"),
          fetch("http://localhost:5000/languages"), 
          fetch("http://localhost:5000/users"),
        ]);

        const [tutors, reviews, languages, users] = await Promise.all([
          tutorsRes.json(),
          reviewsRes.json(),
          languagesRes.json(),
          usersRes.json(),
        ]);

        setStats({
          tutors: tutors.length,
          reviews: reviews.length,
          languages: languages.length,
          users: users.length,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="p-8 bg-gradient-to-r from-red-100 via-purple-200 to-gray-400 rounded-xl shadow-md max-w-5xl mx-auto md:mt-20">
      <h2 className="text-4xl font-bold text-center md:mb-10   !text-indigo-700">Platform Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">Tutors</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.tutors}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">Reviews</h3>
          <p className="text-3xl font-bold text-green-600">{stats.reviews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">Languages</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.languages}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">Users</h3>
          <p className="text-3xl font-bold text-pink-600">{stats.users}</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
