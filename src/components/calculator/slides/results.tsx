import Slide from "./slide";
import styles from "@/styles/calculator/index.module.css";
import { Calculation } from "../calculation";
import { useContext } from "react";
import { CalculatorContext } from "@/contexts/calculatorContext";

export default function ResultsSlide() {
  const { calculations } = useContext(CalculatorContext);

  return (
    <Slide>
      <Slide.Header
        title="Resultados"
        description="Os cálculos abaixo fornecem uma ideia do que se pode esperar."
      />
      <Slide.Main>
        <>
          {calculations && (
            <div>
              <div className={styles.calculationsWrapper}>
                {Object.keys(calculations).map((calculation, index) => (
                  <Calculation
                    key={calculation}
                    name={calculations[calculation].name}
                    result={Number(calculations[calculation].result)}
                    unity={calculations[calculation].unity}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      </Slide.Main>
    </Slide>
  );
}
