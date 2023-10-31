import React from 'react';

const Botao = ({type, textButton}) => {
    return (
        <button type={type}>
            {textButton}
        </button>
    );
};

export default Botao;