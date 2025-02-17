import { dadosConstants } from "@/app/(public)/constant/[id]/page";
import { usePPLCalculator } from "@/hooks/usePPLCalculator";
import { slidesCalculatorEnum } from "@/components/calculator/calculatorSlidesType";
import { cropsService } from "@/services/crops";
import { PPL_Constants } from "@/types/conversionFactor";
import { dataCropsType } from "@/types/cropsTypes";
import { cultivarsData } from "@/types/cultivarTypes";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type SelectedPPL_Constants = { [key in keyof PPL_Constants]: string };
type filteredConstantsType = dadosConstants;

interface CalculatorProps {
	area: number;
	harvestedProduction: number;
	crops: dataCropsType[];
	cultivars: cultivarsData[];
	selectedCrop: string;
	cultivarId: string;
	filteredConstants: Array<filteredConstantsType>;
	constantValues: PPL_Constants;
	selectedConstants: SelectedPPL_Constants;
	calculations: any;
	isModalOpen: boolean;
	filterCriteria: Partial<filteredConstantsType>;
	handleCropChange: (crop: string) => void;
	handleCultivarChange: (cultivar: string) => void;
	setArea: (area: number) => void;
	setHarvestedProduction: (production: number) => void;
	handleCalculate: () => void;
	handleOpenModal: (key: keyof PPL_Constants) => void;
	handleCloseModal: () => void;
	updateFilter: (
		key: keyof filteredConstantsType,
		value?: string | number
	) => void;
	handleConstantChange: (key: keyof PPL_Constants, id: string) => void;
	updateConstantValue: (
		key: keyof PPL_Constants,
		value: string | number
	) => void;
	handleConfirmModal: () => void;
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
	const [cultivarId, setCultivarId] = useState<string>("");
	const [constants, setConstants] = useState<Array<filteredConstantsType>>([]);
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
		if (cropId) {
			const cropsAPI = new cropsService();
			const response = await cropsAPI.findOne(cropId);
			if (response && response.cultivars) {
				setCultivars(response.cultivars);
				setCultivarId("");
				setCultivarScientificName(response.scientificName);
				setConstants([]);
				setConstantValues(initialConstantsValues);
				setArea(0);
				setHarvestedProduction(0);
				setCalculations(null);
			}
		}
	};

	const handleCultivarChange = async (cultivarId: string) => {
		setCultivarId(cultivarId);
		const cropsAPI = new cropsService();
		const response = await cropsAPI.findOneCultivar(cultivarId);
		if (response) {
			setConstants(response.constants);
			const newConstantValues = { ...initialConstantsValues };
			const firstConstantsSelected = response.constants.reduce(
				(acc: Partial<PPL_Constants>, item: dadosConstants) => {
					if (!(item.type in acc)) {
						acc[item.type as keyof PPL_Constants] = item.value;
						handleConstantChange(item.type as keyof PPL_Constants, item.id);
					}
					return acc;
				},
				{}
			);
			Object.assign(newConstantValues, firstConstantsSelected);
			setConstantValues(newConstantValues);
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

	const resetFilter = () => setFilterCriteria({});

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
		resetFilter();
		setIsModalOpen(false);
	};

	const handleConfirmModal = () => {
		const type = filterCriteria["type"] as keyof PPL_Constants;
		if (!type) return toast.error("Houve um erro ao tentar confirmar!");
		const constantId = selectedConstants[type];
		const constant = constants.find((item) => item.id === constantId);
		if (!constant)
			return toast.warning("Você não selecionou nenhuma constante.");
		updateConstantValue(type, constant.value, true);
		setIsModalOpen(false);
		resetFilter();
	};

	const filteredConstants = useMemo(() => {
		return constants.filter((constant) =>
			Object.entries(filterCriteria).every(([key, value]) =>
				value
					? String(constant[key as keyof filteredConstantsType]) ===
					  String(value)
					: true
			)
		);
	}, [constants, filterCriteria]);

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
		artifical: boolean = false
	) => {
		if (isNaN(Number(value))) return toast.error("Você deve digitar um número");
		if (!artifical) handleConstantChange(key, "");
		setConstantValues((prev) => ({
			...prev,
			[key]: Number(value),
		}));
	};

	console.log("teste:", constantValues);

	return (
		<CalculatorContext.Provider
			value={{
				area,
				calculations,
				filteredConstants,
				crops,
				cultivarId,
				cultivars,
				harvestedProduction,
				selectedCrop,
				isModalOpen,
				constantValues,
				selectedConstants,
				filterCriteria,
				handleCloseModal,
				handleCropChange,
				handleCultivarChange,
				handleCalculate,
				setArea,
				setHarvestedProduction,
				handleOpenModal,
				updateFilter,
				handleConstantChange,
				updateConstantValue,
				handleConfirmModal,
			}}
		>
			{children}
		</CalculatorContext.Provider>
	);
};
