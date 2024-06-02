"use client";

import Link from "next/link";
import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import '../styles/form/form.css'
import '../styles/home/login.css'
import { useState } from "react";
import Auth from "@/services/auth";
import { redirect } from "next/navigation";

//pagina de login 

const Home = () => {
  const auth = new Auth

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [statusResponse, setStatusResponse] = useState('')


  const loginEvento = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      sessionStorage.setItem('mensagem', `{"mensagem":"Para realizar o login você deve informar o e-mail !","tipo":"danger"}`)
      location.reload()
    } else if (!password) {
      sessionStorage.setItem('mensagem', `{"mensagem":"Para realizar o login você deve informar a senha !","tipo":"danger"}`)
      location.reload()
    } else {
      //requisicao
      const dadosLogin = {
        email: email,
        password: password,
      };


      const response: any = await auth.login(dadosLogin);
      setStatusResponse(response.status)
    }

  }

  if (statusResponse == "1") {
    redirect('/home')
  } else {
    return (
      <Layout>

        <form className="formBody-login">

          <div className="form-input-box">
            <h2 className="tittle-login">Entrar</h2>
          </div>

          <InputDefault
            type={'email'}
            placeholder={'Informe seu E-mail'}
            classe={'form-input-box'}
            label={'E-mail'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target as HTMLInputElement).value)}
            value={email}
          />

          <InputDefault
            type={'password'}
            placeholder={'Informe sua senha'}
            classe={'form-input-box'}
            label={'Senha'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)}
            value={password}
          />

          <div className="form-input-box">
            <span></span>
          </div>

          <div className="form-input-box">
            <Button texto={'Entrar'} classe={'button-home'} onclick={loginEvento} />
          </div>

        </form>
      </Layout>
    );
  }

}

export default Home;