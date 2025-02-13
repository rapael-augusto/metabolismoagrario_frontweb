"use client";

import Layout from "@/components/layout/layout";
import Image from "next/image";
import "../../../public/logo_provisoriaHeader.svg";
import "../../../public/LMTSLogo.png";
import "../../../public/ufapeLogo.png";
import "../../../public/logo_lmts.svg";
import styles from "../../styles/home/inicial.module.css";
import Link from "next/link";

const inicialHome = () => {
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
          <Image src="/LMTSLogo.png" alt="lmts" width={200} height={80} />
          <Image src="/ufapeLogo.png" alt="lmts" width={100} height={100} />
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
            <li>Acessar culturas </li>
            <li>Listar usuários do sistema</li>
            <li>Fazer o uso da calculadora</li>
          </ul>
          <div className={styles.divButton}>
            <Link href="/homeViewer">
              <button className={styles.button}>Acesse o Sistema</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default inicialHome;
