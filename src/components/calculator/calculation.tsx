"use client";
import styles from "@/styles/calculation/index.module.css";

interface CalculationProps {
  name: string;
  result: number;
  unity: string;
}

export const Calculation = (props: CalculationProps) => {
  const displayResult =
    isNaN(props.result) || !isFinite(props.result)
      ? "N/A"
      : props.result.toFixed(2);

  return (
    <div className={styles.calculationBox}>
      <b>
        
        {displayResult} {props.unity}
      </b>
      <p>{props.name}</p>
    </div>
  );
};
