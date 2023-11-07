import React from 'react';
import './MainContent.css'

const Main = ({children}) => {
    return (
        <main className='main-content'>
            {children}
        </main>
    );
};

export default Main;