"use client";

import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";
import useRegisterForm from "@/hooks/useRegisterForm";
import { useEffect, useState } from "react";
import Auth from "@/services/auth";
import { UserRoles } from "@/types/authType";
import { useParams } from "next/navigation";

const editUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { user, setUser, editUser, options } = useRegisterForm();
	const params = useParams();
	const { userId } = params as { userId: string };

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
		<Layout>
			<form className="formBody-login" onSubmit={editUser}>
				<div className="form-input-boxReg">
					<h2 className="tittle-loginReg">Atualizar</h2>
				</div>

				<InputDefault
					type={"text"}
					placeholder={"Informe seu Nome"}
					classe={"form-input-boxReg"}
					label={"Nome"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUser((prevUser) => ({
							...prevUser,
							name: e.target.value,
						}))
					}
					value={user.name}
				/>
				<Select
					label="Tipo de usuário"
					options={options}
					value={user.role}
					onChange={(value: string) =>
						setUser((prevUser) => ({
							...prevUser,
							role: value as UserRoles,
						}))
					}
					type={"form"}
				/>

				<InputDefault
					type={"email"}
					placeholder={"Informe seu E-mail"}
					classe={"form-input-boxReg"}
					label={"E-mail"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUser((prevUser) => ({
							...prevUser,
							email: e.target.value,
						}))
					}
					value={user.email}
				/>

				<InputDefault
					type={"password"}
					placeholder={"Informe sua senha atual"}
					classe={"form-input-boxReg"}
					label={"Senha atual"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUser((prevUser) => ({
							...prevUser,
							oldPassword: e.target.value,
						}))
					}
					value={user.oldPassword ?? ""}
				/>

				<InputDefault
					type={"password"}
					placeholder={"Informe sua senha"}
					classe={"form-input-boxReg"}
					label={"Senha"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUser((prevUser) => ({
							...prevUser,
							password: e.target.value,
						}))
					}
					value={user.password ?? ""}
				/>

				<div className="form-input-boxReg">
					<NavButton Url="/usersList" page="form" text="Voltar" type="voltar" />
					<Button
						texto={"Atualizar"}
						classe={"button-home"}
						onclick={editUser}
					/>
				</div>
			</form>
		</Layout>
	);
};

export default editUser;