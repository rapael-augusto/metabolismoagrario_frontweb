import { CropsParams } from "@/types/cropsTypes";
import { CultivarParams } from "@/types/cultivarTypes";
import { PPL_Constants } from "@/types/conversionFactor";
import { typeTranslation } from "@/utils/translationsOptions";

interface PPlCalculationsReturn {
  result: number;
  unity: string;
  formula: string;
  name: string;
  calculation: string;
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
    const result = harvestedProduction / area;
    const formula = `Produção colhida / área`;
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
    };
  };

  const getTotalAerialBiomass = (): PPlCalculationsReturn => {
    const productivity = getProductivity();
    const result = productivity.result / constants.HARVEST_INDEX;
    const formula = `${productivity.name} / ${"HARVEST_INDEX"}`;
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
    };
  };

  const getResidueBiomass = (): PPlCalculationsReturn => {
    const totalAerialBiomass = getTotalAerialBiomass();
    const result = constants.AERIAL_RESIDUE_INDEX * totalAerialBiomass.result;
    const formula = `${"AERIAL_RESIDUE_INDEX"} * ${totalAerialBiomass.name}`;
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
    };
  };

  const getDryMatterBiomass = (): PPlCalculationsReturn => {
    const productivity = getProductivity();
    const result = productivity.result * constants.PRODUCT_DRY_MATTER_FACTOR;
    const formula = `${productivity.name} * ${"PRODUCT_DRY_MATTER_FACTOR"}`;
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
    };
  };

  const getResidueDryMatterBiomass = (): PPlCalculationsReturn => {
    const residueBiomass = getResidueBiomass();
    const result = residueBiomass.result * constants.RESIDUE_DRY_MATTER_FACTOR;
    const formula = `${residueBiomass.name} * ${"RESIDUE_DRY_MATTER_FACTOR"}`;
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
    };
  };

  const getDryMatterBiomassTotal = (): PPlCalculationsReturn => {
    const dryMatterBiomass = getDryMatterBiomass();
    const residueDryMatterBiomass = getResidueDryMatterBiomass();
    const result = dryMatterBiomass.result + residueDryMatterBiomass.result;
    const formula = `${dryMatterBiomass.name} + ${residueDryMatterBiomass.name}`;
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
    };
  };

  return {
    getProductivity,
    getTotalAerialBiomass,
    getResidueBiomass,
    getDryMatterBiomass,
    getResidueDryMatterBiomass,
    getDryMatterBiomassTotal
  };
};
