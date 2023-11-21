import React from "react";
import "./EventosPage.css";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import MainContent from "../../components/Main/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventoImage from "../../assets/images/evento.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import TableEvent from "./TableEvent/TableEvent";
import Notification from "../../components/Notification/Notification";
import api, { eventsTypeResource } from "../../Services/Service";

const EventosPage = () => {
  return (
    <>
      <MainContent>
        <section>
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro de Evento"} />
              <ImageIllustrator imageRender={eventoImage} />
              <form action=""></form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <TableEvent />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
