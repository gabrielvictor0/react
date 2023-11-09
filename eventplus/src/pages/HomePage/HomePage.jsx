import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Banner from '../../components/Banner/Banner'
import MainContent from '../../components/Main/MainContent';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection'
import Footer from '../../components/Footer/Footer'
import Title from '../../components/Title/Title'
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import axios from "axios";


const HomePage = () => {

    const [nextEvents, setNextEvents] = useState([]);//dados mokcdados
    const urlLocal = 'http://localhost:5000/api'
    //roda somente na inicialização do componente
    useEffect( () => {
        async function getNextEvents() {
            try {
                const promise = await axios.get(`${urlLocal}/Evento/ListarProximos`);
                const dados = await promise.data;

                setNextEvents(dados);//atualiza o state
            } catch (error) {
                alert("Deu ruim na api")
            }
        }
        getNextEvents(); //roda a função
    }, []);

    return (
       <div>
           <MainContent>
                <Banner/>
                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Proximos Eventos"}/>

                        <div className='events-box'>

                            {
                                nextEvents.map((e) => {
                                    return(
                                        <NextEvent
                                        key={e.idEvento}
                                        title={e.nomeEvento}
                                        description={e.descricao}
                                        eventDate={e.dataEvento}
                                        idEvent={e.idEvento}
                                    />
                                    )
                                })
                            }

                            
                              
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