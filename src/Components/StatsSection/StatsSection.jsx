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
    <section className="max-w-7xl md:mx-auto mx-2 px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-r from-red-100 via-purple-200 to-gray-400 rounded-xl shadow-md md:my-20 my-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-indigo-700">
        Platform Statistics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {[
          { label: "Tutors", value: stats.tutors, color: "text-blue-600" },
          { label: "Reviews", value: stats.reviews, color: "text-green-600" },
          { label: "Languages", value: stats.languages, color: "text-purple-600" },
          { label: "Users", value: stats.users, color: "text-pink-600" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white p-3 sm:p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 min-h-[100px] flex flex-col justify-center items-center"
          >
            <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-1">{label}</h3>
            <p className={`text-2xl sm:text-3xl md:text-4xl font-bold ${color}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
