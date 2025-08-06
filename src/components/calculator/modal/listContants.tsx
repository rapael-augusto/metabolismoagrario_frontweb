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
import { Constant, EnvironmentData } from "@/types/cultivarTypes";

export default function ListConstants() {
	const { filteredReferences, selectConstants } = useContext(CalculatorContext);
	const [currentPage, setCurrentPage] = useState(1);
	const perPage = 3;

	// Flatten all EnvironmentData from filtered references
	const allEnvironments: EnvironmentData[] = filteredReferences.flatMap((ref) =>
		ref.environments
	);
	// Flatten all constants with their environment
	const allConstantsWithEnv = allEnvironments.flatMap((env) =>
		env.constants.map((constant) => ({ constant, env }))
	);

	const paginatedData = allConstantsWithEnv.slice(
		(currentPage - 1) * perPage,
		currentPage * perPage
	);

	const handlePaginate = (page: number) => {
		setCurrentPage(page);
	};

	const pages = Math.ceil(allConstantsWithEnv.length / perPage);

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
				{paginatedData.map(({ constant, env }, index) => (
					<div
						key={`constant_${index}`}
						className={styles.constantRadioWrapper}
						onClick={() => selectConstants([constant])}
					>
						<div>
							<p>
								<b>Tipo: </b> {typeTranslation[constant.type]}
							</p>
							<p>
								<b>Clima: </b> {env.environment.climate || "Não informado"}
							</p>
							<p>
								<b>Solo: </b>{" "}
								{env.environment.customSoil ||
									(env.environment.soil
										? soilTranslation[env.environment.soil]
										: "Não informado")}
							</p>
							<p>
								<b>Irrigação: </b>{" "}
								{env.environment.irrigation
									? irrigationTranslation[env.environment.irrigation]
									: "Não informado"}
							</p>
							<p>
								<b>Bioma: </b>{" "}
								{env.environment.customBiome ||
									env.environment.biome ||
									"Não informado"}
							</p>
							<p>
								<b>Sistema de Cultivo: </b>{" "}
								{env.environment.cultivationSystem
									? cultivationSystemTranslation[env.environment.cultivationSystem]
									: "Não informado"}
							</p>
						</div>
					</div>
				))}
			</main>
		</div>
	);
}
