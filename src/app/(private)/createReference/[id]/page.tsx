"use client";

import "@/styles/form/form.css";
import "@/styles/home/login.css";

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";
import NavButton from "@/components/layout/navigationButton";
import CustomSelect from "@/components/layout/customSelect";
import {
  typeSelectOptions,
  climateSelectOptions,
  irrigationSelectOptions,
  cultivationSystemSelectOptions,
  biomeSelectOptions,
  soilSelectOptions,
} from "@/utils/selectOptions";
import useConstantForm from "@/hooks/useConstantForm";

import styles from "@/styles/constant/createConstant.module.css";
import { PPL_Constants } from "@/types/conversionFactor";
import { useState } from "react";
import React from "react";
import { useParams } from "next/navigation";
import AutoCompleteTextInput from "@/components/forms/autoCompleteTextInput";
import { IEnvironmentData, IReferenceFormData } from "@/types/cultivarTypes";
import { toast } from "react-toastify";
import {
  filterOptionsTranlation,
  filterReferenceTranslation,
} from "@/utils/translationsOptions";

const CriarConstant = () => {
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

  console.log(constantsFormData);
  const [parteAtual, setParteAtual] = useState<number>(1);
  const camposEnvironment: (keyof IEnvironmentData)[] = [
    "climate",
    "biome",
    "country",
    "cultivationSystem",
    "soil",
    "irrigation",
  ];
  const camposReference: (keyof IReferenceFormData)[] = ["title", "comment"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parteAtual === 1) {
      setParteAtual(2);
    } else {
      await handleCreateReference(id);
    }
  };

  return (
    <Layout>
      <div className={styles.createConstant}>
        <div className="form-title">
          <h2 className="tittle-login">Cadastrar Referência</h2>
          <div className={styles.pageHeaderList}>
            <div
              className={
                parteAtual === 1 ? styles.activeStep : styles.inactiveStep
              }
            >
              <h5>Informações Básicas</h5>
            </div>
            <div
              className={
                parteAtual === 1 ? styles.inactiveStep : styles.activeStep
              }
            >
              <h5>Constantes</h5>
            </div>
          </div>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          {parteAtual === 1 && (
            <>
              <h3>Informações sobre a Referência</h3>

              <AutoCompleteTextInput
                label="Título"
                placeholder="Título da referência, EX: Livro X, Autor (2000)"
                handleOnChange={(e: string) =>
                  handleReferenceChange({ title: e })
                }
                type="text"
                value={referenceFormData.title ?? ""}
                suggestions={references}
                disclaimer="Referências já cadastradas no banco"
              />

              <InputDefault
                classe="form-input-boxConst"
                label="Observações"
                placeholder="Observações sobre a referência, EX: Retirado da página Y"
                onChange={(e) =>
                  handleReferenceChange({ comment: e.target.value })
                }
                type="text"
                value={referenceFormData.comment ?? ""}
              />

              <div className="container-2-column">
                <CustomSelect
                  type="form"
                  label="Clima"
                  options={climateSelectOptions}
                  placeholder="Selecione o clima"
                  onChange={(value) =>
                    handleEnvironmentChange({ climate: value })
                  }
                  value={environmentFormData.climate}
                  required
                />
                <CustomSelect
                  type="form"
                  label="Bioma"
                  placeholder="Selecione o Bioma"
                  options={biomeSelectOptions}
                  onChange={(value) =>
                    handleEnvironmentChange({ biome: value })
                  }
                  value={environmentFormData.biome}
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
                  onChange={(value) =>
                    handleEnvironmentChange({ country: value })
                  }
                  value={environmentFormData.country}
                  required
                />
                <CustomSelect
                  type="form"
                  label="Sistema de cultivo"
                  placeholder="Selecione o sistema de cultivo"
                  options={cultivationSystemSelectOptions}
                  onChange={(value) =>
                    handleEnvironmentChange({ cultivationSystem: value })
                  }
                  value={environmentFormData.cultivationSystem}
                  required
                />
              </div>

              <div className="container-2-column">
                <CustomSelect
                  type="form"
                  label="Solo"
                  placeholder="Selecione o Solo"
                  options={soilSelectOptions}
                  onChange={(value) => handleEnvironmentChange({ soil: value })}
                  value={environmentFormData.soil}
                  required
                />
                <CustomSelect
                  type="form"
                  label="Irrigação"
                  placeholder="Selecione a irrigação"
                  options={irrigationSelectOptions}
                  onChange={(value) =>
                    handleEnvironmentChange({ irrigation: value })
                  }
                  value={environmentFormData.irrigation}
                  required
                />
              </div>
              <div className={styles.formNavigation}>
                <NavButton
                  Url={`/cultivars/view/${id}`}
                  page="form"
                  text="Voltar"
                  type="voltar"
                />
                <Button
                  texto="Próximo"
                  classe="form-button"
                  disabled={loading}
                  tipo="button"
                  onclick={() => {
                    const environmentNaoPreenchido = camposEnvironment.filter(
                      (campo) => environmentFormData[campo] === undefined
                    );
                    const referenceNaoPreenchido = camposReference.filter(
                      (campo) =>
                        !referenceFormData[campo] ||
                        referenceFormData[campo]?.length < 3
                    );
                    if (
                      environmentNaoPreenchido.length > 0 ||
                      referenceNaoPreenchido.length > 0
                    ) {
                      const traducaoEnvironment = environmentNaoPreenchido.map(
                        (campo) => filterOptionsTranlation[campo] || campo
                      );
                      const traducaoReference = referenceNaoPreenchido.map(
                        (campo) => filterReferenceTranslation[campo] || campo
                      );
                      toast.error(
                        `Por favor preencha adequadamente os campos: ${traducaoReference.join(
                          ", "
                        )}, ${traducaoEnvironment.join(", ")}`
                      );
                      return;
                    } else {
                      setParteAtual(2);
                    }
                  }}
                />
              </div>
            </>
          )}
          {parteAtual === 2 && (
            <>
              <div className={styles.constantsWrapper}>
                {typeSelectOptions.map((constantType) => {
                  const constantKey = constantType.value as keyof PPL_Constants;
                  const constantValue = constantsFormData[constantKey] ?? 0;
                  return (
                    <div key={constantType.value}>
                      <InputDefault
                        classe="form-input-boxConst"
                        label={constantType.label}
                        placeholder="Digite o valor da referência"
                        onChange={(e) =>
                          handleConstantChange({
                            [constantKey]: Number(e.target.value),
                          })
                        }
                        type="number"
                        required
                        value={Number(constantValue).toString()}
                        min={0}
                        step="0.1"
                      />
                    </div>
                  );
                })}
              </div>
              <div className={styles.formNavigation}>
                <Button
                  texto="Voltar"
                  classe="form-button"
                  disabled={loading}
                  tipo="button"
                  onclick={() => setParteAtual(1)}
                />
                <Button
                  texto="Cadastrar"
                  classe="form-button"
                  disabled={loading}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default CriarConstant;
