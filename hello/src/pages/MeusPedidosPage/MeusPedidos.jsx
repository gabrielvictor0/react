import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const MeusPedidos = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <div>
            <h1>Meus Pedidos Page</h1>
            <span>{theme}</span>
        </div>
    );
};

export default MeusPedidos;