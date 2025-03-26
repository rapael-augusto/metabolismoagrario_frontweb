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

interface Props {
  params: { id: string };
}

const CriarConstant = ({ params }: Props) => {
  const {
    countries,
    referenceFormData,
    constantsFormData,
    handleConstantChange,
    handleEnvironmentChange,
    handleReferenceChange,
    handleCreateReference,
  } = useConstantForm(params);

  return (
    <Layout>
      <div className={styles.createConstant}>
        <div className="form-title">
          <h2 className="tittle-login">Cadastrar Referência</h2>
        </div>
        <form
          className="form-container"
          onSubmit={() => handleCreateReference(params.id)}
        >
          <h3>Informações sobre a Referência</h3>
          <div className={styles.constantsWrapper}>
            {typeSelectOptions.map((constantType) => {
              const constant = constantsFormData.find(
                (c) => c.type === (constantType.value as keyof PPL_Constants)
              );
              return (
                <div key={constantType.value}>
                  <p>{constantType.label}</p>
                  <InputDefault
                    classe="form-input-boxConst"
                    label="Valor"
                    placeholder="Digite o valor da referência"
                    onChange={(e) =>
                      handleConstantChange(
                        constantType.value as keyof PPL_Constants,
                        Number(e.target.value)
                      )
                    }
                    type="number"
                    required
                    value={constant?.value ?? ""}
                    min={0}
                  />
                </div>
              );
            })}
          </div>

          <div className="container-2-column">
            <CustomSelect
              type="form"
              label="Clima"
              options={climateSelectOptions}
              placeholder="Selecione o clima"
              onChange={(value) => handleEnvironmentChange("climate", value)}
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
              onChange={(value) => handleEnvironmentChange("country", value)}
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
              onChange={(value) => handleEnvironmentChange("irrigation", value)}
              required
            />
          </div>

          <InputDefault
            classe="form-input-boxConst"
            label="Referência"
            placeholder="Título da referência, EX: Livro X, Autor (2000)"
            onChange={(e) => handleReferenceChange("title", e.target.value)}
            type="text"
            value={referenceFormData.title}
          />

          <InputDefault
            classe="form-input-boxConst"
            label="Observações"
            placeholder="Observações sobre a referência, EX: Retirado da página Y"
            onChange={(e) => handleReferenceChange("comment", e.target.value)}
            type="text"
            value={referenceFormData.comment ?? null}
          />

          <div className="footer-formConst">
            <NavButton
              Url={`/constant/${params.id}`}
              page="form"
              text="Voltar"
              type="voltar"
            />
            <Button texto="Cadastrar" classe="form-button" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CriarConstant;
