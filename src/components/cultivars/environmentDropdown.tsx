"use client";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import { useState, useContext, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ConstantsDropdown from "./constantsDropdown";
import { EnvironmentData } from "@/types/cultivarTypes";
import { selectContext } from "@/app/(public)/cultivars/view/[id]/page";
import { bookContext } from "./referenceDropdown";
import {
  cultivationSystemTranslation,
  irrigationTranslation,
  soilTranslation,
} from "@/utils/translationsOptions";
import ModalEditReference from "./modalEditReference";

export default function EnvironmentDropdown({
  environmentData,
  index,
  title,
  comment,
}: {
  environmentData: EnvironmentData;
  index: number;
  title: string;
  comment: string | null | undefined;
}) {

  const {isBookSelected, toggleEnvironmentSelection} = useContext(bookContext);
  const enterSelectingState = useContext(selectContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEnvironmentSelected, setIsEnvironmentSelected] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  useEffect(() => {
    if(isBookSelected && !isEnvironmentSelected){
      setIsEnvironmentSelected(true);
      toggleEnvironmentSelection(index, true);
    }
  }, [isBookSelected]);

  useEffect(() => {
    setIsEnvironmentSelected(false);
  }, [enterSelectingState]);

  const handleEditVisible = (isVisible: boolean) => {
		setModalEditVisible(isVisible);
	}

  const handleEdit = () => {
		setModalEditVisible(true);
	}
  
  const handleEnvironmentSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEnvironmentSelected(!isEnvironmentSelected);
    toggleEnvironmentSelection(index, !isEnvironmentSelected);
  };

  return (
    <div className={`${!isEnvironmentSelected ? Styles.referenceDropdown : Styles.referenceDropdownRed} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={Styles.toggleButton}
      >
        <div className={Styles.checkboxContainer}>
          {enterSelectingState ? <input type="checkbox" className={Styles.checkbox} onChange={(e) => e.stopPropagation()} onClick={handleEnvironmentSelection} checked={isEnvironmentSelected} readOnly /> : null}
          Ambiente {index + 1}
        </div>
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
          {enterSelectingState ? null : <button className={Styles.editButton} onClick={() => handleEdit()}>Editar Referência</button>}
        </div>
      )}
      {environmentData && (
        <ModalEditReference
          visible={modalEditVisible}
          handleVisible={handleEditVisible}
          environmentData={environmentData}
          title={title}
          comment={comment}
        />
      )}
    </div>
  );
}