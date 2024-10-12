"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import CustomSelect from "@/components/layout/customSelect";
import { dataCropsType } from "@/types/cropsTypes";
import { cropsService } from "@/services/crops";
import { cultivarsData } from "@/types/cultivarTypes";
import { usePPLCalculator } from "@/app/hooks/usePPLCalculator";
import styles from "@/styles/calculator/index.module.css";
import NavButton from "../layout/navigationButton";
import InputDefault from "../forms/inputDefault";
import { typeTranslation } from "@/utils/translationsOptions";
import { Calculation } from "./calculation";

const Calculator = () => {
  const [crops, setCrops] = useState<dataCropsType[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [cultivars, setCultivars] = useState<cultivarsData[]>([]);
  const [cultivarId, setCultivarId] = useState<string>("");
  const [constants, setConstants] = useState<any[]>([]);
  const [area, setArea] = useState<number>(0);
  const [harvestedProduction, setHarvestedProduction] = useState<number>(0);
  const [cultivarScientificName, setCultivarScientificName] = useState<
    string | any
  >("");
  const [calculations, setCalculations] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("@token");
    if (token) {
      const cropsAPI = new cropsService(token);
      cropsAPI.list().then((response) => setCrops(response));
    }
  }, []);

  const handleCropChange = (selectedCrop: string) => {
    const cropId = selectedCrop;
    setSelectedCrop(cropId);

    if (cropId) {
      const token = sessionStorage.getItem("@token");
      if (token) {
        const cropsAPI = new cropsService(token);
        cropsAPI.findOne(cropId).then((response) => {
          if (response && response.cultivars) {
            setCultivars(response.cultivars);
            setCultivarId("");
            setCultivarScientificName(response.scientificName);
            setConstants([]);
            setArea(0);
            setHarvestedProduction(0);
            setCalculations(null);
          } else {
            console.error("Cultivares não encontradas");
          }
        });
      } else {
        console.error("Token não encontrado");
      }
    } else {
      setCultivars([]);
      setCultivarId("");
      setConstants([]);
      setArea(0);
      setHarvestedProduction(0);
      setCalculations(null);
    }
  };

  const handleCultivarChange = async (selectedCultivarId: string) => {
    setCultivarId(selectedCultivarId);
    const session = sessionStorage.getItem("@token");

    if (session) {
      const service = new cropsService(session);
      const response = await service.findOneCultivar(selectedCultivarId);
      if (response) {
        const convertedConstants = response.constants.map((constant: any) => ({
          type: constant.type,
          value: Number(constant.value),
        }));
        setConstants(convertedConstants);
      }
    }
  };

  const handleCalculate = () => {
    if (
      area > 0 &&
      harvestedProduction > 0 &&
      constants.length > 0 &&
      cultivarId
    ) {
      const calculator = usePPLCalculator({
        cultivar: { name: cultivarScientificName },
        constants: {
          HARVEST_INDEX:
            constants.find((constant) => constant.type === "HARVEST_INDEX")
              ?.value || 0,
          AERIAL_RESIDUE_INDEX:
            constants.find(
              (constant) => constant.type === "AERIAL_RESIDUE_INDEX"
            )?.value || 0,
          PRODUCT_RESIDUE_INDEX:
            constants.find(
              (constant) => constant.type === "PRODUCT_RESIDUE_INDEX"
            )?.value || 0,
          PRODUCT_DRY_MATTER_FACTOR:
            constants.find(
              (constant) => constant.type === "PRODUCT_DRY_MATTER_FACTOR"
            )?.value || 0,
          RESIDUE_DRY_MATTER_FACTOR:
            constants.find(
              (constant) => constant.type === "RESIDUE_DRY_MATTER_FACTOR"
            )?.value || 0,
          BELOWGROUND_INDEX:
            constants.find((constant) => constant.type === "BELOWGROUND_INDEX")
              ?.value || 0,
          WEED_AERIAL_FACTOR:
            constants.find((constant) => constant.type === "WEED_AERIAL_FACTOR")
              ?.value || 0,
          WEED_BELOWGROUND_INDEX:
            constants.find(
              (constant) => constant.type === "WEED_BELOWGROUND_INDEX"
            )?.value || 0,
        },
        area,
        harvestedProduction,
      });

      console.log("Constants:", constants);
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
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  const cropsOptions = crops.map((crop) => ({
    label: crop.name,
    value: crop.id,
  }));

  const cultivarsOptions = cultivars.map((cultivar) => ({
    label: cultivar.name,
    value: cultivar.id,
  }));

  const handleAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArea(Number(e.target.value));
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageButtonsWrapper}>
        <NavButton Url="/home" text={"Voltar"} type="voltar" page="list" />
      </div>
      <h2 className={styles.pageTitle}>Calculadora</h2>
      <main className={styles.container}>
        <div className={styles.inputGrid}>
          <div className={styles.inputLarge}>
            <CustomSelect
              type="form"
              label="Cultura"
              placeholder="Selecione uma cultura"
              options={cropsOptions}
              onChange={handleCropChange}
            />
          </div>

          <div>
            <CustomSelect
              type="form"
              label="Cultivar"
              placeholder="Selecione um cultivar"
              options={cultivarsOptions}
              onChange={handleCultivarChange}
            />
          </div>
          <div>
            <InputDefault
              type="number"
              label="Produção colhida"
              value={harvestedProduction}
              onChange={(e) => setHarvestedProduction(Number(e.target.value))}
              step="0.1"
              min={0}
              classe={""}
              placeholder={""}
            />
          </div>

          <div>
            <InputDefault
              type="number"
              label="Área (ha)"
              value={area}
              step="0.1"
              min={0}
              onChange={handleAreaChange}
              classe={""}
              placeholder={""}
            />
          </div>
        </div>

        {cultivarId && constants.length > 0 && (
          <div className={styles.infoContainer}>
            <h2>Constantes de {cultivarScientificName}</h2>
            <div className={styles.inputGrid}>
              {constants.map((constant, index) => (
                <InputDefault
                  key={constant.type}
                  type="number"
                  label={typeTranslation[constant.type]}
                  value={constant.value}
                  step="0.1"
                  min={0}
                  disabled
                  onChange={handleAreaChange}
                  classe={""}
                  placeholder={""}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.mainFooter}>
          <button onClick={handleCalculate} className={styles.submitButton}>
            Calcular
          </button>
        </div>
      </main>
      <div>
        {calculations && (
          <div className={styles.container}>
            <h2>Resultados</h2>
            <div className={styles.calculationsWrapper}>
              {Object.keys(calculations).map((calculation, index) => (
                <Calculation
                  key={calculation}
                  name={calculations[calculation].name}
                  result={calculations[calculation].result}
                  unity={calculations[calculation].unity}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
