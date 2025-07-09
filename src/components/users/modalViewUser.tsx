"use client";

import InputDefault from "@/components/forms/inputDefault";
import Modal from "../modal";
import { useEffect, useState } from "react";
import Auth from "@/services/auth";
import useRegisterForm from "@/hooks/useRegisterForm";
import "@/styles/form/form.css";

interface Props {
	visible: boolean;
	handleVisible: (isVisible: boolean) => void;
	userId: string;
}

export default function ModalViewUser({ visible, handleVisible, userId }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const { user, setUser } = useRegisterForm();
	
	useEffect(() => {
		const authService = new Auth();
		const fetchUser = async () => {
			setIsLoading(true);
			const data = await authService.findOne(userId);
			setUser(data);
			setIsLoading(false);
		};
		fetchUser();
	}, [userId]);

	return (
		<Modal isOpen={visible} size="sm">
			<Modal.Header
				title="Visualizar Usuário"
				description=""
				onClose={() => handleVisible(false)}
			/>
			<Modal.Main>
				<InputDefault
					type={"text"}
					placeholder={"Informe seu Nome"}
					classe={"form-input-boxReg"}
					label={"Nome"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => null}
					value={user.name}
					disabled
				/>
				<InputDefault
					type={"email"}
					placeholder={"Informe seu E-mail"}
					classe={"form-input-boxReg"}
					label={"E-mail"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => null}
					value={user.email}
					disabled
				/>
				<InputDefault
					type={"text"}
					placeholder={"Informe seu E-mail"}
					classe={"form-input-boxReg"}
					label={"Função"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => null}
					value={user.role}
					disabled
				/>
			</Modal.Main>
		</Modal>
	);
}

