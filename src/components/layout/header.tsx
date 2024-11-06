"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserOpt from "./userOptions";
import Styles from "@/styles/layout/header.module.css";

export const Header: React.FunctionComponent = () => {
  const [sessao, setSessao] = useState<string | any>("");
  const [userName, setUserName] = useState<string | any>("");

  useEffect(() => {
    let token = sessionStorage.getItem("@token");
    let user = sessionStorage.getItem("user");

    setSessao(token);
    setUserName(user);
  }, []);

  return (
    <React.Fragment>
      <div className={Styles.header}>
        <div
          className={`${Styles.mainHeader} ${userName ? "" : Styles.onlyLogo}`}
        >
          <Link href="/home" className={Styles.logoWrapper}>
            <Image
              src="/logo_provisoriaHeader.svg"
              alt="Logo"
              width={50}
              height={50}
            />
            <p className={Styles.logoTitle}>Metabolismo Agrário</p>
          </Link>
          <div className={Styles.menuWrapper}>
            <ul className={Styles.listItem}>
              <UserOpt token={sessao} userLogado={userName} />
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
