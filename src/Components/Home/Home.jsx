import React from 'react';
import Category from '../Category/Category';
import Banner from '../Banner/Banner';
import StatsSection from '../StatsSection/StatsSection';
import TeachSection from '../TechSection/TechSection';
import FeatureSection from '../FeatureSection/FeatureSection';

const Home = () => {
    return (
        
        <div>
            <Banner/>
            <StatsSection/>
            <Category/>
            <FeatureSection/>
            <div className='bg-gradient-to-r from-blue-400 via-purple-200 to-white-100 md:my-10 my-5 shadow-md  md:py-10 py-5'>
                <h1 className="text-3xl font-bold text-center my-8">Explore Our Categories</h1>
                <p className="text-center text-gray-600 mb-8">Find the perfect tutor for your learning needs.</p>
            </div>
            
            <TeachSection/>
            
        </div>
    );
};

export default Home;