import React from 'react';
import './ImageIllustrator.css'
import defaultImage from '../../assets/images/default-image.jpeg'


const ImageIllustrator = ({alteText, imageRender = defaultImage, additionalClass=""}) => {
    return (
        <figure className='ilustrator-box'>
            <img 
            src={imageRender} 
            alt={alteText}
            className={`illustrator-box__image ${additionalClass}`}
            />
        </figure>
    );
};

export default ImageIllustrator;