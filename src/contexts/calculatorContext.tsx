import { dadosConstants } from "@/app/(public)/constant/[id]/page";
import { usePPLCalculator } from "@/hooks/usePPLCalculator";
import { slidesCalculatorEnum } from "@/components/calculator/calculatorSlidesType";
import { cropsService } from "@/services/crops";
import { PPL_Constants } from "@/types/conversionFactor";
import { dataCropsType } from "@/types/cropsTypes";
import { Constant, cultivarsData, Reference } from "@/types/cultivarTypes";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ReferenceService } from "@/services/reference";
import { cultivarService } from "@/services/cultivar";

type SelectedPPL_Constants = { [key in keyof PPL_Constants]: string };
type filteredConstantsType = dadosConstants;

interface CalculatorProps {
	area: number;
	harvestedProduction: number;
	crops: dataCropsType[];
	cultivars: cultivarsData[];
	selectedCrop: string;
	cultivarId: string;
	constantValues: PPL_Constants;
	constants: ConstantsMap;
	selectedConstants: SelectedPPL_Constants;
	calculations: any;
	filterCriteria: Partial<filteredConstantsType>;
	filteredReferences: Reference[];
	handleCropChange: (crop: string) => void;
	handleCultivarChange: (cultivar: string) => void;
	setArea: (area: number) => void;
	setHarvestedProduction: (production: number) => void;
	handleCalculate: () => void;
	updateFilter: (
		key: keyof filteredConstantsType,
		value?: string | number
	) => void;
	handleConstantChange: (key: keyof PPL_Constants, id: string) => void;
	updateConstantValue: (
		key: keyof PPL_Constants,
		value: string | number,
		artificial?: boolean
	) => void;
	selectConstants: (constants: Constant[]) => void;
}

export const CalculatorContext = React.createContext<CalculatorProps>(
	{} as CalculatorProps
);

const initialConstantsValues: PPL_Constants = {
	HARVEST_INDEX: 0,
	AERIAL_RESIDUE_INDEX: 0,
	PRODUCT_RESIDUE_INDEX: 0,
	PRODUCT_DRY_MATTER_FACTOR: 0,
	RESIDUE_DRY_MATTER_FACTOR: 0,
	BELOWGROUND_INDEX: 0,
	WEED_AERIAL_FACTOR: 0,
	WEED_BELOWGROUND_INDEX: 0,
};

const initialConstants: SelectedPPL_Constants = {
	HARVEST_INDEX: "",
	AERIAL_RESIDUE_INDEX: "",
	PRODUCT_RESIDUE_INDEX: "",
	PRODUCT_DRY_MATTER_FACTOR: "",
	RESIDUE_DRY_MATTER_FACTOR: "",
	BELOWGROUND_INDEX: "",
	WEED_AERIAL_FACTOR: "",
	WEED_BELOWGROUND_INDEX: "",
};

let selectedConstantsBackup: SelectedPPL_Constants | null = null;

interface IConstantValue {
	value: number;
	personal: boolean;
}

