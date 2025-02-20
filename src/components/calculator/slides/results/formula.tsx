import { PPlCalculationsReturn } from "@/hooks/usePPLCalculator";
import styles from "@/styles/calculator/index.module.css";

interface IFormulaProps {
	calculation: PPlCalculationsReturn;
}

const Formula = ({ calculation }: IFormulaProps) => {
	return (
		<li className={`${styles.calculationItem}`}>
			<label>
				<b>{calculation.name}</b>
			</label>
			<div
				className={`${styles.calculationFormula} ${
					calculation.canNotCalculate && "danger"
				}`}
			>
				<span>
					{calculation.canNotCalculate
						? calculation.cantCalculateMessage
						: calculation.calculation}
				</span>
				<span>{calculation.formula}</span>
			</div>
		</li>
	);
};

export default Formula;
