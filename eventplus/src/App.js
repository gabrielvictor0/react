import { useEffect, useState } from "react";
import { UserContext } from "./context/AuthContext";

import Rotas from "./routes";
//importa nosso app encapsulado pelo sistema de roteamento

const App = () => {
  //objeto vazio
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    //convertando o JSON par um objeto novamente
    setUserData( token === null ? {} : JSON.parse(token));
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
};

export default App;
