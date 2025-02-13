"use client";

import Layout from "@/components/layout/layout";
import Modulo from "@/components/home/module";

const homeViewer = () => {
  return (
    <Layout>
      <Modulo URL="/crops" text="Culturas" imageUrl="/vaso.svg" />
      <Modulo URL="/calculator" text="Calculadora" imageUrl="/calculate.svg" />
    </Layout>
  );
};

export default homeViewer;
