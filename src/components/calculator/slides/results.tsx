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
                    name={calculations[calculation].name}
                    result={Number(calculations[calculation].result)}
                    unity={calculations[calculation].unity}
                  />
                ))}
              </div>
              <div className={styles.calculationLegends}>
                <h3>Formulas</h3>
                <ul>
                  {Object.keys(calculations).map((calculation, index) => {
                    const canNotCalculate =
                      isNaN(Number(calculations[calculation].result)) ||
                      !isFinite(Number(calculations[calculation].result));
                    return (
                      !canNotCalculate && (
                        <li key={index} className={styles.calculationItem}>
                          <label>
                            <b>{calculations[calculation].name}</b>
                          </label>
                          <span className={styles.calculationFormula}>
                            {calculations[calculation].calculation}
                          </span>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </>
      </Slide.Main>
    </Slide>
  );
}
