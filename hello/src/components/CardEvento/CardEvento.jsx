import React from "react";
import './CardEvento.css';

const CardEvento = ({titulo, descricao, botao}) => {
    return(
            <div className="card">
                <h1 className="card__titulo">{titulo}</h1>
                <div className="card__descricao">
                    <p className="card__texto-descricao">{descricao}</p>
                </div>
                <button className="card__button-conectar">{botao}</button>
            </div>
    );
}

export default CardEvento;