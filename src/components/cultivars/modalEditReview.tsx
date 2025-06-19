import InputDefault from "@/components/forms/inputDefault";
import Modal from "../modal";
import { useEffect, useState } from "react";
import CustomSelect from "../layout/customSelect";
import useConstantForm from "@/hooks/useConstantForm";
import AutoCompleteTextInput from "../forms/autoCompleteTextInput";
import {
  biomeSelectOptions,
  climateSelectOptions,
  cultivationSystemSelectOptions,
  irrigationSelectOptions,
  soilSelectOptions,
  typeSelectOptions,
} from "@/utils/selectOptions";
import { CultivarReviewType } from "@/app/(private)/reviews/page";
import styles from "@/styles/constant/createConstant.module.css";
import '@/styles/form/form.css'
import { PPL_Constants } from "@/types/conversionFactor";
import { useConfirm } from "@/contexts/confirmationModal/confirmationModalContext";

export default function ModalEditReview({
  visible,
  handleVisible,
  reviewSelected,
}: {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  reviewSelected: CultivarReviewType;
}) {
  if (!reviewSelected) return null;
  const confirm = useConfirm();

  const [parteAtual, setParteAtual] = useState(1);
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
    handleUpdateReview,
    mapToReferenceFormData,
    mapToEnvironmentData,
  } = useConstantForm({ id: reviewSelected.reference.id });

  useEffect(() => {
    if (reviewSelected) {
      const mappedReferenceData = mapToReferenceFormData(
        reviewSelected.reference
      );
      const mappedEnvironmentData = mapToEnvironmentData({
        ...reviewSelected.Environment,
        country: reviewSelected.Environment.country.nome_pais,
      });

      const constantsData = reviewSelected.Constants.reduce((acc, current) => {
        return {
          ...acc,
          [current.type]: current.value,
        };
      }, {} as PPL_Constants);

      handleReferenceChange({
        ...mappedReferenceData,
      });
      handleEnvironmentChange({ ...mappedEnvironmentData });
      handleConstantChange(constantsData);
    }
  }, [reviewSelected]);

  const handleSubmit = async () => {
    if (parteAtual < 2) {
      setParteAtual(2);
      return;
    }

    const confirmed = await confirm({
      title: "Atualizar solicitação",
      message: "Reveja o que foi alterado: ",
      variant: "warning",
    });

    if (!confirmed) return;

    await handleUpdateReview(reviewSelected.id);
  };

  const handleBack = () => {
    setParteAtual(1);
  };

  return loading ? (
    <>
      <p>carregando...</p>
    </>
  ) : (
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
              handleOnChange={(e: string) =>
                handleReferenceChange({ title: e })
              }
              type="text"
              value={referenceFormData.title ?? ""}
              suggestions={references}
              disclaimer="Referências já cadastradas no banco"
              disabled={reviewSelected.reference.status !== "CHANGES_REQUESTED"}
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
              disabled={reviewSelected.reference.status !== "CHANGES_REQUESTED"}
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
                value={environmentFormData.climate || ""}
                required
              />
              <CustomSelect
                type="form"
                label="Bioma"
                placeholder="Selecione o Bioma"
                options={biomeSelectOptions}
                onChange={(value) => handleEnvironmentChange({ biome: value })}
                value={environmentFormData.biome || ""}
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
                value={environmentFormData.country || ""}
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
                value={environmentFormData.cultivationSystem || ""}
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
                value={environmentFormData.soil || ""}
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
                value={environmentFormData.irrigation || ""}
                required
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
