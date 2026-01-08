import CustomSelect from "@/components/layout/customSelect";
import Slide from "./slide";
import InputDefault from "@/components/forms/inputDefault";
import styles from "@/styles/calculator/index.module.css";
import { ChangeEvent, useContext } from "react";
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
    loadingState,
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

  const otherValue = { label: "Outro", value: "other" };

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
            options={[otherValue, ...cropsOptions]}
            onChange={handleCropChange}
            required
            disabled={loadingState === "CROPS"}
          />
          <CustomSelect
            type="form"
            label="Cultivar"
            value={cultivarId}
            placeholder="Selecione um cultivar"
            options={[otherValue, ...cultivarsOptions]}
            onChange={handleCultivarChange}
            required
            disabled={loadingState === "CULTIVAR"}
          />
          <InputDefault
            type="number"
            label="Área (ha)"
            value={Number(area).toString()}
            step="0.001"
            min={0}
            onChange={handleAreaChange}
            classe={styles.inputDefault}
            placeholder={""}
            required
          />
          <InputDefault
            type="number"
            label="Produção colhida (t)"
            value={Number(harvestedProduction).toString()}
            onChange={(e) => setHarvestedProduction(Number(e.target.value.toString()))}
            step="0.001"
            min={0}
            classe={styles.inputDefault}
            placeholder={""}
            required
          />
        </>
      </Slide.Main>
    </Slide>
  );
}
