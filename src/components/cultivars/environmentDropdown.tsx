"use client";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ConstantsDropdown from "./constantsDropdown";
import { EnvironmentData } from "@/types/cultivarTypes";
import {
  cultivationSystemTranslation,
  irrigationTranslation,
  soilTranslation,
} from "@/utils/translationsOptions";

export default function EnvironmentDropdown({
  environmentData,
  index,
}: {
  environmentData: EnvironmentData;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={Styles.toggleButton}
      >
        Ambiente {index + 1}
        {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className={Styles.content}>
          <div className={Styles.characteristicsGrid}>
            <div className={Styles.characteristicCard}>
              <strong>País:</strong>{" "}
              {environmentData.environment.countryName || "Não informado"}
            </div>
            <div className={Styles.characteristicCard}>
              <strong>Clima:</strong>{" "}
              {environmentData.environment.climate || "Não informado"}
            </div>
            <div className={Styles.characteristicCard}>
              <strong>Bioma:</strong>{" "}
              {environmentData.environment.biome || "Não informado"}
            </div>
            {environmentData.environment.customBiome && (
              <div className={Styles.characteristicCard}>
                <strong>Bioma Personalizado:</strong>{" "}
                {environmentData.environment.customBiome || "Não informado"}
              </div>
            )}
            <div className={Styles.characteristicCard}>
              <strong>Irrigação:</strong>{" "}
              {(environmentData.environment.irrigation &&
                irrigationTranslation[
                  environmentData.environment.irrigation
                ]) ||
                "Não informado"}
            </div>
            <div className={Styles.characteristicCard}>
              <strong>Solo:</strong>{" "}
              {(environmentData.environment.soil &&
                soilTranslation[environmentData.environment.soil]) ||
                "Não informado"}
            </div>
            {environmentData.environment.customSoil && (
              <div className={Styles.characteristicCard}>
                <strong>Solo Personalizado:</strong>{" "}
                {environmentData.environment.customSoil || "Não informado"}
              </div>
            )}
            <div className={Styles.characteristicCard}>
              <strong>Sistema de Cultivo:</strong>{" "}
              {(environmentData.environment.cultivationSystem &&
                cultivationSystemTranslation[
                  environmentData.environment.cultivationSystem
                ]) ||
                "Não informado"}
            </div>
          </div>
          <ConstantsDropdown
            key={`${environmentData.environment.id}_constants`}
            constants={environmentData.constants}
          />
        </div>
      )}
    </div>
  );
}
