import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, redirectTo = "/"}) => {
    //verificar se esta autenticado
    const isAuthenticated = localStorage.getItem("token") !== null;
    //retorna o componente ou navegar para a home
    return isAuthenticated ? children : <Navigate to={redirectTo}/>;
};