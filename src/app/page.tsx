"use client";

import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import "../styles/form/form.css";
import "../styles/home/login.css";
import { useState } from "react";
import Auth from "@/services/auth";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

//pagina de login

const Home = () => {
  const auth = new Auth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusResponse, setStatusResponse] = useState("");

  const loginEvento = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      sessionStorage.setItem(
        "mensagem",
        `{"mensagem":"Para realizar o login você deve informar o e-mail !","tipo":"danger"}`
      );
      setTimeout(() => {
        const alertBox = document.querySelector(".alert-box");
        if (alertBox) {
          console.log("Ocultando alerta após 2s");
          alertBox.classList.add("hidden");
        }
      }, 2000);

      location.reload();
    } else if (!password) {
      sessionStorage.setItem(
        "mensagem",
        `{"mensagem":"Para realizar o login você deve informar a senha !","tipo":"danger"}`
      );
      setTimeout(() => {
        const alertBox = document.querySelector(".alert-box");
        if (alertBox) {
          console.log("Ocultando alerta após 2s");
          alertBox.classList.add("hidden");
        }
      }, 2000);

      location.reload();
    } else {
      //requisicao
      const dadosLogin = {
        email: email,
        password: password,
      };

      const response: any = await auth.login(dadosLogin);
      setStatusResponse(response.status);

      if (response.status === "1") {
        // Armazena o token no sessionStorage
        sessionStorage.setItem("accessToken", response.accessToken);

        // Decodifica o token para obter a role
        const decodedToken: any = jwtDecode(response.accessToken);
        sessionStorage.setItem("role", decodedToken.role);

        setStatusResponse(response.status);
        redirect("/home");
      } else {
        setStatusResponse(response.status);
      }
    }
  };

  if (statusResponse == "1") {
    redirect("/home");
  } else {
    return (
      <Layout>
        <div className="page-container">
          <div className="text-content">
            <h1>Metabolismo Agrário</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Vitae aliquet ultrices
              congue in nisl. Morbi vitae parturient quis scelerisque ligula
              orci suscipit. Leo integer malesuada elit blandit sit quam quis
              convallis. Mattis ornare dignissim amet cursus arcu lacus risus
              gravida. Cras nunc mi suspendisse in aliquet sit pellentesque
              aenean egestas. Venenatis sagittis nisi neque eget enim magna
              turpis. Iaculis in mi accumsan egestas hendrerit orci amet etiam.
            </p>
          </div>

          <form className="formBody-login">
            <div className="form-input-box">
              <h2 className="tittle-login">Entrar</h2>
            </div>

            <InputDefault
              type={"email"}
              placeholder={"Informe seu E-mail"}
              classe={"form-input-box"}
              label={"E-mail"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail((e.target as HTMLInputElement).value)
              }
              value={email}
            />

            <InputDefault
              type={"password"}
              placeholder={"Informe sua senha"}
              classe={"form-input-box"}
              label={"Senha"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              value={password}
            />
            <div className="forgot-password">
              <Link href="/forgot-password">Esqueceu a senha?</Link>
            </div>

            <div className="form-input-box">
              <Button
                texto={"Entrar"}
                classe={"button-homeHome"}
                onclick={loginEvento}
              />
            </div>

            <p className="form-register">
              Não possui conta? <Link href="/register">Crie agora</Link>
            </p>
          </form>
        </div>
      </Layout>
    );
  }
};

export default Home;
