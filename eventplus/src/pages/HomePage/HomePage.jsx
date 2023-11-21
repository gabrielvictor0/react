import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Banner from '../../components/Banner/Banner'
import MainContent from '../../components/Main/MainContent';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection'
import Title from '../../components/Title/Title'
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import api from '../../Services/Service'
import { nextEventResource } from '../../Services/Service';
import Notification from '../../components/Notification/Notification';



const HomePage = () => {
    const [notifyUser, setNotifyUser] = useState();

    const [nextEvents, setNextEvents] = useState([]);//dados mokcdados

    //roda somente na inicialização do componente
    useEffect( () => {
        async function getNextEvents() {
            try {
                const promise = await api.get(`${nextEventResource}`);
                const dados = await promise.data;

                setNextEvents(dados);//atualiza o state
            } catch (error) {
                setNotifyUser({
                    titleNote: "Erro",
                    textNote: "Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet.",
                    imgIcon: "danger",
                    imgAlt:
                      "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo X.",
                    showMessage: true,
                  });
            }
        }
        getNextEvents(); //roda a função
    }, []);

    return (
       <div>
        <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
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
           </MainContent>
       </div>
    );
};

export default HomePage;