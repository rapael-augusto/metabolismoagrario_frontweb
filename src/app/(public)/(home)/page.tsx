"use client";

import Layout from "@/components/layout/layout";
import Image from "next/image";
import "@public/logo_provisoriaHeader.svg";
import "@public/LMTSLogo.png";
import "@public/ufapeLogo.png";
import styles from "@/styles/home/inicial.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const inicialHome = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className={styles.cont}>
        <div className={styles.miniCont}>
          <div className={styles.contLogo}>
            <Image
              src="/logo_provisoriaHeader.svg"
              alt="Logo"
              width={70}
              height={70}
            />
            <p className={styles.logoTitle}>Metabolismo Agrário</p>
          </div>
          <Image src={"/LMTSLogo.png"} alt="lmts" width={180} height={80} />
          <Image src={"/ufapeLogo.png"} alt="ufape" width={120} height={120} />
        </div>
        <div className={styles.contText}>
          <h1 className={styles.h1}>Metabolismo Agrário</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Vitae aliquet ultrices
            congue in nisl. Morbi vitae parturient quis scelerisque ligula orci
            suscipit. Leo integer malesuada elit blandit sit quam quis
            convallis. Mattis ornare dignissim amet cursus arcu lacus risus
            gravida. Cras nunc mi suspendisse in aliquet sit pellentesque aenean
            egestas. Venenatis sagittis nisi neque eget enim magna turpis.
            Iaculis in mi accumsan egestas hendrerit orci amet etiam.
          </p>
          <ul className={styles.lista}>
            <li>{t("initial-home.list-1")}</li>
            <li>{t("initial-home.list-2")}</li>
            <li>{t("initial-home.list-3")}</li>
          </ul>
          <div className={styles.divButton}>
            <Link className={styles.linkButton} href="/modules">
              <button className={styles.button}>{t("initial-home.access-button")}</button>
            </Link>
          </div>
          <p className={styles.paragrafo}>
            {t("initial-home.has-account-text")}
            <Link href="/home" style={{ color: "#7F975D" }}>
              {t("initial-home.has-account-link")}
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default inicialHome;
