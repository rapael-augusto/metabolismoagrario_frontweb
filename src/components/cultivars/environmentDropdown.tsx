"use client";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConstantsDropdown from "./constantsDropdown";
import { EnvironmentData } from "@/types/cultivarTypes";
import {
  cultivationSystemTranslation,
  irrigationTranslation,
  soilTranslation,
} from "@/utils/translationsOptions";
import ModalEditReferenceTitle from "./modalEditReferenceTitle";
import { ReferenceService } from "@/services/reference";
import ModalDeleteReference from "./modalDeleteReference";
import ModalEditEnvironment from "./modalEditEnvironment";

export default function EnvironmentDropdown({
  environmentData,
  index,
  referenceId,
  cultivarId,
}: {
  environmentData: EnvironmentData;
  index: number;
  referenceId: string;
  cultivarId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const handleEditVisible = (isVisible: boolean) => {
    setModalEditVisible(isVisible);
  };

  const handleDeleteVisible = (isVisible: boolean) => {
    setModalDeleteVisible(isVisible);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalEditVisible(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalDeleteVisible(true);
  };

  return (
    <div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={Styles.toggleButton}
      >
        <div className={Styles.headerContainer}>
          Ambiente {index + 1}
          <div className={Styles.buttonsContainer}>
            <span
              className={Styles.actionEditButton}
              onClick={handleEdit}
              title={"Editar Ambiente"}
            >
              <FaEdit />
            </span>
            <span
              className={Styles.actionDeleteButton}
              onClick={handleDelete}
              title={"Deletar Ambiente"}
            >
              <FaTrash />
            </span>
          </div>
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
            referenceId={referenceId}
          />
        </div>
      )}
      {environmentData && (
        <>
          <ModalEditEnvironment
            visible={modalEditVisible}
            handleVisible={handleEditVisible}
            data={{
              environmentId: environmentData.environment.id,
              referenceId: environmentData.id,
              cultivarId: cultivarId,
              climate: environmentData.environment.climate ?? undefined,
              biome: environmentData.environment.biome ?? undefined,
              customBiome: environmentData.environment.customBiome ?? null,
              irrigation: environmentData.environment.irrigation ?? undefined,
              country: environmentData.environment.countryName ?? undefined,
              soil: environmentData.environment.soil ?? undefined,
              customSoil: environmentData.environment.customSoil ?? null,
              cultivationSystem:
                environmentData.environment.cultivationSystem ?? undefined,
            }}
          />
          <ModalDeleteReference
            visible={modalDeleteVisible}
            handleVisible={handleDeleteVisible}
            environmentId={environmentData.environment.id}
            referenceId={referenceId}
          />
        </>
      )}
    </div>
  );
}
