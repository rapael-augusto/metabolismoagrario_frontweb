"use client";

import React, { useContext, useState } from "react";
import styles from "@/styles/calculator/index.module.css";
import { navigationsItems, slidesCalculatorEnum } from "./calculatorSlidesType";
import NavigationHeader from "./navigatorheader";
import InitialSlide from "./slides/initial";
import ConstantsSlide from "./slides/constants";
import ResultsSlide from "./slides/results";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CalculatorContext } from "@/contexts/calculatorContext";
import { useAuthContext } from "@/contexts/auth/authContext";
import ReferencesSlide from "./slides/references";

const Calculator = () => {
	const router = useRouter();

	const {
		area,
		harvestedProduction,
		cultivarId,
		calculations,
		handleCalculate,
	} = useContext(CalculatorContext);

	const { user } = useAuthContext();

	const [activeSlide, setActiveSlide] = useState<slidesCalculatorEnum>(
		slidesCalculatorEnum.INITIAL
	);

	const handleActiveSlideChange = (slide: slidesCalculatorEnum) => {
		if (slide === slidesCalculatorEnum.RESULTS && !calculations) return;
		if (
			slide !== slidesCalculatorEnum.INITIAL &&
			handleNavigateConstantErrors()
		)
			return;
		if (slide === slidesCalculatorEnum.RESULTS) handleCalculate();
		setActiveSlide(slide);
	};

	const slidesComponents = {
		[slidesCalculatorEnum.INITIAL]: <InitialSlide />,
		[slidesCalculatorEnum.REFERENCES]: <ReferencesSlide />,
		[slidesCalculatorEnum.CONSTANTS]: <ConstantsSlide />,
		[slidesCalculatorEnum.RESULTS]: <ResultsSlide />,
	};

	const handleSlideNavigateBack = () => {
		if (activeSlide === slidesCalculatorEnum.INITIAL) {
			if (user) return router.push("home");
			else return router.back();
		}
		setActiveSlide(activeSlide - 1);
	};

	const handleNavigateConstantErrors = () => {
		if (!cultivarId) {
			toast.warning("Você deve escolher uma cultivar!");
			return true;
		}
		if (area <= 0) {
			toast.warning("Forneça uma área válida!");
			return true;
		}
		if (harvestedProduction <= 0) {
			toast.warning("Forneça uma produção colhida válida!");
			return true;
		}
		return false;
	};

	const handleSlideNavigateTowards = () => {
		if (activeSlide === slidesCalculatorEnum.RESULTS) return;
		if (
			activeSlide === slidesCalculatorEnum.INITIAL &&
			handleNavigateConstantErrors()
		)
			return;
		if (activeSlide + 1 === slidesCalculatorEnum.RESULTS) handleCalculate();
		setActiveSlide(activeSlide + 1);
	};

	return (
		<div className={styles.page}>
			<NavigationHeader
				activeSlide={activeSlide}
				handleActiveSlideChange={handleActiveSlideChange}
				navigationsItems={navigationsItems}
			/>
			<main className={styles.main}>
				<div className={styles.mainHeader}>
					<button
						onClick={handleSlideNavigateBack}
						className={styles.backButton}
					>
						<FaChevronLeft />
					</button>
					{activeSlide !== slidesCalculatorEnum.RESULTS && (
						<button
							onClick={handleSlideNavigateTowards}
							className={styles.towardsButton}
						>
							{activeSlide === slidesCalculatorEnum.RESULTS - 1 ? (
								"Calcular"
							) : (
								<FaChevronRight />
							)}
						</button>
					)}
				</div>
				{slidesComponents[activeSlide]}
			</main>
		</div>
	);
};

export default Calculator;
