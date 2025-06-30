import InputDefault from "@/components/forms/inputDefault";
import useCropsForm from "@/hooks/useCropsForm";
import Modal from "../modal";
import { toast } from "react-toastify";
import { filterTextInput } from "@/utils/filterTextInput";

export default function ModalCreateCrops({
  visible,
  handleVisible,
}: {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
}) {
  const { name, setName, scientificName, setScientificName, cadastroCrops } =
    useCropsForm();

  function validate() {
    const errors = [];
    if (name.length < 3) errors.push("Nome");
    if (scientificName.length < 3) errors.push("Nome Científico");
    if (errors.length > 0) {
      toast.error(`${errors.join(" e ")} devem conter pelo menos 3 letras!`);
      return false;
    }
    return true;
  }

  const handleCadastro = async () => {
    if (validate()) {
      const ret = await cadastroCrops();
      if (ret) handleVisible(false);
    }
    return;
  };

  return (
    <Modal isOpen={visible} size="md">
      <Modal.Header
        title="Cadastrar Cultura"
        description="Preencha os campos necessários para realizar o cadastro."
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        <InputDefault
          classe="form-input-box"
          label="Nome"
          placeholder="Nome"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(filterTextInput(e.target.value))
          }
          type={"text"}
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
        />
      </Modal.Main>
      <Modal.Footer
        cancelText="Cancelar"
        submitText="Cadastrar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleCadastro}
      />
    </Modal>
  );
}
