import React from 'react';
import Category from '../Category/Category';
import Banner from '../Banner/Banner';
import StatsSection from '../StatsSection/StatsSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <StatsSection/>
            <Category/>
        </div>
    );
};

export default Home;