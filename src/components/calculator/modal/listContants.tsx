import { CalculatorContext } from "@/contexts/calculatorContext";
import {
	cultivationSystemTranslation,
	irrigationTranslation,
	soilTranslation,
	typeTranslation,
} from "@/utils/translationsOptions";
import styles from "@/styles/calculator/ListConstants/index.module.css";
import { useContext, useState } from "react";
import { PPL_Constants } from "@/types/conversionFactor";
import Pagination from "@/components/pagination";
export default function ListConstants() {
	const { filteredConstants, selectedConstants, handleConstantChange } =
		useContext(CalculatorContext);
	const [currentPage, setCurrentPage] = useState(1);
	const perPage = 3;

	const paginatedData = filteredConstants.slice(
		(currentPage - 1) * perPage,
		currentPage * perPage
	);

	const handlePaginate = (page: number) => {
		setCurrentPage(page);
	};

	const pages = Math.ceil(filteredConstants.length / perPage);

	return (
		<div className={styles.listConstantsContainer}>
			<Pagination
				pages={pages}
				currentPage={currentPage}
				handlePaginate={handlePaginate}
			/>
			<main>
				{paginatedData.length === 0 && (
					<p className={styles.notFoundText}>Não há constantes cadastradas</p>
				)}
				{paginatedData.map((item, index) => (
					<div
						key={`constant_${index}`}
						className={`${styles.constantRadioWrapper} ${
							selectedConstants[item.type as keyof PPL_Constants] === item.id &&
							styles.active
						}`}
						onClick={(e) =>
							handleConstantChange(item.type as keyof PPL_Constants, item.id)
						}
					>
						<div>
							<p>
								<b>Tipo: </b> {typeTranslation[item.type]}
							</p>
							<p>
								<b>Clima: </b>{" "}
								{typeTranslation[item.climate] ?? "Não informado"}
							</p>
							<p>
								<b>Solo: </b> {soilTranslation[item.soil] ?? "Não informado"}
							</p>
							<p>
								<b>Irrigação: </b>{" "}
								{irrigationTranslation[item.irrigation] ?? "Não informado"}
							</p>
							<p>
								<b>Bioma: </b> {item.biome ?? "Não informado"}
							</p>
							<p>
								<b>Sistema de Cultivo: </b>{" "}
								{cultivationSystemTranslation[item.cultivationSystem] ??
									"Não informado"}
							</p>
						</div>
					</div>
				))}
			</main>
		</div>
	);
}
