import Slide from "./slide";
import InputDefault from "@/components/forms/inputDefault";
import styles from "@/styles/calculator/index.module.css";
import { PPL_Constants } from "@/types/conversionFactor";
import { typeTranslation } from "@/utils/translationsOptions";
import { useContext } from "react";
import { CalculatorContext } from "@/contexts/calculatorContext";

export default function ConstantsSlide() {
  const { updateConstantValue, constants } = useContext(CalculatorContext);

  const keys: (keyof PPL_Constants)[] = [
    "HARVEST_INDEX",
    "AERIAL_RESIDUE_INDEX",
    "PRODUCT_RESIDUE_INDEX",
    "PRODUCT_DRY_MATTER_FACTOR",
    "RESIDUE_DRY_MATTER_FACTOR",
    "BELOWGROUND_INDEX",
    "WEED_AERIAL_FACTOR",
    "WEED_BELOWGROUND_INDEX",
  ];

  return (
    <Slide>
      <Slide.Header
        title="Constantes"
        description="Algumas constantes podem ser carregadas através dos dados armazenados, complete ou altere alguma informação."
      ></Slide.Header>
      <Slide.Main>
        {keys.map((key, index) => {
          const typedKey = key as keyof PPL_Constants;
          const constant = constants[typedKey];
          const isReference = constant && !constant.personal;
          return (
            <div
              key={`${key}_wrapper`}
              className={`${styles.constantInputWrapper} ${
                isReference ? styles.referenceConstant : ""
              }`}
            >
              <InputDefault
                type="number"
                label={typeTranslation[typedKey]}
                value={constant ? Number(constant.value).toString() : 0}
                step="0.1"
                min={0}
                onChange={(e) => updateConstantValue(typedKey, e.target.value)}
                classe={styles.inputDefault}
                placeholder=""
              />
            </div>
          );
        })}
      </Slide.Main>
    </Slide>
  );
}
