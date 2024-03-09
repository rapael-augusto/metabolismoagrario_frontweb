'use client';

import Link from "next/link";
import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import '../styles/form/form.css'
import '../styles/home/login.css'
import { Login } from "@/services/login";
import { useState } from "react";

//pagina de login 

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

      <div>mensagem de erro aqui</div>

      <form className="formBody-login">

        <div className="form-input-box">
           <h2 className="tittle-login">Bem-Vindo</h2>
        </div>

        <InputDefault 
          type={'email'}
          placeholder={'Informe seu E-mail'}
          classe={'form-input-box'} 
          label={'E-mail'} 
          onChange ={(e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target as HTMLInputElement).value)}
          value={email}
        />

        <InputDefault 
          type={'password'}
          placeholder={'Informe sua senha'}
          classe={'form-input-box'} 
          label={'Senha'} 
          onChange ={(e: React.ChangeEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)}
          value={password} 
        />

        <div className="form-input-box">
          <span className="criar-conta">Não possui conta ? <Link href={'/register'}>Criar conta</Link> </span>
        </div>

        <div className="form-input-box">
          <span></span>
        </div>

        <div className="form-input-box">
          <Button texto={'Entrar'} classe={'button-home'} onclick={loginEvento}  />
        </div>
 
      </form>
    </Layout>
  );
}

export default Home;