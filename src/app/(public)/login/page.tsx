"use client";

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import { useState } from "react";
import Auth from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/home/login.module.css";
import { toast } from "react-toastify";
import InputPassword from "@/components/forms/inputPassword";
import { useAuthContext } from "@/contexts/auth/authContext";
import { validateEmail } from "@/utils/authUtils";
import { useTranslation } from "react-i18next";

//pagina de login

const Home = () => {
  const { handleSetUser } = useAuthContext();
  const router = useRouter();
  const auth = new Auth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const loginEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.info(t("login.toast-error-email"));
      setIsLoading(false);
    } else if (!password) {
      toast.info(t("login.toast-error-login"));
      setIsLoading(false);
    } else {
      const dadosLogin = {
        email: email,
        password: password,
      };
      try {
        const { status, message, user } = await auth.login(dadosLogin);
        setIsLoading(false);
        if (status === 1) {
          handleSetUser(user);
          toast.success(t("login.toast-success"), {
            style: {
              backgroundColor: "var(--primary-color)",
            },
          });
        } else {
          toast.error(t("login.toast-error-invalid"));
        }
      } catch (error) {
        setIsLoading(false);
        // O toast de erro padrão já é exibido pelo interceptor global
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
                placeholder={t("translation-utils.email-placeholder")}
                classe={"form-input-box"}
                label={"E-mail"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = (e.target as HTMLInputElement).value;
                  setEmail(value);

                  if (value.trim() === "") {
                    setEmailError(t("login.email-error"));
                  } else {
                    const error = validateEmail(value, true) as string;
                    setEmailError(error || null);
                  }
                }}
                value={email}
                errorMsg={emailError || undefined}
              />

              <InputPassword
                type={"password"}
                placeholder={t("login.password-placeholder")}
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
                  {t("login.forgot-password-link")}
                </Link>
              </div>
            </div>

            <div className={styles.inputBox}>
              <button
                type="submit"
                className={`button-homeHome`}
                onClick={loginEvento}
                disabled={isLoading}
              >
                {isLoading ? t("login.login-button-loading") : t("login.login-button-text")}
              </button>
            </div>
          </main>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
