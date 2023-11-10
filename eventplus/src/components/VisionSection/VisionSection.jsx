import React from 'react';
import './VisionSection.css'
import Title from '../Title/Title'

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'>
                <Title
                    titleText={"Visao"}
                    color='white'
                    potatoClass='vision__title'
                />
                <p className='vision__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit excepturi tempore non quae, odit, maiores consectetur ex, dolorum debitis facilis corporis harum tenetur mollitia perferendis incidunt? Ex nulla ducimus cumque!</p>
            </div>
        </section>
    );
};

export default VisionSection;