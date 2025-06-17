import React from "react";

const TeachSection = () => {
  return (
    <section className="container mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center gap-10">
      
      
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700 mb-4 leading-snug">
          Connect with learners from every corner of the globe.
        </h2>
        <p className="text-gray-600 mb-6">
          Secjaf tutors teach thousands — and you can too! Everything you need to succeed is at your fingertips.
        </p>
        <ul className="space-y-2 text-gray-600 list-disc list-inside text-left inline-block">
          <li>Steady stream of new students</li>
          <li>Smart calendar</li>
          <li>Interactive classroom</li>
          <li>Convenient payment methods</li>
          <li>Professional development webinars</li>
          <li>Supportive tutor community</li>
        </ul>
      </div>

      
      <div className="w-full md:w-1/2 flex justify-center items-center relative min-h-[300px]">
       
        <img
          src="https://i.postimg.cc/d3fg6rQf/tech-2.jpg"
          alt="Main"
          className="rounded-xl shadow-lg w-64 sm:w-80 md:w-[400px] h-auto"
        />

        <img
          src="https://i.postimg.cc/x88WLtQH/tech-1.jpg"
          alt="Top Left"
          className="absolute top-[60%] sm:top-[65%] left-0 sm:left-[-20px] w-32 sm:w-40 md:w-[200px] rounded-xl shadow-lg border-4 border-white"
        />

        
        <img
          src="https://i.postimg.cc/9MtRB96n/tech-333333.webp.jpg"
          alt="Top Right"
          className="absolute top-[-40px] right-[-20px] sm:right-[-30px] md:right-[-50px] w-32 sm:w-40 md:w-[200px] rounded-xl shadow-lg border-4 border-white"
        />
      </div>
    </section>
  );
};

export default TeachSection;
