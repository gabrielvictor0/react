import { useState } from "react";
import { UserContext } from "./context/AuthContext";


import Rotas from "./routes";
//importa nosso app encapsulado pelo sistema de roteamento

const App = () => {
    const [userData, setUserData] = useState({})
    return(
        <UserContext.Provider value={{userData, setUserData}}>
        <Rotas />
      </UserContext.Provider>
    )
}
    
 


export default App;
