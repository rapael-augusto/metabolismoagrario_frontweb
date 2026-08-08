"use client";

import { FormEvent, useState } from "react";
import Layout from "@/components/layout/layout";
import "@public/logo_provisoriaHeader.svg";
import Link from "next/link";
import styles from "@/styles/forgotPassword/forgotPassword.module.css";
import { FaPaperPlane } from "react-icons/fa";
import Auth from "@/services/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [screen, setScreen] = useState<"INITIAL" | "SENT">("INITIAL");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const authService = new Auth();
    try {
      const tokenIsValid = await authService.createForgotPasswordToken(email);
      setIsLoading(false);
      if (tokenIsValid != "OK") {
        toast.error("Erro ao enviar email de recuperação de senha.");
        return;
      }
      setScreen("SENT");
      toast.info("Email enviado. Verifique seu email ou sua caixa de spam.");
    } catch (error) {
      setIsLoading(false);
      toast.error(
        "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
      );
    }
  };

  return (
    <Layout>
      <div
        className={`${styles.containerForgot} ${
          screen === "SENT" ? styles.sentScreen : ""
        }`}
      >
        {screen === "INITIAL" && (
          <>
            <div className={styles.contImage}>
              <img src="logo_provisoriaHeader.svg" width="80px" alt="userImg" />
            </div>
            <div className={styles.contText}>
              <h2>{t("forgot-password-page.title")}</h2>
              <p>{t("forgot-password-page.sub-title")}</p>
            </div>
            <form className={styles.contForm} onSubmit={handleSubmit}>
              <label className={styles.inputDefaultLabel}>E-mail:</label>
              <input
                className={styles.inputDefaultInput}
                type="text"
                id="email"
                name="email"
                placeholder={t("translation-utils.email-placeholder")}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={styles.contButtons}>
                <Link href="/login">
                  <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={() => console.log("Cancelar clicado!")}
                  >
                    {t("translation-utils.cancel")}
                  </button>
                </Link>
                <button
                  className={styles.forgButton}
                  type="submit"
                  disabled={isLoading}
                >
                  {t("translation-utils.confirm")}
                </button>
              </div>
            </form>
          </>
        )}
        {screen === "SENT" && (
          <>
            <div className={styles.textFeed}>
              <h2>{t("forgot-password-page.sent-title")}</h2>
              <div className={styles.icon}>
                <FaPaperPlane color="#80ad6b" size="65px" />
              </div>
              <p>{t("forgot-password-page.sent-subtitle")}</p>
            </div>
            <div className={styles.butFeed}>
              <Link href="/">
                <button className={styles.backButton}>{t("translation-utils.return")}</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
