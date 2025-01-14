import { ReactNode } from "react";

export enum slidesCalculatorEnum {
  INITIAL,
  CONSTANTS,
  RESULTS,
}

export const navigationsItems = [
  {
    title: "Informações",
    slide: slidesCalculatorEnum.INITIAL,
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
