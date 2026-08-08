"use client";

import "@/styles/home/homepage.css";
import Modulo from "@/components/home/module";
import Layout from "@/components/layout/layout";
import { FaGavel } from "react-icons/fa";
import { useAuthContext } from "@/contexts/auth/authContext";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();

  if (!user) return;

  const renderLayout = () => {
    if (user.role === "ADMIN") {
      return (
        <>
          <Modulo URL="/crops" text={t("modulo.crops")} imageUrl="/vaso.svg" />
          <Modulo URL="/usersList" text={t("modulo.users")} imageUrl="/account.svg" />
          <Modulo
            URL="/calculator"
            text={t("modulo.calculator")}
            imageUrl="/calculate.svg"
          />
          <Modulo URL="/reviews" text={t("modulo.reviews")} icon={FaGavel} />
        </>
      );
    } else {
      return (
        <>
          <Modulo URL="/crops" text={t("modulo.crops")} imageUrl="/vaso.svg" />
          <Modulo
            URL="/calculator"
            text={t("modulo.calculator")}
            imageUrl="/calculate.svg"
          />
          <Modulo URL="/reviews" text={t("modulo.self-reviews")} icon={FaGavel} />
        </>
      );
    }
  };

  return (
    <Layout>
      <div className="homepage-box">{renderLayout()}</div>
    </Layout>
  );
};

export default Home;
