import React, { useState, useEffect } from "react";
import "./EventosPage.css";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import MainContent from "../../components/Main/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventoImage from "../../assets/images/evento.svg";
import {
  Input,
  Button,
  Select,
} from "../../components/FormComponents/FormComponents";
import TableEvent from "./TableEvent/TableEvent";
import Notification from "../../components/Notification/Notification";
import api, {
  eventsTypeResource,
  eventsResource,
} from "../../Services/Service";
import Spinner from "../../components/Spinner/Spinner";

const EventosPage = () => {
  //STATES
  const [frmEdit, setFrmEdit] = useState(false);

  const [evento, setEvento] = useState([]);

  const [nomeEvento, setNomeEvento] = useState("");

  const [descricao, setDescricao] = useState("");

  const [tipoEvento, setTipoEvento] = useState([]);

  const [dataEvento, setDataEvento] = useState("");

  //ID

  const [idEvento, setIdEvento] = useState(null);

  const [idTipoEvento, setIdTipoEvento] = useState(null);

  const idInstituicao = "c8fd6bcf-2e69-4726-8257-52b78dd38580";

  //NOtify

  const [notifyUser, setNotifyUser] = useState();

  const [showSpinner, setShowSpinner] = useState(false);

  //FUNCTIONS
  function editActionAbort() {
    setFrmEdit(false);
    setNomeEvento("");
    setDescricao("");
    setTipoEvento([]);
    setDataEvento("");
  }

  function theMagic(titleNote, textNote, imgIcon, imgAlt) {
    setNotifyUser({
      titleNote,
      textNote,
      imgIcon,
      imgAlt,
      showMessage: true,
    });
  }

  //SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    setShowSpinner(true);
    if (nomeEvento.trim().length < 3) {
      theMagic();
      return;
    }

    try {
      const promise = await api.post(eventsResource, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        dataEvento: dataEvento,
        idTipoEvento: idTipoEvento,
        idInstituicao: idInstituicao,
      });
      setNomeEvento("");
      setDescricao("");
      setDataEvento("");
      setTipoEvento([]);
      if (promise.status == 201) {
        theMagic(
          "Sucess",
          "Cadastrado com sucesso",
          "success",
          "Imagem de sucesso. Moça segurando balão"
        );
        const buscaEventos = await api.get(eventsResource);

        setEvento(buscaEventos.data);
      }
    } catch (error) {
      theMagic(
        "Erro",
        "Erro na operação. Verifique a conexão com a internet",
        "danger",
        "Imagem de erro. Rapaz segurando um balão com símbolo x"
      );
    }
    setShowSpinner(false);
  }

  //UPDATE
  async function handleUpdate(e) {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const retorno = await api.put(`${eventsResource}/${idEvento}`, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        dataEvento: dataEvento,
        idTipoEvento: idTipoEvento,
        idInstituicao: idInstituicao,
      });

      if (nomeEvento.trim().length < 3) {
        theMagic(
          "Erro",
          "O cadastro deve ter no mínimo 3 caracteres",
          "warning",
          "Imagem de aviso. Boneco batendo na exclamação"
        );
        return;
      }

      if (retorno.status == 204) {
        setNomeEvento("");
        setDescricao("");
        setDataEvento("");
        const atualizaEvento = await api.get(`${eventsResource}`);

        setEvento(atualizaEvento.data);

        theMagic(
          "Sucess",
          "Atualizado com sucesso",
          "success",
          "Imagem de sucesso. Moça segurando balão"
        );
      }
    } catch (error) {
      theMagic(
        "Erro",
        "Erro na operação. Verifique a conexão com a internet",
        "danger",
        "Imagem de erro. Rapaz segurando um balão com símbolo x"
      );
    }
    setShowSpinner(false);
  }

  //SHOWUPDATEFORM
  async function showUpdateForm(idElement) {
    setFrmEdit(true);
    setIdEvento(idElement);
    setShowSpinner(true);
    try {
      const promise = await api.get(`${eventsResource}/${idElement}`, {
        idElement,
      });

      setNomeEvento(promise.data.nomeEvento);
      setDescricao(promise.data.descricao);
      setDataEvento(promise.data.dataEvento.slice(0, 10));
      setIdTipoEvento(promise.data.idTipoEvento);
    } catch (error) {
      theMagic(
        "Erro",
        "Erro na operação. Verifique a conexão com a internet",
        "danger",
        "Imagem de erro. Rapaz segurando um balão com símbolo x"
      );
    }
    setShowSpinner(false);
  }

  //DELETE
  async function handleDelete(idElement) {
    setShowSpinner(true);
    if (window.confirm("Confirmar a exclusão?")) {
      try {
        const rota = await api.delete(`${eventsResource}/${idElement}`, {
          idElement,
        });

        if (rota.status == 204) {
          theMagic(
            "Sucess",
            "Deletado com sucesso",
            "success",
            "Imagem de sucesso. Moça segurando balão"
          );

          const buscaEventos = await api.get(eventsResource);

          setEvento(buscaEventos.data);
        }
      } catch (error) {
        theMagic(
          "Erro",
          "Erro na operação. Verifique a conexão com a internet",
          "danger",
          "Imagem de erro. Rapaz segurando um balão com símbolo x"
        );
      }
    }
    setShowSpinner(false);
  }

  //GET EVENTOS
  useEffect(() => {
    async function loadEvents() {
      setShowSpinner(true);
      try {
        const retorno = await api.get(eventsResource);
        setEvento(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        theMagic(
          "Erro",
          "Erro na operação. Verifique a conexão com a internet",
          "danger",
          "Imagem de erro. Rapaz segurando um balão com símbolo x"
        );
      }
      setShowSpinner(false);
    }
    loadEvents();
  }, []);

  //GET EM TIPOS DE EVENTO
  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEvento(retorno.data);
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "Erro na operação. Verifique a conexão com a internet.",
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balao com simbolo x.",
          showMessage: true,
        });
      }
      setShowSpinner(false);
    }
    loadEventsType();
  }, []);

  //DEPARA
  function dePara(retornoApi) {
    let arrayOptions = [];
    retornoApi.forEach((e) => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });
    return arrayOptions;
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {/* SPINNER - Feito com position */}
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro de Evento"} />
              <ImageIllustrator imageRender={eventoImage} />
              <form
                className="f-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  //CADASTRAR
                  <>
                    <Input
                      id="Nome"
                      placeholdder={"Nome"}
                      name={"nome"}
                      type={"text"}
                      required={"required"}
                      value={nomeEvento}
                      manipulationFunction={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                    />

                    <Input
                      id="Descricao"
                      placeholdder={"Descrição"}
                      name={"descricao"}
                      type={"text"}
                      required={"required"}
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />

                    <Select
                      id="TipoEvento"
                      name={"tipoEvento"}
                      required={"required"}
                      options={dePara(tipoEvento)}
                      value={idTipoEvento}
                      manipulationFunction={(id) => {
                        setIdTipoEvento(id.target.value);
                      }}
                    />

                    <Input
                      id="Data"
                      placeholdder={"dd/mm/aaaa"}
                      name={"data"}
                      type={"date"}
                      required={"required"}
                      value={dataEvento}
                      manipulationFunction={(e) => {
                        setDataEvento(e.target.value);
                      }}
                    />

                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                  </>
                ) : (
                  //EDITAR
                  <>
                    <Input
                      id="Nome"
                      placeholdder={"Nome"}
                      name={"nome"}
                      type={"text"}
                      required={"required"}
                      value={nomeEvento}
                      manipulationFunction={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                    />

                    <Input
                      id="Descricao"
                      placeholdder={"Descrição"}
                      name={"descricao"}
                      type={"text"}
                      required={"required"}
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />

                    <Select
                      id="TipoEvento"
                      name={"tipoEvento"}
                      required={"required"}
                      options={dePara(tipoEvento)}
                      value={idTipoEvento}
                      manipulationFunction={(e) => {
                        setIdTipoEvento(e.target.value);
                      }}
                    />

                    <Input
                      id="Data"
                      placeholdder={"dd/mm/aaaa"}
                      name={"data"}
                      type={"date"}
                      required={"required"}
                      value={dataEvento}
                      manipulationFunction={(e) => {
                        setDataEvento(e.target.value);
                      }}
                    />

                    <div className="buttons-editbox">
                      <Button
                        textButton="Atualizar"
                        id="atualizar"
                        name="atualizar"
                        type="submit"
                        additionalClass="button-component--middle"
                      />

                      <Button
                        textButton="Cancelar"
                        id="cancelar"
                        name="cancelar"
                        type="submit"
                        manipulationFunction={editActionAbort}
                        additionalClass="button-component--middle"
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Lista de eventos"} color="white" />
            <TableEvent
              dados={evento}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
