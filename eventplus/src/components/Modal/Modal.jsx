import React, { useContext } from "react";
import { useEffect } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";
import { UserContext } from "../../context/AuthContext";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  comentaryText = "Não informado. Não informado. Não informado.",
  userId = null,
  showHideModal = false,
  fnDelete = null,
  fnGet = null,
  fnPost = null,

}) => {

  const {userData} = useContext(UserContext);
  // console.clear();
  console.log(userData);
  const [descricao, setDescricao] = useState("")

  useEffect( () => {
    async function carregarDados() {
      fnGet(userData.userId, userData.idEvento);
    }
    carregarDados();
  }, [])

  return (
    <div className="modal">
      <article className="modal__box">
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={()=> showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={ () => {fnDelete()}}
          />

          <p className="comentary__text">{comentaryText}</p>

          <hr className="comentary__separator" />
        </div>

        <Input
          placeholdder={"Escreva seu comentario..."}
          className="comentary__entry"
          value={comentarioDesc}
          manipulationFunction={(e) => {
            setComentarioDesc(e.target.value)
          }}
        />

        <Button
          textButton="Comentar"
          additionalClass="comentary__button"
          manipulationFunction={() => {fnPost(comentarioDesc.trim(), userData.userId, userData.idEvento)}}
        />
      </article>
    </div>
  );
};

export default Modal;
