import React from 'react';
import './ContactSection.css'
import Title from '../Title/Title'
import contatoMap from '../../assets/images/contato-map.png'

const ContactSection = () => {
    return (
        <section className='contato'>
            <Title titleText={"Contato"}/>
            <div className='contato__endereco-box'>
                <img 
                src={contatoMap} 
                alt="Imagem ilustrativa de um mapa"
                className='contato__img-map' 
                />
                <p>
                    Rua Niteroi, 180 - Centro <br />
                    Sao Caetano do Sul - SP
                    <a href="tel:+551142252000" className='contato__telefone'>
                        (11) 4225-2000
                    </a>
                </p>
            </div>
        </section>
    );
};

export default ContactSection;