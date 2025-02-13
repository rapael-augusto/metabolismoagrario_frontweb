"use client";

import SecurityComp from "@/components/auth/security";
import Calculator from "@/components/calculator/calculator";
import Layout from "@/components/layout/layout";
import { CalculatorProvider } from "@/contexts/calculatorContext";

const calculadora = () => {
  return (
    <SecurityComp>
      <Layout>
        <CalculatorProvider>
          <Calculator />
        </CalculatorProvider>
      </Layout>
    </SecurityComp>
  );
};

export default calculadora;
