import React, { useContext, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import loginImage from "../../assets/images/login.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";

import "./LoginPage.css";
import api,{ loginResource } from "../../Services/Service";
import { UserContext, userDecodeToken } from "../../context/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState({email: "user@user.com", senha: ""});
  const {userData, setUserData} = useContext(UserContext);// importa os dados globais do usuario

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados de login");
    console.log(user);

    if (user.email.length >= 3 && user.senha.length >=3) {
        try {
            const promise = await api.post(loginResource, {
                email: user.email,
                senha: user.senha
            });

            const userFullToken = userDecodeToken(promise.data.token)
            setUserData(userFullToken);

            localStorage.setItem("token", JSON.stringify(userFullToken));


        } catch (error) {
            alert("Verifique os dados e a conexão com a internet")
            console.log("ERROS NO LOGIN DO USUARIO");
            console.log(error);
        }
    }
    else
    {
        alert("preencha os dados corretamente")
    }
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={loginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator"
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              className="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {setUser({...user, email: e.target.value.trim()})}}
              placeholdder="Username"
            />
            <Input
              className="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {setUser({ ...user, senha: e.target.value.trim()})}}
              placeholdder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              additionalClass="frm-login__button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
