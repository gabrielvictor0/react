import React, { useContext } from 'react';
import './Nav.css'
import {Link} from "react-router-dom"
import { ThemeContext } from '../../context/ThemeContext';

const Nav = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    
    const toggleTheme = () => {
        setTheme( theme === 'light' ? 'dark' : 'light')
    }
    return (
        <nav>
            <Link to="/">Home</Link> | &nbsp;
            <Link to="/produtos">Produtos</Link> | &nbsp;
            <Link to="importante">Dados Importantes</Link> | &nbsp;
            <Link to="/meus-pedidos">Meus Pedidos</Link> | &nbsp;
            <Link to="/login">Login</Link>
            <button onClick={toggleTheme}>{theme}</button>
        </nav>
    );
};

export default Nav;