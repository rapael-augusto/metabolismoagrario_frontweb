import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { countriesService } from "@/services/countries";
import { soilService } from "@/services/soil";
import { biomeService } from "@/services/biome";
import { toast } from "react-toastify";
import { PPL_Constants } from "@/types/conversionFactor";
import { ReferenceService } from "@/services/reference";
import {
	IEnvironmentData,
	IReferenceFormData,
	TCultivarConstants,
} from "@/types/cultivarTypes";
import { ConstantService } from "@/services/constant";

const initialConstants: TCultivarConstants[] = Object.entries({
	HARVEST_INDEX: 0,
	AERIAL_RESIDUE_INDEX: 0,
	PRODUCT_RESIDUE_INDEX: 0,
	PRODUCT_DRY_MATTER_FACTOR: 0,
	RESIDUE_DRY_MATTER_FACTOR: 0,
	BELOWGROUND_INDEX: 0,
	WEED_AERIAL_FACTOR: 0,
	WEED_BELOWGROUND_INDEX: 0,
} as PPL_Constants).map(([key, value]) => ({
	type: key as keyof PPL_Constants,
	value,
}));

const useConstantForm = (params: { id: string }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [references, setReferences] = useState<string[]>([]);
	const [constantsFormData, setConstantsFormData] =
		useState<TCultivarConstants[]>(initialConstants);
	const [environmentFormData, setEnvironmentFormData] =
		useState<IEnvironmentData>({
			climate: undefined,
			biome: undefined,
			customBiome: null,
			irrigation: undefined,
			country: undefined,
			soil: undefined,
			customSoil: null,
			cultivationSystem: undefined,
		});
	const [referenceFormData, setReferenceFormData] =
		useState<IReferenceFormData>({
			title: "",
			comment: null,
		});
	const [countries, setCountries] = useState<{ nome_pais: string }[]>([]);

	useEffect(() => {
		if (params.id) {
			fetchCountries();
			fetchReferences();
		}
	}, [params.id]);

	const fetchCountries = async () => {
		try {
			setLoading(true);
			const service = new countriesService(null);
			const response = await service.listAll();
			setCountries(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Erro ao carregar os países:", error);
		}
	};

	const fetchReferences = async () => {
		try {
			setLoading(true);
			const service = new ReferenceService();
			const response = await service.getNameOfAll();

			if (!response.success) {
				return toast.error("Houve um erro ao carregar referências cadastradas");
			}
			const titles: string[] = response.data.map(
				(item: { title: string }) => item.title
			);
			setReferences(titles);
			setLoading(false);
		} catch (error) {
			console.error("Erro ao carregar os países:", error);
		}
	};

	const validateFields = () => {
		const newErrors: string[] = [];
		return newErrors.length === 0;
	};

	const createCustomSoil = async (name: string) => {
		const service = new soilService(null);
		try {
			const response = await service.createSoil({
				name,
			});
			return response.id;
		} catch (error) {
			console.error("Erro ao criar solo personalizado:", error);
			toast.error("Erro ao criar solo personalizado");
			return null;
		}
	};

	const createCustomBiome = async (name: string) => {
		const service = new biomeService(null);
		try {
			const response = await service.createBiome({
				name,
			});
			return response.id;
		} catch (error) {
			console.error("Erro ao criar bioma personalizado:", error);
			toast.error("Erro ao criar bioma personalizado");
			return null;
		}
	};

	const handleConstantChange = (type: keyof PPL_Constants, value: number) => {
		setConstantsFormData((prev) =>
			prev.map((constant) =>
				constant.type === type ? { ...constant, value } : constant
			)
		);
	};

	const handleEnvironmentChange = (
		type: keyof IEnvironmentData,
		value: IEnvironmentData[typeof type]
	) => {
		setEnvironmentFormData((prev) => ({ ...prev, [type]: value }));
	};

	const handleReferenceChange = (
		type: keyof IReferenceFormData,
		value: IReferenceFormData[typeof type]
	) => {
		setReferenceFormData((prev) => ({ ...prev, [type]: value }));
	};

	const handleCreateReference = async (cultivarId: string) => {
		const referenceService = new ReferenceService();

		const response = await referenceService.createReference(cultivarId, {
			constants: constantsFormData,
			environment: environmentFormData,
			reference: referenceFormData,
		});

		if (!response.success) {
			toast.error(response.message);
			return;
		}

		toast.success(response.message);
		router.replace(`/cultivars/view/${cultivarId}`);
	};

	const handleUpdateReference = async (
    referenceId: string,
    data: IReferenceFormData
  ) => {
    const referenceService = new ReferenceService();

    const response = await referenceService.update(referenceId, data);
    if (!response.success) {
      toast.error(response.message);
      return false;
    }

    window.location.reload();
    return true;
  };

  const handleEnvironmentUpdate = async (
    entities: {
      referenceId: string;
      cultivarId: string;
      environmentId: string;
    },
    data: IEnvironmentData
  ) => {
    const referenceService = new ReferenceService();

    const response = await referenceService.updateEnvironment(entities, data);
    if (!response.success) {
      toast.error(response.message);
      return false;
    }

    window.location.reload();
    return true;
  };

  const handleUpdateConstant = async (
    constantId: string,
    data: { value: number }
  ) => {
    const constantService = new ConstantService();

    const response = await constantService.update(constantId, data.value);

    if (!response.success) {
      toast.error(response.message);
      return false;
    }
    window.location.reload();
    return true;
  };

	return {
		loading,
		countries,
		constantsFormData,
		environmentFormData,
		referenceFormData,
		references,
		createCustomBiome,
		handleConstantChange,
		handleEnvironmentChange,
		handleReferenceChange,
		handleCreateReference,
		handleUpdateReference,
		handleEnvironmentUpdate,
		handleUpdateConstant,
	};
};

export default useConstantForm;
