import CustomSelect from "@/components/layout/customSelect";
import Slide from "./slide";
import InputDefault from "@/components/forms/inputDefault";
import styles from "@/styles/calculator/index.module.css";
import { ChangeEvent, useContext } from "react";
import { dataCropsType } from "@/types/cropsTypes";
import { cultivarsData } from "@/types/cultivarTypes";
import { CalculatorContext } from "@/contexts/calculatorContext";

export default function InitialSlide() {
  const {
    area,
    crops,
    setArea,
    cultivars,
    selectedCrop,
    handleCropChange,
    cultivarId,
    harvestedProduction,
    setHarvestedProduction,
    handleCultivarChange,
  } = useContext(CalculatorContext);

  const handleAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArea(Number(e.target.value));
  };

  const cropsOptions = crops.map((crop) => ({
    label: crop.name,
    value: crop.id,
  }));

  const cultivarsOptions = cultivars.map((cultivar) => ({
    label: cultivar.name,
    value: cultivar.id,
  }));

  return (
    <Slide>
      <Slide.Header
        title="Calculadora"
        description="Escolha uma cultivar, forneça os dados necessários para que seja possível calcular."
      />
      <Slide.Main>
        <>
          <CustomSelect
            type="form"
            label="Cultura"
            value={selectedCrop}
            placeholder="Selecione uma cultura"
            options={cropsOptions}
            onChange={handleCropChange}
          />
          <CustomSelect
            type="form"
            label="Cultivar"
            value={cultivarId}
            placeholder="Selecione um cultivar"
            options={cultivarsOptions}
            onChange={handleCultivarChange}
          />
          <InputDefault
            type="number"
            label="Produção colhida"
            value={harvestedProduction}
            onChange={(e) => setHarvestedProduction(Number(e.target.value))}
            step="0.1"
            min={0}
            classe={styles.inputDefault}
            placeholder={""}
          />
          <InputDefault
            type="number"
            label="Área (ha)"
            value={area}
            step="0.1"
            min={0}
            onChange={handleAreaChange}
            classe={styles.inputDefault}
            placeholder={""}
          />
        </>
      </Slide.Main>
    </Slide>
  );
}
