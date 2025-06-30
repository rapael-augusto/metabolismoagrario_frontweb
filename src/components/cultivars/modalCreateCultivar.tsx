import InputDefault from "@/components/forms/inputDefault";
import Modal from "../modal";
import useCultivarForm from "@/hooks/useCultivarForm";
import { filterTextInput, isOnlyNumbers } from "@/utils/filterTextInput";
import { toast } from "react-toastify";

export default function ModalCreateCultivar({
	visible,
	handleVisible,
	id,
}: {
	visible: boolean;
	handleVisible: (isVisible: boolean) => void;
	id: string;
}) {
	const { name, setName, cadastroCultivar } = useCultivarForm(id);

	function validate(){
		let errors = [];
		if(name.length < 3) errors.push("O nome da Cultivar deve conter pelo menos 3 letras!");
		if(isOnlyNumbers(name)) errors.push("O nome da Cultivar não pode conter apenas números!");
		if(name.charAt(0) === " ") errors.push("O nome da Cultivar não pode começar com espaço!");
		if(errors.length > 0){
			errors.forEach(error => toast.error(error));
			return false;
		}
		return true;
	}

	const handleCadastro = async () => {
		if(validate()){
			const ret = await cadastroCultivar();
			if (ret) handleVisible(false);
			window.location.reload();
		}
		return;
	};

	return (
		<Modal isOpen={visible} size="md">
			<Modal.Header
				title="Cadastrar Cultivar"
				description="Preencha os campos necessários para realizar o cadastro."
				onClose={() => handleVisible(false)}
			/>
			<Modal.Main>
				<InputDefault
					classe="form-input-box"
					label="Nome Cultivar"
					placeholder="Nome Cultivar"
					value={name}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setName(filterTextInput(e.target.value, { allowNumbers: true }))
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
