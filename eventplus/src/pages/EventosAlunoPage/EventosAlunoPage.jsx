import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
  eventsResource,
  myEventsResource,
  presencesEventsResource,
} from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import { clear } from "@testing-library/user-event/dist/clear";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState(""); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    
    loadEventsType();
  }, [tipoEvento, userData.userId]);

  async function loadEventsType() {
    setShowSpinner(true);
    setEventos([]);

    setEventos([]); //zera o array de eventos
    if (tipoEvento === "1") {
      //chamar a api de todos os eventos
      const todosEventos = await api.get(`${eventsResource}`);
      const meusEventos = await api.get(
        `${myEventsResource}/${userData.userId}`
      );
      setEventos(todosEventos.data);

      const eventosMarcados = verificaPresenca(
        todosEventos.data,
        meusEventos.data
      );

      setEventos(eventosMarcados);

      console.clear();

      console.log("Todos os eventos");
      console.log(todosEventos.data);

      console.log("Meus eventos");
      console.log(meusEventos.data);

      console.log("Eventos marcados");
      console.log(eventosMarcados);

      try {
      } catch (error) {
        alert("Verifique a conexão com a internet");
      }
    } else if (tipoEvento === "2") {
      //
      try {
        const promiseMyEvents = await api.get(
          `${myEventsResource}/${userData.userId}`
        );
        console.log(promiseMyEvents.data);

        const arrEventos = []; //array vazia

        promiseMyEvents.data.forEach((e) => {
          arrEventos.push(
            //passando todas as propriedades de evento e adicionando a situacao
            { ...e.evento, situacao: e.situacao }
          );
        });

        console.log(arrEventos);
        setEventos(arrEventos);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    } else {
      setEventos([]);
    }
    setShowSpinner(false);
  }

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      //para cada evento principal
      for (let i = 0; i < eventsUser.length; i++) {
        //procurar a correspondencia em minhas presencas
        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break; //paro de procurar para o evento principal atual
        }
      }
    }

    return arrAllEvents; //retorna todos os eventos marcados com a presenca de usuario
  };

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    if (whatTheFunction === "connect") {

      try {
        const promise = await api.post(`${presencesEventsResource}`, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId
        });

        if (promise.status === 201) {
          alert("Presença confirmada!");
        }
        const todosEvento = await api.get(eventsResource);
        setEventos(todosEvento.data);
      } catch (error) {

      }
      return;
    }

    try {
      const unconnected = await api.delete(
        `${presencesEventsResource}/${presencaId}`
      );

      if (unconnected.status === 204) {
        alert("desconectado do evento");
        const todosEventos = await api.get(eventsResource);
        setEventos(todosEventos.data);
      }
    } catch (error) {

    }
  }
  
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            addtionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
