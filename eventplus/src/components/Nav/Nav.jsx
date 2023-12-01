import React, { useContext } from 'react';
import './Nav.css'

import logMobile from '../../assets/images/logo-white.svg'
import logDesktop from '../../assets/images/logo-pink.svg'

import {Link} from 'react-router-dom'
import { UserContext } from '../../context/AuthContext';

const Nav = ({exibeNavbar, setExibeNavbar}) => {
    console.log(`EXIBE O MENU? ${exibeNavbar}`);

    //pegando dados do usuario
    const {userData} = useContext(UserContext);

    return (
        //lógica para mostrar ou não a Navbar
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>

            <span onClick={() => {setExibeNavbar(false)}} className='navbar__close'>x</span>

            <Link to="/" className='eventlogo'>
                <img className='eventlogo__logo-image' src={window.innerWidth >= 992 ? logDesktop : logMobile} alt="Event Plus Logo" />
            </Link>

            <div className="navbar__items-box">
                <Link onClick={() => {setExibeNavbar(false)}} to="/" className='navbar__item'>Home</Link>

                {userData.nome && userData.role === "Administrador" 
                ?
                (
                    <>
                        <Link onClick={() => {setExibeNavbar(false)}} to="/tipo-eventos" className='navbar__item'>
                            Tipos de Evento
                        </Link>

                        <Link onClick={() => {setExibeNavbar(false)}} to="/eventos" className='navbar__item'>
                            Evento
                        </Link>
                    </>
                )
                : userData.nome && userData.role === "Aluno" ?  (

                    <Link onClick={() => {setExibeNavbar(false)}} to="/eventos" className='navbar__item'>
                        Eventos Aluno
                    </Link>
                ) : null}
            </div>

        </nav>
    );
};

export default Nav;