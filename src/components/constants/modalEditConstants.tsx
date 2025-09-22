"use client";
import { useState } from "react";
import Modal from "../modal";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import Styles from "@/styles/constant/createConstant.module.css";
import { useParams } from "next/navigation";
import useConstantForm from "@/hooks/useConstantForm";
import { Constant, IReferenceFormData } from "@/types/cultivarTypes";
import InputDefault from "../forms/inputDefault";
import { typeTranslation } from "@/utils/translationsOptions";
import { PPL_Constants } from "@/types/conversionFactor";
import { toast } from "react-toastify";

interface props {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  data: Constant[];
  referenceId: string;
}

export default function ModalEditConstants({
  visible,
  handleVisible,
  data,
  referenceId,
}: props) {
  const [constantsSelected, setConstantsSelected] = useState<Constant[]>(data);

  const id = referenceId;
  const { handleConstantChange, handleUpdateConstant } = useConstantForm({
    id,
  });

  const updateConstant = (id: string, value: number) => {
    setConstantsSelected((prev) =>
      prev.map((constant) =>
        constant.id === id ? { ...constant, value: value } : constant
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const updatedConstants = constantsSelected.filter(
        (constant: Constant) => {
          const originalConstant = data.find(
            (c: Constant) => c.id === constant.id
          );
          return originalConstant && originalConstant.value !== constant.value;
        }
      );

      if (updatedConstants.length === 0) {
        toast.info(`Nenhuma constante foi alterada`);
        return;
      }

      await Promise.all(
        updatedConstants.map((constant) =>
          handleUpdateConstant(constant.id, { value: constant.value })
        )
      );

      toast.success("Constantes atualizadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar. Tente novamente.");
    }
  };

  return (
    <Modal isOpen={visible} size="lg">
      <Modal.Header
        title="Editar Constantes"
        description=""
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        <div className={Styles.constantsWrapper}>
          {Array.isArray(constantsSelected)
            ? constantsSelected.map((constant) => (
                <div key={constant.id} className={Styles.constantsContainer}>
                  <InputDefault
                    classe="form-input-boxConst"
                    label={typeTranslation[constant.type]}
                    placeholder="Digite o valor da referência"
                    onChange={(e) =>
                      updateConstant(constant.id, Number(e.target.value))
                    }
                    type="number"
                    required
                    value={constant.value}
                    min={0}
                    step="0.1"
                    maxWidth={35}
                  />
                </div>
              ))
            : null}
        </div>
      </Modal.Main>
      <Modal.Footer
        cancelText="Cancelar"
        submitText="Atualizar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
