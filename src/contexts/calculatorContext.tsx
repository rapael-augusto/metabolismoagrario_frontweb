import { dadosConstants } from "@/app/(public)/constant/[id]/page";
import { usePPLCalculator } from "@/hooks/usePPLCalculator";
import { cropsService } from "@/services/crops";
import { PPL_Constants } from "@/types/conversionFactor";
import { dataCropsType } from "@/types/cropsTypes";
import { Constant, cultivarsData, Reference } from "@/types/cultivarTypes";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { cultivarService } from "@/services/cultivar";

interface CalculatorProps {
  area: number;
  harvestedProduction: number;
  crops: dataCropsType[];
  cultivars: cultivarsData[];
  selectedCrop: string;
  cultivarId: string;
  constants: ConstantsMap;
  calculations: any;
  filterCriteria: Partial<dadosConstants>;
  filteredReferences: Reference[];
  loadingState: string;
  activeReferenceId: string | null;
  setActiveReferenceId: (id: string | null) => void;
  handleCropChange: (crop: string) => void;
  handleCultivarChange: (cultivar: string) => void;
  setArea: (area: number) => void;
  setHarvestedProduction: (production: number) => void;
  handleCalculate: () => void;
  updateFilter: (key: keyof dadosConstants, value?: string | number) => void;
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

interface IConstantValue {
  value: number;
  personal: boolean;
}

type ConstantsMap = {
  [K in keyof PPL_Constants]: IConstantValue;
};

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [cultivarScientificName, setCultivarScientificName] = useState<
    string | any
  >("");
  const [loadingState, setLoadingState] = useState("");
  const [area, setArea] = useState<number>(0);
  const [harvestedProduction, setHarvestedProduction] = useState<number>(0);
  const [crops, setCrops] = useState<dataCropsType[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [cultivars, setCultivars] = useState<cultivarsData[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [cultivarId, setCultivarId] = useState<string>("");
  const [constants, setConstants] = useState<ConstantsMap>({} as ConstantsMap);
  const [filterCriteria, setFilterCriteria] = useState<Partial<dadosConstants>>(
    {}
  );
  const [calculations, setCalculations] = useState<any>(null);
  const [activeReferenceId, setActiveReferenceId] = useState<string | null>(null);

  useEffect(() => {
    const cropsAPI = new cropsService();
    setLoadingState("CROPS");
    cropsAPI.list().then((response) => {
      setCrops(response);
      setLoadingState("");
    });
  }, []);

  const handleCropChange = async (cropId: string) => {
    setSelectedCrop(cropId);
    if (cropId !== "other") {
      setLoadingState("CULTIVAR");
      const cropsAPI = new cropsService();
      const response = await cropsAPI.findOne(cropId);
      if (response && response.cultivars) {
        setCultivars(response.cultivars);
        setCultivarId("");
        setCultivarScientificName(response.scientificName);
        setConstants({} as ConstantsMap);
        setArea(0);
        setHarvestedProduction(0);
        setCalculations(null);
        setLoadingState("");
      }
    }
  };

  const handleCultivarChange = async (cultivarId: string) => {
    setCultivarId(cultivarId);
    const service = new cultivarService();
    try {
      if (cultivarId === "other") {
        setReferences([]);
        return;
      }
      setLoadingState("REFERENCES");
      const data = await service.findOne(cultivarId);
      setReferences(data.references);
      setLoadingState("");
    } catch (error) {
      toast.error("Erro ao buscar dados da cultivar");
      console.error("Erro ao buscar cultivar:", error);
      return;
    }
  };

  const handleCalculate = () => {
    if (area > 0 && harvestedProduction > 0 && cultivarId) {
      const values: PPL_Constants = Object.fromEntries(
        Object.entries(constants).map(([key, val]) => [key, val?.value ?? 0])
      ) as PPL_Constants;

      const calculator = usePPLCalculator({
        cultivar: { name: cultivarScientificName },
        constants: values,
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

  const updateFilter = (key: keyof dadosConstants, value?: string | number) => {
    setFilterCriteria((prev: any) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const updateConstantValue = (
    key: keyof PPL_Constants,
    value: string | number
  ) => {
    if (isNaN(Number(value))) return toast.error("Você deve digitar um número");
    const newConstants = { ...constants };
    newConstants[key] = {
      value: Number(value),
      personal: true,
    };
    setConstants(newConstants);
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
        filterCriteria,
        filteredReferences,
        constants,
        loadingState,
        handleCropChange,
        handleCultivarChange,
        handleCalculate,
        setArea,
        setHarvestedProduction,
        updateFilter,
        updateConstantValue,
        selectConstants,
        activeReferenceId,
        setActiveReferenceId,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
