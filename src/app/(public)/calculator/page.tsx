"use client";

import Calculator from "@/components/calculator/calculator";
import Layout from "@/components/layout/layout";
import { CalculatorProvider } from "@/contexts/calculatorContext";

const calculadora = () => {
	return (
		<Layout>
			<CalculatorProvider>
				<Calculator />
			</CalculatorProvider>
		</Layout>
	);
};

export default calculadora;
