"use client";
import { PPlCalculationsReturn } from "@/hooks/usePPLCalculator";
import styles from "@/styles/calculation/index.module.css";

interface CalculationProps {
	calculation: PPlCalculationsReturn;
}

export const Calculation = ({ calculation }: CalculationProps) => {
	return (
		<div className={`${styles.calculationBox}`}>
			{calculation.canNotCalculate ? (
				<>
					<h5>Não foi possível calular</h5>
					<p>{calculation.name}</p>
				</>
			) : (
				<>
					<b>
						{calculation.result.toFixed(2)} {calculation.unity}
					</b>
					<p>{calculation.name}</p>
				</>
			)}
		</div>
	);
};
