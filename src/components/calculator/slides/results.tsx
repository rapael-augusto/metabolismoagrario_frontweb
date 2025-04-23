import Slide from "./slide";
import styles from "@/styles/calculator/index.module.css";
import { Calculation } from "../calculation";
import { useContext } from "react";
import { CalculatorContext } from "@/contexts/calculatorContext";
import Formula from "./results/formula";

export default function ResultsSlide() {
  const { calculations } = useContext(CalculatorContext);

  return (
    <Slide>
      <Slide.Header
        title="Resultados"
        description="Confira os resultados e as formulas listadas abaixo."
      />
      <Slide.Main>
        <>
          {calculations && (
            <div>
              <div className={styles.calculationsWrapper}>
                {Object.keys(calculations).map((calculation, index) => (
                  <Calculation
                    key={calculation}
                    calculation={calculations[calculation]}
                  />
                ))}
              </div>

              <div className={styles.calculationLegends}>
                <h3>Formulas</h3>
                <ul>
                  {Object.keys(calculations).map((calculation, index) => (
                    <Formula
                      key={`calculation-${index}`}
                      calculation={calculations[calculation]}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      </Slide.Main>
    </Slide>
  );
}
