import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


//PAGINAS
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage';
import TipoEventosPage from "./pages/TipoEventosPage/TipoEventosPage"
import EventosPage from "./pages/EventosPage/EventosPage"
import TestePage from "./pages/TestePage/TestePage"
import Header from './components/Header/Header';


const routes = () => {
    return (
        <div>
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route element={<HomePage/>} path={"/"} exact />
                <Route element={<LoginPage/>} path={"/login"} />
                <Route element={<TipoEventosPage/>} path={"/tipo-eventos"} />
                <Route element={<EventosPage/>} path={"/eventos"} />
                <Route element={<TestePage/>} path={"/testes"} />
            </Routes>
            {/* <Footer/> */}
            </BrowserRouter>
        </div>
    );
};

export default routes;