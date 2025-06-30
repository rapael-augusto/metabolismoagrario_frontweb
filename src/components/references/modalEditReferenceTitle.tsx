"use client";
import { useState } from "react";
import Modal from "../modal";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import { useParams } from "next/navigation";
import useConstantForm from "@/hooks/useConstantForm";
import { IReferenceFormData } from "@/types/cultivarTypes";
import InputDefault from "../forms/inputDefault";
import { filterTextInput } from "@/utils/filterTextInput";
import { toast } from "react-toastify";

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
    title: data.title ?? "",
    comment: data.comment,
  });

function validate() {
  let errors = [];
  let equalErrors = 0;
  if (!referenceSelected.title) {
    errors.push("O título é obrigatório!");
  } else if (referenceSelected.title.length < 3) {
    errors.push("O título deve ter pelo menos 3 caracteres!");
  } else if (data.title === referenceSelected.title){
    equalErrors++;
  }
  if (!referenceSelected.comment) {
    errors.push("O comentário é obrigatório!");
  } else if (referenceSelected.comment.length < 3) {
    errors.push("O comentário deve ter pelo menos 3 caracteres!");
  } else if(data.comment === referenceSelected.comment){
    equalErrors++;
  }
  
  if(errors.length > 0){
    errors.forEach((error) => {
      toast.error(error);
    });
    return false;
  } else if(equalErrors > 1){
    toast.error("Pelo menos um campo deve ser alterado!");
    return false;
  }
  return true;
}

  const handleSubmit = async () => {
    if(validate()){
      await handleUpdateReference(data.id, {
        title: referenceSelected.title,
        comment: referenceSelected.comment,
      });
      toast.success("Referência atualizada com sucesso!");
      handleVisible(false);
    }
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
                title: filterTextInput(e.target.value, {allowNumbers: true}),
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
                comment: filterTextInput(e.target.value, {allowNumbers: true}),
              })
            }
            type="text"
            value={referenceSelected?.comment ?? ""}
          />
        </>
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