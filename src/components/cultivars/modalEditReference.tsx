"use client";
import { useEffect, useState } from "react";
import Modal from "../modal";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import styles from "@/styles/constant/createConstant.module.css";
import AutoCompleteTextInput from "../forms/autoCompleteTextInput";
import { useParams } from "next/navigation";
import {
  typeSelectOptions,
  climateSelectOptions,
  irrigationSelectOptions,
  cultivationSystemSelectOptions,
  biomeSelectOptions,
  soilSelectOptions,
} from "@/utils/selectOptions";
import useConstantForm from "@/hooks/useConstantForm";
import { IEnvironmentData, IReferenceFormData } from "@/types/cultivarTypes";
import { EnvironmentData } from "@/types/cultivarTypes";
import { PPL_Constants } from "@/types/conversionFactor";
import InputDefault from "../forms/inputDefault";
import CustomSelect from "../layout/customSelect";
import { typeTranslation } from "@/utils/translationsOptions";

interface props {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  environmentData: EnvironmentData;
  title: string;
  comment?: string | null;
}

export default function ModalEditReference({
  visible,
  handleVisible,
  environmentData,
  title,
  comment,
}: props) {
  const [parteAtual, setParteAtual] = useState<number>(1);

  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const {
    loading,
    references,
    countries,
    referenceFormData,
    constantsFormData,
    environmentFormData,
    handleConstantChange,
    handleEnvironmentChange,
    handleReferenceChange,
    handleCreateReference,
  } = useConstantForm({ id });
  const camposEnvironment: (keyof IEnvironmentData)[] = [
    "climate",
    "biome",
    "country",
    "cultivationSystem",
    "soil",
    "irrigation",
  ];
  const camposReference: (keyof IReferenceFormData)[] = ["title", "comment"];

  const handleSubmit = () => {
    if (parteAtual === 1) {
      setParteAtual(2);
    } else {
      console.log("Damn it's not working (T-T)");
      //await handleEditReference(referenceId);
    }
  };

  const handleBack = () => {
    if (parteAtual === 2) {
      setParteAtual(1);
    } else {
      handleVisible(false);
    }
  };

  useEffect(() => {
    if(!visible){
        setParteAtual(1);
    }
  }, [visible])

  return (
    <Modal isOpen={visible} size="lg">
      <Modal.Header
        title={
          parteAtual === 1
            ? "Editar Referência - Informações Básicas"
            : "Editar Referência - Constantes"
        }
        description={
          parteAtual === 1
            ? "Altere as informações da referência."
            : "Altere as constantes da referência."
        }
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        {parteAtual === 1 && (
          <>
            <AutoCompleteTextInput
              label="Título"
              placeholder="Título da referência, EX: Livro X, Autor (2000)"
              handleOnChange={(e: string) => handleReferenceChange("title", e)}
              type="text"
              value={title ?? ""}
              suggestions={references}
              disclaimer="Referências já cadastradas no banco"
            />

            <InputDefault
              classe="form-input-boxConst"
              label="Observações"
              placeholder="Observações sobre a referência, EX: Retirado da página Y"
              onChange={(e) => handleReferenceChange("comment", e.target.value)}
              type="text"
              value={comment ?? ""}
            />

            <div className="container-2-column">
              <CustomSelect
                type="form"
                label="Clima"
                options={climateSelectOptions}
                placeholder="Selecione o clima"
                onChange={(value) => handleEnvironmentChange("climate", value)}
                value={environmentData.environment.climate || ""}
                required
              />
              <CustomSelect
                type="form"
                label="Bioma"
                placeholder="Selecione o Bioma"
                options={biomeSelectOptions}
                onChange={(value) => handleEnvironmentChange("biome", value)}
                value={environmentData.environment.biome || ""}
                required
              />
            </div>

            <div className="container-2-column">
              <CustomSelect
                type="form"
                label="País"
                placeholder="Selecione o País"
                options={countries.map((country) => ({
                  value: country.nome_pais,
                  label: country.nome_pais,
                }))}
                onChange={(value) => handleEnvironmentChange("country", value)}
                value={environmentData.environment.countryName || ""}
                required
              />
              <CustomSelect
                type="form"
                label="Sistema de cultivo"
                placeholder="Selecione o sistema de cultivo"
                options={cultivationSystemSelectOptions}
                onChange={(value) =>
                  handleEnvironmentChange("cultivationSystem", value)
                }
                value={environmentData.environment.cultivationSystem || ""}
                required
              />
            </div>

            <div className="container-2-column">
              <CustomSelect
                type="form"
                label="Solo"
                placeholder="Selecione o Solo"
                options={soilSelectOptions}
                onChange={(value) => handleEnvironmentChange("soil", value)}
                value={environmentData.environment.soil || ""}
                required
              />
              <CustomSelect
                type="form"
                label="Irrigação"
                placeholder="Selecione a irrigação"
                options={irrigationSelectOptions}
                onChange={(value) =>
                  handleEnvironmentChange("irrigation", value)
                }
                value={environmentData.environment.irrigation || ""}
                required
              />
            </div>
          </>
        )}
        {parteAtual === 2 && (
            <>
              <div className={styles.constantsWrapper}>
                {environmentData.constants?.map((constant) => (
                  <div key={constant.type}>
                    <InputDefault
                      classe="form-input-boxConst"
                      label={typeTranslation[constant.type]}
                      placeholder="Digite o valor da referência"
                      onChange={(e) =>
                        handleConstantChange(
                          constant.type as keyof PPL_Constants,
                          Number(e.target.value)
                        )
                      }
                      type="number"
                      required
                      value={
                        constant.value?.toString() ?? ""
                      }
                      min={0}
                      step="0.1"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
      </Modal.Main>
      <Modal.Footer
        cancelText="Voltar"
        submitText={parteAtual === 1 ? "Próximo" : "Atualizar"}
        onCancel={handleBack}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
