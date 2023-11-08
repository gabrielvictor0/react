import React from 'react';
import './HomePage.css'
import Banner from '../../components/Banner/Banner'
import MainContent from '../../components/Main/MainContent';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection'
import Footer from '../../components/Footer/Footer'
import Title from '../../components/Title/Title'
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';


const HomePage = () => {
    return (
       <div>
           <MainContent>
                <Banner/>
                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Proximos Eventos"}/>

                        <div className='events-box'>
                            <NextEvent/>
                            <NextEvent/>
                            <NextEvent/>    
                            <NextEvent/>    
                            <NextEvent/>    
                            <NextEvent/>    
                            <NextEvent/>    
                            <NextEvent/>    
                        </div>
                    </Container>
                </section>
                <VisionSection/>
                <ContactSection/>
                <Footer/>    
           </MainContent>
       </div>
    );
};

export default HomePage;