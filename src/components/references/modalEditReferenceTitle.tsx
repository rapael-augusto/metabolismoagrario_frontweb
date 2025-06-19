"use client";
import { useState } from "react";
import Modal from "../modal";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import { useParams } from "next/navigation";
import useConstantForm from "@/hooks/useConstantForm";
import { IReferenceFormData } from "@/types/cultivarTypes";
import InputDefault from "../forms/inputDefault";

interface props {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  data: IReferenceFormData & { id: string };
}

export default function modalEditReferenceTitle({
  visible,
  handleVisible,
  data,
}: props) {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { handleUpdateReference } = useConstantForm({
    id,
  });
  const [referenceSelected, setReferenceSelected] = useState<{
    id: string;
    title: string;
    comment: string | null | undefined;
  }>({
    id: data.id,
    title: data.title,
    comment: data.comment,
  });

  // const camposEnvironment: (keyof IEnvironmentData)[] = [
  // 	"climate",
  // 	"biome",
  // 	"country",
  // 	"cultivationSystem",
  // 	"soil",
  // 	"irrigation",
  // ];
  // const camposReference: (keyof IReferenceFormData)[] = ["title", "comment"];

  const handleSubmit = async () => {
    await handleUpdateReference(data.id, {
      title: referenceSelected.title,
      comment: referenceSelected.comment,
    });
    handleVisible(false);
  };

  return (
    <Modal isOpen={visible} size="lg">
      <Modal.Header
        title="Editar Referência"
        description=""
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        <>
          <InputDefault
            classe="form-input-boxConst"
            label="Título"
            placeholder="Título da referência, EX: Livro X, Autor (2000)"
            onChange={(e) =>
              setReferenceSelected({
                id: referenceSelected?.id || "",
                title: e.target.value,
                comment: referenceSelected?.comment ?? null,
              })
            }
            type="text"
            value={referenceSelected?.title ?? ""}
          />
          <InputDefault
            classe="form-input-boxConst"
            label="Observações"
            placeholder="Observações sobre a referência, EX: Retirado da página Y"
            onChange={(e) =>
              setReferenceSelected({
                id: referenceSelected?.id || "",
                title: referenceSelected?.title ?? null,
                comment: e.target.value,
              })
            }
            type="text"
            value={referenceSelected?.comment ?? ""}
          />
        </>
      </Modal.Main>
      <Modal.Footer
        cancelText="Voltar"
        submitText="Atualizar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}