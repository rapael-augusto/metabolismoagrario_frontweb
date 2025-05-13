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

interface PageParams {
  id: string;
}

const CriarConstant = ({ params }: { params: Promise<PageParams> }) => {
  const { id } = React.use(params);

  const {
    loading,
    references,
    countries,
    referenceFormData,
    constantsFormData,
    handleConstantChange,
    handleEnvironmentChange,
    handleReferenceChange,
    handleCreateReference,
  } = useConstantForm({ id });

  const [parteAtual, setParteAtual] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parteAtual === 1) {
      setParteAtual(2);
    } else {
      handleCreateReference(id);
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
        <form
          className="form-container"
          onSubmit={async () => await handleCreateReference(params.id)}
        >
          {parteAtual === 1 && (
            <>
              <h3>Informações sobre a Referência</h3>

              <InputDefault
                classe="form-input-boxConst"
                label="Título"
                placeholder="Título da referência, EX: Livro X, Autor (2000)"
                onChange={(e) => handleReferenceChange("title", e.target.value)}
                type="text"
                value={referenceFormData.title}
              />

              <InputDefault
                classe="form-input-boxConst"
                label="Observações"
                placeholder="Observações sobre a referência, EX: Retirado da página Y"
                onChange={(e) =>
                  handleReferenceChange("comment", e.target.value)
                }
                type="text"
                value={referenceFormData.comment ?? null}
              />

              <div className="container-2-column">
                <CustomSelect
                  type="form"
                  label="Clima"
                  options={climateSelectOptions}
                  placeholder="Selecione o clima"
                  onChange={(value) =>
                    handleEnvironmentChange("climate", value)
                  }
                  required
                />
                <CustomSelect
                  type="form"
                  label="Bioma"
                  placeholder="Selecione o Bioma"
                  options={biomeSelectOptions}
                  onChange={(value) => handleEnvironmentChange("biome", value)}
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
                    handleEnvironmentChange("country", value)
                  }
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
                  onclick={() => setParteAtual(2)}
                />
              </div>
            </>
          )}
          {parteAtual === 2 && (
            <>
              <div className={styles.constantsWrapper}>
                {typeSelectOptions.map((constantType) => {
                  const constant = constantsFormData.find(
                    (c) =>
                      c.type === (constantType.value as keyof PPL_Constants)
                  );
                  return (
                    <div key={constantType.value}>
                      <InputDefault
                        classe="form-input-boxConst"
                        label={constantType.label}
                        placeholder="Digite o valor da referência"
                        onChange={(e) =>
                          handleConstantChange(
                            constantType.value as keyof PPL_Constants,
                            Number(e.target.value)
                          )
                        }
                        type="number"
                        required
                        value={constant?.value ?? 0}
                        min={0}
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
                  onclick={() => setParteAtual(1)}
                />
                <Button
                  texto="Cadastrar"
                  classe="form-button"
                  disabled={loading}
                  onclick={() => handleCreateReference(id)}
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
