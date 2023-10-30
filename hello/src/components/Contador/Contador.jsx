import React, { useState } from 'react';

const Contador = () => {
    //State é o estado do componente
    //setContador é o manipulador da variável contador
    const [contador, setContador] = useState(0);

    function handleIncrementar() {
        setContador( contador + 1); 
    }

    function handleDecrementar() {
        setContador( contador === 0 ? 0 : contador -1);
    }

    return (
        <div>
            <h1>Contador</h1>

            <p>{contador}</p>
            <button onClick= {() => {handleIncrementar()}}>Incrementar</button>
            <button onClick={handleDecrementar}>Decrementar</button>
        </div>
    );
};

export default Contador;