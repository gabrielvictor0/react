import React from 'react';
import './Titulo.css'

const Titulo = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    );
};

export default Titulo;