import { ReactNode } from "react";

export enum slidesCalculatorEnum {
	INITIAL,
	REFERENCES,
	CONSTANTS,
	RESULTS,
}

export const navigationsItems = [
	{
		title: "Informações",
		slide: slidesCalculatorEnum.INITIAL,
	},
	{
		title: "References",
		slide: slidesCalculatorEnum.REFERENCES,
	},
	{
		title: "Fatores de conversão",
		slide: slidesCalculatorEnum.CONSTANTS,
	},
	{
		title: "Resultados",
		slide: slidesCalculatorEnum.RESULTS,
	},
];

export type SlideComponents = { [key in slidesCalculatorEnum]: ReactNode };
