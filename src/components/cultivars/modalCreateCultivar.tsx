import InputDefault from "@/components/forms/inputDefault";
import Modal from "../modal";
import useCultivarForm from "@/hooks/useCultivarForm";

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

	const handleCadastro = async () => {
		const ret = await cadastroCultivar();
		if (ret) handleVisible(false);
		window.location.reload();
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
						setName(e.target.value)
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
