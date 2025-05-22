import { CultivarParams } from "@/types/cultivarTypes";
import { PPL_Constants } from "@/types/conversionFactor";
import { typeTranslation } from "@/utils/translationsOptions";

export interface PPlCalculationsReturn {
	result: number;
	unity: string;
	formula: string;
	name: string;
	calculation: string;
	canNotCalculate: boolean;
	cantCalculateMessage?: string;
}

interface UsePPLCalculatorProps {
	cultivar: CultivarParams;
	constants: PPL_Constants;
	area: number;
	harvestedProduction: number;
}

export const usePPLCalculator = ({
	cultivar,
	constants,
	area,
	harvestedProduction,
}: UsePPLCalculatorProps) => {
	const getProductivity = (): PPlCalculationsReturn => {
		const formula = `Produção colhida / área`;
		if (harvestedProduction < 0 || area <= 0)
			return {
				name: "Produtividade MF",
				result: -1,
				unity: "(t/ha)",
				formula,
				calculation: "",
				canNotCalculate: true,
				cantCalculateMessage:
					"Número de produção colhida ou de área é inválido!",
			};
		const result = harvestedProduction / area;
		const calculation = `${harvestedProduction} / ${area}`;
		console.log(`Fórmula: ${formula}`);
		console.log(`Cálculo: ${calculation}`);
		console.log(`Resultado: ${result.toFixed(2)} (t/ha)`);

		return {
			name: "Produtividade MF",
			result,
			unity: "(t/ha)",
			formula,
			calculation,
			canNotCalculate: false,
		};
	};

	const getTotalAerialBiomass = (): PPlCalculationsReturn => {
		const productivity = getProductivity();
		const formula = `${productivity.name} / ${typeTranslation["HARVEST_INDEX"]}`;
		if (productivity.canNotCalculate || constants.HARVEST_INDEX <= 0)
			return {
				name: "Biomassa aérea total",
				result: -1,
				unity: "(t/ha)",
				formula,
				calculation: "",
				canNotCalculate: true,
				cantCalculateMessage: `${productivity.name} não calculada ou ${typeTranslation["HARVEST_INDEX"]} inválida!`,
			};
		const result = productivity.result / constants.HARVEST_INDEX;
		const calculation = `${productivity.result} / ${constants.HARVEST_INDEX}`;

		console.log(`Fórmula: ${formula}`);
		console.log(`Cálculo: ${calculation}`);
		console.log(`Resultado: ${result.toFixed(2)} (t/ha)`);

		return {
			name: "Biomassa aérea total",
			result,
			unity: "(t/ha)",
			formula,
			calculation,
			canNotCalculate: false,
		};
	};

	const getResidueBiomass = (): PPlCalculationsReturn => {
		const totalAerialBiomass = getTotalAerialBiomass();
		const formula = `${typeTranslation["AERIAL_RESIDUE_INDEX"]} * ${totalAerialBiomass.name}`;
		if (
			totalAerialBiomass.canNotCalculate ||
			constants.AERIAL_RESIDUE_INDEX <= 0
		)
			return {
				name: "Biomassa aérea total",
				result: -1,
				unity: "(t/ha)",
				formula,
				calculation: "",
				canNotCalculate: true,
				cantCalculateMessage: `${totalAerialBiomass.name} não calculada ou ${typeTranslation["AERIAL_RESIDUE_INDEX"]} inválida!`,
			};
		const result = constants.AERIAL_RESIDUE_INDEX * totalAerialBiomass.result;
		const calculation = `${constants.AERIAL_RESIDUE_INDEX} * ${totalAerialBiomass.result}`;

		console.log(`Fórmula: ${formula}`);
		console.log(`Cálculo: ${calculation}`);
		console.log(`Resultado: ${result.toFixed(2)} (t/ha)`);

		return {
			name: "Biomassa do resíduo",
			result,
			unity: "(t/ha)",
			formula,
			calculation,
			canNotCalculate: false,
		};
	};

	const getDryMatterBiomass = (): PPlCalculationsReturn => {
		const productivity = getProductivity();
		const formula = `${productivity.name} * ${typeTranslation["PRODUCT_DRY_MATTER_FACTOR"]}`;
		if (productivity.canNotCalculate || constants.PRODUCT_DRY_MATTER_FACTOR < 0)
			return {
				name: "Biomassa colhida em matéria seca",
				result: -1,
				unity: "(t/ha)",
				formula,
				calculation: "",
				canNotCalculate: true,
				cantCalculateMessage: `${productivity.name} não calculada ou ${typeTranslation["PRODUCT_DRY_MATTER_FACTOR"]} inválida!`,
			};
		const result = productivity.result * constants.PRODUCT_DRY_MATTER_FACTOR;
		const calculation = `${productivity.result} * ${constants.PRODUCT_DRY_MATTER_FACTOR}`;

		console.log(`Fórmula: ${formula}`);
		console.log(`Cálculo: ${calculation}`);
		console.log(`Resultado: ${result.toFixed(2)} (t/ha)`);

		return {
			name: "Biomassa colhida em matéria seca",
			result,
			unity: "(t/ha)",
			formula,
			calculation,
			canNotCalculate: false,
		};
	};

	const getResidueDryMatterBiomass = (): PPlCalculationsReturn => {
		const residueBiomass = getResidueBiomass();
		const formula = `${residueBiomass.name} * ${typeTranslation["RESIDUE_DRY_MATTER_FACTOR"]}`;
		if (
			residueBiomass.canNotCalculate ||
			constants.RESIDUE_DRY_MATTER_FACTOR < 0
		)
			return {
				name: "Biomassa do resíduo em matéria seca",
				result: -1,
				unity: "(t/ha)",
				formula,
				calculation: "",
				canNotCalculate: true,
				cantCalculateMessage: `${residueBiomass.name} não calculada ou ${typeTranslation["RESIDUE_DRY_MATTER_FACTOR"]} inválida!`,
			};
		const result = residueBiomass.result * constants.RESIDUE_DRY_MATTER_FACTOR;
		const calculation = `${residueBiomass.result} * ${constants.RESIDUE_DRY_MATTER_FACTOR}`;

		console.log(`Fórmula: ${formula}`);
		console.log(`Cálculo: ${calculation}`);
		console.log(`Resultado: ${result.toFixed(2)} (t/ha)`);

		return {
			name: "Biomassa do resíduo em matéria seca",
			result,
			unity: "(t/ha)",
			formula,
			calculation,
			canNotCalculate: false,
		};
	};

	const getDryMatterBiomassTotal = (): PPlCalculationsReturn => {
		const dryMatterBiomass = getDryMatterBiomass();
		const residueDryMatterBiomass = getResidueDryMatterBiomass();
		const formula = `${dryMatterBiomass.name} + ${residueDryMatterBiomass.name}`;
		if (
			dryMatterBiomass.canNotCalculate ||
			residueDryMatterBiomass.canNotCalculate
		)
			return {
				name: "Biomassa total em matéria seca",
				result: -1,
				unity: "(t/ha)",
				formula,
				calculation: "",
				canNotCalculate: true,
				cantCalculateMessage: `${dryMatterBiomass.name} não calculada ou ${residueDryMatterBiomass.name} não calculada!`,
			};
		const result = dryMatterBiomass.result + residueDryMatterBiomass.result;
		const calculation = `${dryMatterBiomass.result} + ${residueDryMatterBiomass.result}`;

		console.log(`Fórmula: ${formula}`);
		console.log(`Cálculo: ${calculation}`);
		console.log(`Resultado: ${result.toFixed(2)} (t/ha)`);

		return {
			name: "Biomassa total em matéria seca",
			result,
			unity: "(t/ha)",
			formula,
			calculation,
			canNotCalculate: false,
		};
	};

	return {
		getProductivity,
		getTotalAerialBiomass,
		getResidueBiomass,
		getDryMatterBiomass,
		getResidueDryMatterBiomass,
		getDryMatterBiomassTotal,
	};
};