type ConstantsMap = {
	[K in keyof PPL_Constants]: IConstantValue;
};

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [cultivarScientificName, setCultivarScientificName] = useState<
		string | any
	>("");
	const [area, setArea] = useState<number>(0);
	const [harvestedProduction, setHarvestedProduction] = useState<number>(0);
	const [crops, setCrops] = useState<dataCropsType[]>([]);
	const [selectedCrop, setSelectedCrop] = useState<string>("");
	const [cultivars, setCultivars] = useState<cultivarsData[]>([]);
	const [references, setReferences] = useState<Reference[]>([]);
	const [cultivarId, setCultivarId] = useState<string>("");
	const [constants, setConstants] = useState<ConstantsMap>({} as ConstantsMap);
	const [filterCriteria, setFilterCriteria] = useState<
		Partial<filteredConstantsType>
	>({});
	const [constantValues, setConstantValues] = useState<PPL_Constants>(
		initialConstantsValues
	);
	const [selectedConstants, setSelectedConstants] =
		useState<SelectedPPL_Constants>(initialConstants);
	const [calculations, setCalculations] = useState<any>(null);

	useEffect(() => {
		const cropsAPI = new cropsService();
		cropsAPI.list().then((response) => setCrops(response));
	}, []);

	const handleCropChange = async (cropId: string) => {
		setSelectedCrop(cropId);
		if (cropId !== "other") {
			const cropsAPI = new cropsService();
			const response = await cropsAPI.findOne(cropId);
			if (response && response.cultivars) {
				setCultivars(response.cultivars);
				setCultivarId("");
				setCultivarScientificName(response.scientificName);
				setConstants({} as ConstantsMap);
				setConstantValues(initialConstantsValues);
				setArea(0);
				setHarvestedProduction(0);
				setCalculations(null);
			}
		}
	};

	const handleCultivarChange = async (cultivarId: string) => {
		setCultivarId(cultivarId);
		const service = new cultivarService();
		try {
			const data = await service.findOne(cultivarId);
			setReferences(data.references);
		} catch (error) {
			toast.error("Erro ao buscar dados da cultivar");
			console.error("Erro ao buscar cultivar:", error);
			return;
		}
	};

	const handleCalculate = () => {
		if (area > 0 && harvestedProduction > 0 && cultivarId) {
			const calculator = usePPLCalculator({
				cultivar: { name: cultivarScientificName },
				constants: constantValues,
				area,
				harvestedProduction,
			});

			const productivity = calculator.getProductivity();
			const totalAerialBiomass = calculator.getTotalAerialBiomass();
			const residueBiomass = calculator.getResidueBiomass();
			const dryMatterBiomass = calculator.getDryMatterBiomass();
			const residueDryMatterBiomass = calculator.getResidueDryMatterBiomass();
			const dryMatterBiomassTotal = calculator.getDryMatterBiomassTotal();

			setCalculations({
				productivity,
				totalAerialBiomass,
				residueBiomass,
				residueDryMatterBiomass,
				dryMatterBiomass,
				dryMatterBiomassTotal,
			});
		} else {
			toast.error("Preencha os dados corretamente!");
		}
	};

	const handleOpenModal = (key: keyof PPL_Constants) => {
		console.log("backup: ", selectedConstantsBackup);
		selectedConstantsBackup = { ...selectedConstants };
		updateFilter("type", key);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		if (selectedConstantsBackup) {
			console.log("backup: ", selectedConstantsBackup);
			setSelectedConstants(selectedConstantsBackup);
			selectedConstantsBackup = null;
		}
		updateFilter("type", "");
		setIsModalOpen(false);
	};

	const updateFilter = (
		key: keyof filteredConstantsType,
		value?: string | number
	) => {
		setFilterCriteria((prev) => ({
			...prev,
			[key]: value || undefined,
		}));
	};

	const handleConstantChange = (key: keyof PPL_Constants, id: string) => {
		setSelectedConstants((prev) => ({
			...prev,
			[key]: id,
		}));
	};

	const updateConstantValue = (
		key: keyof PPL_Constants,
		value: string | number,
		artificial: boolean = false
	) => {
		if (isNaN(Number(value))) return toast.error("Você deve digitar um número");
		if (!artificial) handleConstantChange(key, "");
		setConstantValues((prev) => ({
			...prev,
			[key]: Number(value),
		}));
	};

	const filteredReferences = useMemo(() => {
		if (!filterCriteria || Object.keys(filterCriteria).length === 0) {
			return references;
		}

		return references
			.map((reference) => {
				const filteredEnvironments = reference.environments.filter(
					(envData) => {
						const env = envData.environment;

						return (
							(!filterCriteria.climate ||
								env.climate === filterCriteria.climate) &&
							(!filterCriteria.biome ||
								env.biome === filterCriteria.biome ||
								env.customBiome === filterCriteria.biome) &&
							(!filterCriteria.irrigation ||
								env.irrigation === filterCriteria.irrigation) &&
							(!filterCriteria.country ||
								env.countryId === filterCriteria.country) &&
							(!filterCriteria.soil ||
								env.soil === filterCriteria.soil ||
								env.customSoil === filterCriteria.soil) &&
							(!filterCriteria.cultivationSystem ||
								env.cultivationSystem === filterCriteria.cultivationSystem)
						);
					}
				);

				return {
					...reference,
					environments: filteredEnvironments,
				};
			})
			.filter((reference) => reference.environments.length > 0);
	}, [filterCriteria, references]);

	const selectConstants = (data: Constant[]) => {
		const newConstants: ConstantsMap = {} as ConstantsMap;

		data.forEach((constant) => {
			newConstants[constant.type] = {
				value: constant.value,
				personal: false,
			};
		});

		setConstants(newConstants);
	};

	console.log(constants);

	return (
		<CalculatorContext.Provider
			value={{
				area,
				calculations,
				crops,
				cultivarId,
				cultivars,
				harvestedProduction,
				selectedCrop,
				constantValues,
				selectedConstants,
				filterCriteria,
				filteredReferences,
				handleCropChange,
				handleCultivarChange,
				handleCalculate,
				setArea,
				setHarvestedProduction,
				updateFilter,
				handleConstantChange,
				updateConstantValue,
				selectConstants,
			}}
		>
			{children}
		</CalculatorContext.Provider>
	);
};
