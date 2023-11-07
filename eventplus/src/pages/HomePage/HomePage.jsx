import React from 'react';
import './HomePage.css'
import Banner from '../../components/Banner/Banner'
import MainContent from '../../components/Main/MainContent';
import VisionSection from '../../components/VisionSection/VisionSection';


const HomePage = () => {
    return (
       <div>
           <MainContent>
           <Banner/>
           <VisionSection/>
           </MainContent>
       </div>
    );
};

export default HomePage;