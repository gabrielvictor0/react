import React, { useEffect, useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import ImageIlustrator from "../../components/ImageIllustrator/ImageIllustrator";
import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import TableTp from "./TableTp/TableTp";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const TipoEventosPage = () => {
  //STATES
  const [frmEdit, setFrmEdit] = useState(false); //esta em modo de edicao

  const [titulo, setTitulo] = useState("");

  const [tipoEventos, setTipoEventos] = useState([]); //state de array vazia

  const [notifyUser, setNotifyUser] = useState(); //Componente Notification

  const [idEvento, setIdEvento] = useState(null); //parar editar, por causa do evento!

  const [showSpinner, setShowSpinner] = useState(false); //Spinner Loading

  
  useEffect(() => {
    //chama a funcao/api no carregamento da pagina/componente
    async function loadEventsType() {
      setShowSpinner(true);
      try {
        //chamando a funcao controladora e jogando as informações da api na array vazia tipoEventos
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
        console.log(retorno.data);
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

  async function handleSubmit(e) {
    e.preventDefault(); //evita o submit do formulario
    setShowSpinner(true);
    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "O cadastro deve ter no mínimo 3 caracteres.",
        imgIcon: "warning",
        imgAlt: "Imagem de ilustração de aviso. Boneco batendo na exclamação.",
        showMessage: true,
      });
      return;
    }

    try {
      //Passando state do titulo para cadastrar TiposEvento("titulo":). Vai virar um json na api
      const retorno = await api.post(eventsTypeResource, { titulo: titulo });
      setTitulo("");
      if (retorno.status == 201) {
        theMagic("Cadastrado com sucesso");
        const buscaEventos = await api.get(eventsTypeResource);

        setTipoEventos(buscaEventos.data);
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "Erro na operação. Verifique a conexão com a internet.",
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo X.",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setShowSpinner(true);
    try {
      const retorno = await api.put(`${eventsTypeResource}/${idEvento}`, {
        titulo: titulo,
      }); //o id esta no state
      if (titulo.trim().length < 3) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "O cadastro deve ter no mínimo 3 caracteres.",
          imgIcon: "warning",
          imgAlt:
            "Imagem de ilustração de aviso. Boneco batendo na exclamação.",
          showMessage: true,
        });
        return;
      }

      if ((retorno.status = 204)) {
        //reseta os states
        setTitulo("");
        setIdEvento(null);
        setFrmEdit(false);

        const atualizaEvento = await api.get(`${eventsTypeResource}`);

        setTipoEventos(atualizaEvento.data);

        setNotifyUser({
          titleNote: "Sucesso",
          textNote: "Atualizado com sucesso",
          imgIcon: "success",
          imgAlt: "Imagem de ilustração de sucesso.",
          showMessage: true,
        });
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "Erro na operação. Verifique a sua conexão com a internet.",
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo X.",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  //mostra o formulario de edicao
  async function showUpdateForm(idElement) {
    setFrmEdit(true);
    setIdEvento(idElement);
    setShowSpinner(true);
    try {
      const promise = await api.get(
        `${eventsTypeResource}/${idElement}`,
        idElement
      );

      setTitulo(promise.data.titulo);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "Erro na operação. Verifique a sua conexão com a internet.",
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo X.",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  //cancela a tela/acao de edicao (volta para o form de cadastro)
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo(""); //reseta as variáveis
    setIdEvento(null);
    setShowSpinner(true);
    setShowSpinner(false);
  }

  //apaga o tipo de evento de api
  async function handleDelete(idElement) {
    if (window.confirm("Confirma a exclusão?")) {
      try {
        const caminho = await api.delete(`${eventsTypeResource}/${idElement}`, {
          idElement
        });

        if (caminho.status == 204) {
          theMagic("Excluido com sucesso");
          const buscaEventos = await api.get(eventsTypeResource);

          setTipoEventos(buscaEventos.data);
        }
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: "Erro na operação. Verifique a sua conexão com a internet.",
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo X.",
          showMessage: true,
        });
      }
    }
    setShowSpinner(false);
  }

  function theMagic(textNote) {
    setNotifyUser({
      titleNote: "Sucesso",
      textNote,
      imgIcon: "Success",
      imgAlt:
        "Imagem de ilustração de sucesso. Moça segurando um balão com simbolo d confirmação",
      showMessage: true,
    });
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {/* SPINNER - Feito com position */}

      <MainContent>
        {/* formulario de cadastro do tipo de evento */}
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro Tipo de Eventos"} />

              <ImageIlustrator imageRender={tipoEventoImage} />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? ( //cadastrar
                  <>
                    <Input
                      id="Titulo"
                      placeholdder={"Titulo"}
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />

                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      name="cadastrar"
                      //formulário só será chamado pois seu type é submit
                      type="submit"
                    />
                  </>
                ) : (
                  //editar
                  <>
                    <Input
                      id="Titulo"
                      placeholdder={"Titulo"}
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
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

        {/* Listagem de tipo de eventos*/}
        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Lista Tipos de Eventos"} color="white" />
            <TableTp
              dados={tipoEventos}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
