import React from 'react';
import './ImageIllustrator.css'
import tipoEventoImage from '../../assets/images/tipo-evento.svg'
import eventoImage from '../../assets/images/'
import defaultImage from '../../assets/images/'

const ImageIllustrator = ({alteText, imageName, additionalClass}) => {
    switch (imageName) {
        case 'tipo-evento':
            imageResource = tipoEventoImage
            break;
        case 'evento':
            imageResource = eventoImage
            break;
    
        default:
            break;
    }
    return (
        <figure className='ilustrator-box'>
            <img 
            src={imageResource} 
            alt="" 
            />
        </figure>
    );
};

export default ImageIllustrator;