import React from 'react';
import Banner from './Banner/Banner';
import LatestsortedData from '../../components/LatestItems/LatestItems';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestsortedData></LatestsortedData>
        </div>
    );
};

export default Home;