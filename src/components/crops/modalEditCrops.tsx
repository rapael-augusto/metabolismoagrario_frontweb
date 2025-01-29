"use client";

import "@/styles/crops/pageCrops.css";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import InputDefault from "@/components/forms/inputDefault";
import useCropsForm from "@/app/hooks/useCropsForm";
import { useEffect, useState } from "react";
import { cropsService } from "@/services/crops";
import Modal from "../modal";

interface ModalProps {
  id: string;
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
}

const ModalEditCrops = ({ id, visible, handleVisible }: ModalProps) => {
  const { name, setName, scientificName, setScientificName, editarCrop } =
    useCropsForm();
  const [isLoading, setIsLoading] = useState(true);
  const loadCropData = async () => {
    if (id && typeof id === "string") {
      const service = new cropsService(sessionStorage.getItem("@token"));
      const crop = await service.findOne(id);
      if (crop) {
        setName(crop.name);
        setScientificName(crop.scientificName);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCropData();
  }, [id]);

  const handleEditCrop = async () => {
    if (id && typeof id === "string") {
      await editarCrop(id);
    }
  };

  return (
    <Modal isOpen={visible} size="md">
      <Modal.Header
        title="Editar cultura"
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
                setName(e.target.value)
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
                setScientificName(e.target.value)
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
