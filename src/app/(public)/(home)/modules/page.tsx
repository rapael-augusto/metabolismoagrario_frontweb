"use client";

import Layout from "@/components/layout/layout";
import Modulo from "@/components/home/module";
import { useTranslation } from "react-i18next";

const homeViewer = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Modulo URL="/crops" text={t("modulo.crops")} imageUrl="/vaso.svg" />
      <Modulo
        URL="/calculator"
        text={t("modulo.calculator")}
        imageUrl="/calculate.svg"
      />
    </Layout>
  );
};

export default homeViewer;
