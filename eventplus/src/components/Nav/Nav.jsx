import React from 'react';
import './Nav.css'

import logMobile from '../../assets/images/logo-white.svg'
import logDesktop from '../../assets/images/logo-pink.svg'

import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <nav className='navbr'>
            <span className='navbar__close'>x</span>
            <Link to="/" className='eventlogo'>
                <img className='eventlogo__logo-image' src={window.innerWidth >= 992 ? logDesktop : logMobile} alt="Event Plus Logo" />
            </Link>

            <div className="navbar__items-box">
                <a href="">Home</a>
                <a href="">Tipos de Evento</a>
                <a href="">Usuario</a>
            </div>
        </nav>
    );
};

export default Nav;