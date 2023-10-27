
import './App.css';
import Title from './components/Title/Title'
import CardEvento from './components/CardEvento/CardEvento'
import Container from './components/Container/Container'


function App() {
  return (
    <div className="App">

      <h1>  Hello World React</h1>

      <Title text="Gabriel Victor" />

      <Container>
        <CardEvento titulo="C# " descricao="Evento de C# para desenvolvedores Backend" botao="Eu Quero!" />

        <CardEvento titulo="JavaScript " descricao="Evento de JS  para desenvolvedores FullStack Developer" botao="Eu Quero!" />

        <CardEvento titulo="Java " descricao="Evento de Java para desenvolvedores Backend" botao="Eu Quero!" />

        <CardEvento titulo="Ruby " descricao="Evento de Ruby para desenvolvedores Backend" botao="Eu Quero!" />

        <CardEvento titulo="Portugol" descricao="Evento de lógica de programação" botao="Eu Quero!" />

        <CardEvento titulo="Sql " descricao="Evento de Sql" botao="Eu Quero!" />
      </Container>
      
    </div>
  );
}

export default App;
