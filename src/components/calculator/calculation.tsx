"use client";
import styles from "@/styles/calculation/index.module.css";

interface CalculationProps {
  name: string;
  result: number;
  unity: string;
}

export const Calculation = (props: CalculationProps) => {
  const canNotCalculate = isNaN(props.result) || !isFinite(props.result);

  return (
    <div className={`${styles.calculationBox}`}>
      {canNotCalculate ? (
        <>
          <b>Não foi possível calular</b>
        </>
      ) : (
        <>
          <b>
            {props.result.toFixed(2)} {props.unity}
          </b>
          <p>{props.name}</p>
        </>
      )}
    </div>
  );
};
