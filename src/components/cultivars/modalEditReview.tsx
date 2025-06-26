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
import { toast } from "react-toastify";
import { IReferenceFormData } from "@/types/cultivarTypes";
import { filterOptionsTranlation, filterReferenceTranslation, typeTranslation } from "@/utils/translationsOptions";

interface FieldChange {
  field: string;
  oldValue: string;
  newValue: string;
}

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

  const translationAll: any = {
    Irrigation: "Irrigado",
    Dry: "Sequeiro",
    Organic: "Orgânico",
    Conventional: "Convencional",
    Agroecological: "Agroecológico",
    Clayey: "Argiloso",
    Sandy: "Arenoso",
    SandyClay: "Arenoargiloso",
    Other: "Outro",
  };

  const getTranslation = (value: unknown): string => {
    if (value === null || value === undefined) return String(value);
    const key = String(value);
    return translationAll[key] || key; 
  };

  const getChangedFields = (): FieldChange[] => {
  const changes: FieldChange[] = [];

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'empty';
    return getTranslation(value);
  };

  
  (Object.keys(referenceFormData) as Array<keyof typeof referenceFormData>).forEach(key => {
    const oldVal = initialValues.reference?.[key];
    const newVal = referenceFormData[key];
    if (oldVal !== newVal) {
      changes.push({
        field: String(filterReferenceTranslation[key]),
        oldValue: formatValue(oldVal),
        newValue: formatValue(newVal)
      });
    }
  });

  (Object.keys(environmentFormData) as Array<keyof typeof environmentFormData>).forEach(key => {
    const oldVal = initialValues.environment?.[key];
    const newVal = environmentFormData[key];
    if (oldVal !== newVal) {
      changes.push({
        field: String(filterOptionsTranlation[key]),
        oldValue: formatValue(oldVal),
        newValue: formatValue(newVal)
      });
    }
  });

  (Object.keys(constantsFormData) as Array<keyof typeof constantsFormData>).forEach(key => {
    const oldVal = initialValues.constants?.[key];
    const newVal = constantsFormData[key];
    if (oldVal !== newVal) {
      changes.push({
        field: String(typeTranslation[key]),
        oldValue: formatValue(oldVal),
        newValue: formatValue(newVal)
      });
    }
  });

  return changes;
};

const formatChangesToText = (changes: FieldChange[]): string => {
  if (changes.length === 0) return 'Sem campos alterados';
  
  return 'Campos alterados: ' + changes.map(change => 
    `${change.field}: de "${change.oldValue}" para "${change.newValue}"`
  ).join('; ') + ('.');
};


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

  const initialValues = reviewSelected ? {
    reference: mapToReferenceFormData(reviewSelected.reference),
    environment: mapToEnvironmentData({
        ...reviewSelected.Environment,
        country: reviewSelected.Environment.country.nome_pais,
      }),
    constants: reviewSelected.Constants.reduce((acc, current) => ({
      ...acc,
      [current.type]: current.value,
    }), {} as PPL_Constants),
  } : {};

  const handleSubmit = async () => {
    if (parteAtual < 2) {
      setParteAtual(2);
      return;
    }
    const changedFields = getChangedFields();
    const changesText = formatChangesToText(changedFields);

    const confirmed = await confirm({
      title: "Atualizar solicitação",
      message: changesText,
      variant: "warning",
    });

    if (!confirmed) return;

    const success = await handleUpdateReview(reviewSelected.id);
    if (success) {
      toast.success(`A solicitação foi atualizada com sucesso!`);
    } else {
      toast.error(`Algo de errado ocorreu, tente novamente ou contate o suporte.`);
    }
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
