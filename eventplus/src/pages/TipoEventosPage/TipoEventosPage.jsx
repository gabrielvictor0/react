import React,{useState} from 'react';
import './TipoEventosPage.css'
import Title from '../../components/Title/Title'
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import ImageIlustrator from '../../components/ImageIllustrator/ImageIllustrator'
import tipoEventoImage from '../../assets/images/tipo-evento.svg'

const TipoEventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);//esta em modo de edicao

    function handleSubmit() {
        alert('Bora cadastrar');
    }

    function handleUpdate() {
        alert('Bora Editar');
    }

    return (
        <>
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className='cadastro-evento__box'>
                            <Title titleText={"Cadastro Tipo de Eventos"}/>

                            <ImageIlustrator imageRender={tipoEventoImage}/>

                            <form className='ftipo-evento' onSubmit={frmEdit ? handleUpdate: handleSubmit}>
                                {
                                    !frmEdit ? (<p>Tela de cadastro</p>) : (<p>Tela de Edição</p>)
                                }
                            </form>
                        </div>
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventosPage;