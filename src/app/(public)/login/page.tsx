"use client";

import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import { useState } from "react";
import Auth from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/home/login.module.css";
import { toast } from "react-toastify";
import InputPassword from "@/components/forms/inputPassword";
import { useAuthContext } from "@/contexts/auth/authContext";

//pagina de login

const Home = () => {
  const { handleSetUser } = useAuthContext();
  const router = useRouter();
  const auth = new Auth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginEvento = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.info("Para realizar o login você deve informar o email!");
    } else if (!password) {
      toast.info("Para realizar o login você deve informar a senha!");
    } else {
      //requisicao
      const dadosLogin = {
        email: email,
        password: password,
      };
      const { status, message, user } = await auth.login(dadosLogin);
      if (status === 1) {
        handleSetUser(user);
        toast.success("Bem-vindo!",{
          style: {  
            backgroundColor: "var(--primary-color)"
          }
        });
      } else {
        toast.error("Email e/ou senha inválidos!");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.mainWrapper}>
        <div className={styles.textWrapper}>
          <h1>Metabolismo Agrário</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Vitae aliquet ultrices
            congue in nisl. Morbi vitae parturient quis scelerisque ligula orci
            suscipit. Leo integer malesuada elit blandit sit quam quis
            convallis. Mattis ornare dignissim amet cursus arcu lacus risus
            gravida. Cras nunc mi suspendisse in aliquet sit pellentesque aenean
            egestas. Venenatis sagittis nisi neque eget enim magna turpis.
            Iaculis in mi accumsan egestas hendrerit orci amet etiam.
          </p>
        </div>

        <form className={styles.formWrapper}>
          <div className={styles.inputBox}>
            <h2 className={styles.formTitle}>Entrar</h2>
          </div>

          <main className={styles.formMain}>
            <div className={styles.inputWrapper}>
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

              <InputPassword
                type={"password"}
                placeholder={"Informe sua senha"}
                label={"Senha"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
                value={password}
              />
              <div className={styles.forgotPasswordContainer}>
                <Link
                  id="esq"
                  href="/forgotPassword"
                  className={styles.forgotPassword}
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <div className={styles.inputBox}>
              <Button
                texto={"Entrar"}
                classe={"button-homeHome"}
                onclick={loginEvento}
              />
            </div>
          </main>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
