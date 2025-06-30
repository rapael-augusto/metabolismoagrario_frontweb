"use client";

import "@/styles/crops/pageCrops.css";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import InputDefault from "@/components/forms/inputDefault";
import useCropsForm from "@/hooks/useCropsForm";
import { useEffect, useState } from "react";
import { cropsService } from "@/services/crops";
import Modal from "../modal";
import { filterTextInput } from "@/utils/filterTextInput";
import { toast } from "react-toastify";

interface ModalProps {
  id: string;
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
}

const ModalEditCrops = ({ id, visible, handleVisible }: ModalProps) => {
  const { name, setName, scientificName, setScientificName, editarCrop } =
    useCropsForm();
  const [isLoading, setIsLoading] = useState(true);
  const [originalName, setOriginalName] = useState("");
  const [originalScientificName, setOriginalScientificName] =
    useState("");

  const loadCropData = async () => {
    if (id && typeof id === "string") {
      const service = new cropsService();
      const crop = await service.findOne(id);
      if (crop) {
        setName(crop.name);
        setScientificName(crop.scientificName);
		setOriginalName(crop.name);
		setOriginalScientificName(crop.scientificName);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCropData();
  }, [id]);

  function validate() {
    const lengthErrors = [];
    if (name.length < 3) lengthErrors.push("Nome");
    if (scientificName.length < 3) lengthErrors.push("Nome Científico");

    if (lengthErrors.length > 0) {
      toast.error(
        `${lengthErrors.join(" e ")} devem conter pelo menos 3 letras!`
      );
      return false;
    }

    const changeErrors = [];
    if (name === originalName) changeErrors.push("Nome");
    if (scientificName === originalScientificName)
      changeErrors.push("Nome Científico");

    if (changeErrors.length > 1) {
      toast.error("Pelo menos um campo deve ser alterado!");
      return false;
    }

    return true;
  }

  const handleEditCrop = async () => {
    if (validate()) {
      if (id && typeof id === "string") {
        await editarCrop(id);
      }
    }
    return;
  };

  return (
    <Modal isOpen={visible} size="md">
      <Modal.Header
        title="Editar Cultura"
        description="Altere as informações da cultura."
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        {!isLoading && (
          <>
            <InputDefault
              classe="form-input-box"
              label="Nome"
              placeholder="Nome"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(filterTextInput(e.target.value))
              }
              type={"text"}
              editButton
            />

            <InputDefault
              classe="form-input-box"
              label="Nome Científico"
              placeholder="Nome Científico"
              value={scientificName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setScientificName(filterTextInput(e.target.value))
              }
              type={"text"}
              editButton
            />
          </>
        )}
      </Modal.Main>
      <Modal.Footer
        cancelText="Cancelar"
        submitText="Atualizar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleEditCrop}
      />
    </Modal>
  );
};

export default ModalEditCrops;
