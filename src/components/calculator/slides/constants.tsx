import Slide from "./slide";
import InputDefault from "@/components/forms/inputDefault";
import styles from "@/styles/calculator/index.module.css";
import { PPL_Constants } from "@/types/conversionFactor";
import { typeTranslation } from "@/utils/translationsOptions";
import { FaList } from "react-icons/fa";
import { useContext } from "react";
import { CalculatorContext } from "@/contexts/calculatorContext";
import ListConstantsHeader from "../modal/listConstantsHeader";

export default function ConstantsSlide() {
	const { constantValues, handleOpenModal, updateConstantValue } =
		useContext(CalculatorContext);

	return (
		<Slide>
			<Slide.Header
				title="Constantes"
				description="Algumas constantes podem ser carregadas através dos dados armazenados, complete ou altere alguma informação."
			>
				<ListConstantsHeader />
			</Slide.Header>
			<Slide.Main>
				{Object.keys(constantValues).map((key, index) => (
					<div className={styles.constantInputWrapper} key={`${key}_wrapper`}>
						<InputDefault
							type="number"
							label={`${typeTranslation[key]}`}
							value={constantValues[key as keyof PPL_Constants]}
							step="0.1"
							min={0}
							onChange={(e) =>
								updateConstantValue(key as keyof PPL_Constants, e.target.value)
							}
							classe={styles.inputDefault}
							placeholder={""}
						/>
						<aside>
							<button
								className={styles.listConstantsButton}
								onClick={() => handleOpenModal(key as keyof PPL_Constants)}
							>
								<FaList></FaList>
							</button>
						</aside>
					</div>
				))}
			</Slide.Main>
		</Slide>
	);
}
