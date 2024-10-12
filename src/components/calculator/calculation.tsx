"use client";
import styles from "@/styles/calculation/index.module.css";

interface CalculationProps {
  name: string;
  result: number;
  unity: string;
}

export const Calculation = (props: CalculationProps) => {
  return (
    <div className={styles.calculationBox}>
      <b>
        {props.result.toFixed(2)} {props.unity}
      </b>
      <p>{props.name}</p>
    </div>
  );
};
