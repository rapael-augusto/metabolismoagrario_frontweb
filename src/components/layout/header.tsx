"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import UserOpt from "./userOptions";
import Styles from "@/styles/layout/header.module.css";
import { useAuthContext } from "@/contexts/auth/authContext";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  isProfileVisible?: boolean;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  isProfileVisible = true,
}) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthContext();
  const [language, setLanguage] = useState(i18n.language);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement> | string,
  ) => {
    const value = typeof e === "string" ? e : e.target.value;
    setLanguage(value);
    localStorage.setItem("language", value);
  };

  const openSelect = () => {
    selectRef.current?.focus();
    selectRef.current?.click();
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <React.Fragment>
      <div className={Styles.header}>
        <div
          className={`${Styles.mainHeader} ${
            user?.name ? "" : Styles.onlyLogo
          }`}
        >
          <Link href={`${user ? "/home" : "/"}`} className={Styles.logoWrapper}>
            <Image
              src="/logo_provisoriaHeader.svg"
              alt="Logo"
              width={50}
              height={50}
            />
            <p className={Styles.logoTitle}>Metabolismo Agrário</p>
          </Link>
          <div className={Styles.menuContainer}>
            {isProfileVisible && (
              <div className={Styles.menuWrapper}>
                <ul className={Styles.listItem}>
                  <UserOpt />
                </ul>
              </div>
            )}
            <div className={Styles.languageWrapper}>
              <div
                className={Styles.languageButton}
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
              >
                <MdLanguage />
              </div>
              {isLanguageDropdownOpen && (
                <div className={Styles.languageDropdown}>
                  <button
                    className={language === "en" ? Styles.active : ""}
                    onClick={() => handleLanguageChange("en")}
                  >
                    US English
                  </button>
                  <button
                    className={language === "pt" ? Styles.active : ""}
                    onClick={() => handleLanguageChange("pt")}
                  >
                    BR Português
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
