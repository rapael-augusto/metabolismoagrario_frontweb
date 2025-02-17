import InputDefault from "@/components/forms/inputDefault";
import useCropsForm from "@/hooks/useCropsForm";
import Modal from "../modal";

export default function ModalCreateCrops({
	visible,
	handleVisible,
}: {
	visible: boolean;
	handleVisible: (isVisible: boolean) => void;
}) {
	const { name, setName, scientificName, setScientificName, cadastroCrops } =
		useCropsForm();

	const handleCadastro = async () => {
		const ret = await cadastroCrops();
		if (ret) handleVisible(false);
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
						setName(e.target.value)
					}
					type={"text"}
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
