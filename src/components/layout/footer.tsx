"use client";

import Image from "next/image";
import React from "react";

import Styles from "@/styles/layout/footer.module.css";

export const Footer: React.FunctionComponent = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.mainFooter}>
        <div className={Styles.imgFlex}>
          <Image
            src={"/logo_provisoria.svg"}
            alt="logo metabolismo agrário"
            width={50}
            height={50}
            className="log-metabolismo-agrário"
          />
          <p className="logo-sistema-nome">
            Metabolismo <br /> Agrário
          </p>
        </div>

        <div className={Styles.imgFlex}>
          <Image
            src={"/logo_ufape.svg"}
            alt="logo lmts"
            width={77.78}
            height={77.78}
            className="logo-ufape"
          />

          <Image
            src={"/logo_lmts.svg"}
            alt="logo lmts"
            width={104.7}
            height={45.89}
            className="logo-lmts"
          />
        </div>

        <div className={`${Styles.imgFlex} ${Styles.mediaSocial}`}>
          <Image
            src={"/logo_email.svg"}
            alt="logo lmts"
            width={30}
            height={30}
            className="logo-facebook"
          />

          <Image
            src={"/logo_facebook.svg"}
            alt="logo lmts"
            width={30}
            height={30}
            className="logo-facebook"
          />

          <a
            href="https://www.instagram.com/lmts_ufape/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/logo_instagram.svg"}
              alt="logo lmts"
              width={30}
              height={30}
              className="logo-facebook"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
