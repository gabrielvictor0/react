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

const TipoEventosPage = () => {
  //STATES
  const [frmEdit, setFrmEdit] = useState(false); //esta em modo de edicao

  const [titulo, setTitulo] = useState("");

  const [tipoEventos, setTipoEventos] = useState([]); //state de array vazia

  useEffect(() => {
    async function loadEventsType() {
      try {
        //chamando a funcao controladora e jogando as informações da api na array vazia tipoEventos
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    }
    //chama a funcao/api no carregamento da pagina/componente
    loadEventsType();
  }, [tipoEventos]);

  async function handleSubmit(e) {
    e.preventDefault(); //evita o submit do formulario
    if (titulo.trim().length < 3) {
      alert("o titulo deve ter pelo menos 3 caracteres!");
    }

    try {
      //Passando state do titulo para cadastrar TiposEvento("titulo":). Vai virar um json na api
      const retorno = await api.post(eventsTypeResource, { titulo: titulo });
      alert("Cadastrado com sucesso!");
    } catch (error) {
      alert("Deu ruim no submit");
    }
  }

  function handleUpdate(idElement) {
    alert(`Vamos apagar o evento de id: ${idElement}`);
  }

  //mostra o formulario de edicao
  function showUpdateForm() {
    alert(`Vamos mostrar o formulario de edicao`);
  }

  //cancela a tela/acao de edicao (volta para o form de cadastro)
  function editActionAbort() {
    alert(`Cancelar a tela de edição de dados`);
  }

  //apaga o tipo de evento de api
  async function handleDelete(idElement) {
    if (window.confirm("Confirma a exclusão?")) {
        try {
            const caminho = await api.delete(`${eventsTypeResource}/${idElement}`, {
              idElement,
            });
      
            if (caminho.status == 204) {
              alert(`apagado com sucesso!`);
            }
          } catch (error) {
            console.log("Deu erro no delete");
            console.log(error);
          }
    }
  }

  return (
    <>
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
                  <p>Tela de Edição</p>
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
