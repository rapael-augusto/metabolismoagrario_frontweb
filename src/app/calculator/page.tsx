"use client";

import SecurityComp from "@/components/auth/security";
import Calculator from "@/components/calculator/calculator";
import Layout from "@/components/layout/layout";

const calculadora = () => {
  return (
    <SecurityComp>
      <Layout>
        <Calculator />
      </Layout>
    </SecurityComp>
  );
};

export default calculadora;
