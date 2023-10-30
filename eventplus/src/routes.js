import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//PAGINAS
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage';


const routes = () => {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route element={<HomePage/>} path={"/"} exact />
                <Route element={<LoginPage/>} path={"/login"} />
            </Routes>
            </BrowserRouter>
        </div>
    );
};

export default routes;