import React, { useContext, useState } from 'react'
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Nav from './components/Nav/Nav'

//Imports dos componentes - PAGINAS
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProdutoPage from './pages/ProdutoPage/ProdutoPage';
import ImportantePage from './pages/ImportantePage/ImportantePage'
import MeusPedidosPage from './pages/MeusPedidosPage/MeusPedidos';

import { ThemeContext } from './context/ThemeContext';

const Rotas = () => {

    const [theme,setTheme] = useState(getThemeLocalStorage());
    function getThemeLocalStorage() {
        setTheme(
            localStorage.getItem("theme") !== null? localStorage.getItem("theme") : 'light'
        )
    }
    return(
        <BrowserRouter>
        <ThemeContext.Provider value={{theme, setTheme}}>
        <Nav/>
        <Routes>
             <Route element={ <HomePage/>} path={"/"} exact />
             <Route element={ <ProdutoPage/>} path={"/produtos"}/>
             <Route element={ <ImportantePage/>} path={"/importante"}/>
             <Route element={ <MeusPedidosPage/>} path={"/meus-pedidos"}/>
             <Route element={ <LoginPage/>} path={"/login"}/>
             <Route element={ <HomePage/>} path={"*"}/>
        </Routes>
        </ThemeContext.Provider>
        
        </BrowserRouter>
    )
}

export default Rotas;