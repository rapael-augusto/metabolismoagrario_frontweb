'use client';

import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import '../styles/form/form.css'
import '../styles/home/login.css'
import { Login } from "@/services/login";
import { useState } from "react";

const Home = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginEvento =  async (e: React.FormEvent) => {
    e.preventDefault();

    //requisicao
      const dadosLogin = {
        email: email,
        password: password,
      };
      
      const response: any = await Login(dadosLogin);
      const {status, message} = response;
      
    //redirect / tratamento de erro
    const token = sessionStorage.getItem('@token')
    if(status == 1 && token){
      console.log(message)
      //redirecionar para a pagina e liberar acesso para o resto do sistema
    }else{
      console.error(message)
      //exibir mensage de erro
    } 
  }

  return (
    <Layout>
      <form className="formBody-login">

        <div className="form-input-box">
           <h2 className="tittle-login">Bem-Vindo</h2>
        </div>

        <div className="form-input-box">
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" />
        </div>

        <div className="form-input-box">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" />
        </div>

        <div className="form-input-box">
          <Button texto={'Entrar'} classe={'button-home'} onclick={loginEvento}  />
        </div>
       
      </form>
    </Layout>
  );
}

export default Home;