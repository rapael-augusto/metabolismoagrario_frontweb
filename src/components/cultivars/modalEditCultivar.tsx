import InputDefault from "@/components/forms/inputDefault";
import Modal from "../modal";
import useCultivarForm from "@/hooks/useCultivarForm";
import { useEffect, useState } from "react";
import { cropsService } from "@/services/crops";

export default function ModalEditCultivar({
	visible,
	handleVisible,
	id,
	cultivarId,
}: {
	visible: boolean;
	handleVisible: (isVisible: boolean) => void;
	id: string;
	cultivarId: string;
}) {
	const { name, setName, editarCultivar } = useCultivarForm(id);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (cultivarId) {
			const service = new cropsService();
			const fetchCultivar = async () => {
				setIsLoading(true);
				const data = await service.findOneCultivar(cultivarId);
				setName(data.name);
				setIsLoading(false);
			};
			fetchCultivar();
		}
	}, [cultivarId]);

	const handleEditCrop = async () => {
		if (cultivarId && typeof cultivarId === "string") {
			await editarCultivar(cultivarId);
		}
	};
	return (
		<Modal isOpen={visible} size="md">
			<Modal.Header
				title="Atualizar Cultivar"
				description="Preencha os campos necessários para atualizar."
				onClose={() => handleVisible(false)}
			/>
			<Modal.Main>
				{isLoading ? (
					<p style={{ width: "100%", textAlign: "center" }}>Carregando...</p>
				) : (
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
}
