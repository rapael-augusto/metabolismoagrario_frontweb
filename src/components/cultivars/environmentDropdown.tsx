"use client";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ConstantsDropdown from "./constantsDropdown";

interface EnvironmentData {
	id: string;
	climate: string | null;
	biome: string | null;
	customBiome: string | null;
	irrigation: string | null;
	countryId: string;
	soil: string | null;
	customSoil: string | null;
	cultivationSystem: string | null;
	createdAt: string;
	updatedAt: string;
	constants: Constant[];
}

interface Constant {
	id: string;
	value: number;
	type: string;
	comment: string | null;
}

export default function EnvironmentDropdown({
	environment,
	index,
}: {
	environment: EnvironmentData;
	index: number;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={Styles.toggleButton}
			>
				Ambiente {index + 1}
				{isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
			</button>
			{isOpen && (
				<div className={Styles.content}>
					<div className={Styles.characteristicsGrid}>
						<div className={Styles.characteristicCard}>
							<strong>Clima:</strong> {environment.climate || "Não informado"}
						</div>
						<div className={Styles.characteristicCard}>
							<strong>Bioma:</strong> {environment.biome || "Não informado"}
						</div>
						{environment.customBiome && (
							<div className={Styles.characteristicCard}>
								<strong>Bioma Personalizado:</strong>{" "}
								{environment.customBiome || "Não informado"}
							</div>
						)}
						<div className={Styles.characteristicCard}>
							<strong>Irrigação:</strong>{" "}
							{environment.irrigation || "Não informado"}
						</div>
						<div className={Styles.characteristicCard}>
							<strong>Solo:</strong> {environment.soil || "Não informado"}
						</div>
						{environment.customSoil && (
							<div className={Styles.characteristicCard}>
								<strong>Solo Personalizado:</strong>{" "}
								{environment.customSoil || "Não informado"}
							</div>
						)}
						<div className={Styles.characteristicCard}>
							<strong>Sistema de Cultivo:</strong>{" "}
							{environment.cultivationSystem || "Não informado"}
						</div>
					</div>
					<ConstantsDropdown
						key={environment.id}
						constants={environment.constants}
					/>
				</div>
			)}
		</div>
	);
}
