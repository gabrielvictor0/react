import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export const UserContext = createContext(null);

//pegando o token, decodificando e extraindo as informações de login no formato json
export const userDecodeToken = (theToken) => {
    const decoded = jwtDecode(theToken);//objeto de payload
    return { role: decoded.role, userId: decoded.jti, nome: decoded.name, token: theToken}
}