import React, { useState } from 'react';
import Botao from '../../components/Botao/Botao';
// import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';


const TestePage = () => {
    //variaveis do pai(TestePage) que será passada ao filho(Input)
    const [n1, setN1] = useState(0);//number
    const [n2, setN2] = useState(0);//number
    const [total, setTotal] = useState();

    function handleCalcular(e) {
        e.preventDefault();
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

    return (
        <div>
                
            <h1>Página de Poc`s</h1>
            <h2>Calculator</h2>

            <form onSubmit={handleCalcular}>

                <Input 
                    type="number" 
                    placeholder="Digite um numero" 
                    name="n1" 
                    id="n1" 
                    value={n1}
                    //quando o valor mudar ou ser inserido no input, o onChange esta dando o comando para o setN1 mudar o valor da variável e gurda-la
                    onChange={(e) => {
                        setN1(e.target.value)
                    }}
                />
                <br />
                <Input
                    type="number"
                    placeholder="Digite um numero" 
                    name="n2" 
                    id="n2" 
                    value={n2}
                    onChange={(e) => {
                        setN2(e.target.value)
                    }}
                 />
                <br />
                <Botao textButton="Calcular" type="submit"/>

                <span>Resultado: {total}</span>
            </form>
            {/* <p>VAlOR DO N1: {n1}</p>
            <p>VAlOR DO N1: {n2}</p> */}
        </div>
    );
};

export default TestePage;