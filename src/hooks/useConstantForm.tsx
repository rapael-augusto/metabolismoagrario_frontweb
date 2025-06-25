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
  IReviewUpdateData,
  TCultivarConstants,
} from "@/types/cultivarTypes";
import { ConstantService } from "@/services/constant";
import { useAuthContext } from "@/contexts/auth/authContext";

type ConstantEntry = { type: keyof PPL_Constants; value: number };

const useConstantForm = (params: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [references, setReferences] = useState<string[]>([]);
  const [constantsFormData, setConstantsFormData] = useState<PPL_Constants>({
    HARVEST_INDEX: 0,
    AERIAL_RESIDUE_INDEX: 0,
    PRODUCT_RESIDUE_INDEX: 0,
    PRODUCT_DRY_MATTER_FACTOR: 0,
    RESIDUE_DRY_MATTER_FACTOR: 0,
    BELOWGROUND_INDEX: 0,
    WEED_AERIAL_FACTOR: 0,
    WEED_BELOWGROUND_INDEX: 0,
  });
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
  
    const { user } = useAuthContext();

  useEffect(() => {
    if (params.id) {
      fetchCountries();
      fetchReferences();
    }
  }, [params.id]);

  const fetchCountries = async () => {
    if(user){
      try {
        setLoading(true);
        const service = new countriesService(null);
        const response = await service.listAll();
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os países:", error);
      }
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

  const handleConstantChange = (constants: Partial<PPL_Constants>) => {
    setConstantsFormData((prev) => ({
      ...prev,
      ...constants,
    }));
  };

  const handleEnvironmentChange = <
    K extends keyof IEnvironmentData
  >(environment: {
    [key in K]: IEnvironmentData[K];
  }) => {
    setEnvironmentFormData((prev) => ({ ...prev, ...environment }));
  };

  const handleReferenceChange = <
    K extends keyof IReferenceFormData
  >(reference: {
    [key in K]: IReferenceFormData[K];
  }) => {
    setReferenceFormData((prev) => ({ ...prev, ...reference }));
  };

  const convertConstantsToArray = (
    constants: PPL_Constants
  ): ConstantEntry[] => {
    return (Object.keys(constants) as Array<keyof PPL_Constants>).map(
      (type) => ({
        type,
        value: constants[type],
      })
    );
  };

  const handleCreateReference = async (cultivarId: string) => {
    const referenceService = new ReferenceService();
    const constantsArray = convertConstantsToArray(constantsFormData);

    const response = await referenceService.createReference(cultivarId, {
      constants: constantsArray,
      environment: environmentFormData,
      reference: referenceFormData,
    });

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    if(user?.role === "ADMIN"){
      toast.success(response.message);
    } else {
      toast.info("Sua solicitação de cadastro de referência foi criada!");
    }
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

  const handleUpdateReview = async (reviewId: string) => {
    const referenceService = new ReferenceService();

    const data: IReviewUpdateData = {
      constants: constantsFormData,
      environment: environmentFormData,
      reference: referenceFormData,
    };
    const response = await referenceService.updateReview(reviewId, data);

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

  const mapToReferenceFormData = (data: any): IReferenceFormData => {
    return {
      title: data?.title ?? null,
      comment: data?.comment ?? null,
    };
  };

  const mapToEnvironmentData = (data: any): IEnvironmentData => {
    return {
      climate: data.climate ?? null,
      biome: data.biome ?? null,
      customBiome: data.customBiome ?? null,
      irrigation: data.irrigation ?? null,
      country: data.country ?? null,
      soil: data.soil ?? null,
      customSoil: data.customSoil ?? null,
      cultivationSystem: data.cultivationSystem ?? null,
    };
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
    handleUpdateReview,
    mapToReferenceFormData,
    mapToEnvironmentData,
  };
};

export default useConstantForm;
