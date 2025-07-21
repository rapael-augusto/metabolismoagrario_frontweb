import { loginData, cadastroData, UserResponseType, UserUpdatePayload } from "@/types/authType";
import Axios from "./api";
import { AxiosError } from "axios";
import { createSession } from "@/libs/sessionLib";
class Auth {
	async login(dados: loginData) {
		try {
			const { data } = await Axios.post("/sessions", dados);
			await createSession(data.accessToken, data.refreshToken);
			return { status: 1, message: "logado", user: data.user };
		} catch (e: any) {
			return { status: -1, message: e.response.data.message, user: null };
		}
	}

	async cadastro(dados: cadastroData, token: string | null) {
		if (token != null) {
			let retornoReq;

			await Axios.post("/users", dados, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					retornoReq = { status: 1, message: "Usuario criado !" };
				})
				.catch((e) => {
					retornoReq = { status: -1, message: e.response.data.message };
				});

			return retornoReq;
		}
	}

	async UsersList() {
		return await Axios.get("/users").then((response) => {
			return response.data;
		});
	}

	async findOne(userId: string) {
		try {
			const { data } = await Axios.get(`/users/${userId}`);
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async update(userId: string, userPayload: UserUpdatePayload) {
		try {
			const { data } = await Axios.patch(`/users/${userId}`, userPayload);
			return data;
		} catch (errors: any) {
			if (errors instanceof AxiosError) {
				return { errors: errors.response?.data.message };
			}
		}
	}

	async updateProfile(userPayload: UserUpdatePayload) {
		try {
			const { data } = await Axios.patch("/users/profile", userPayload);
			return data;
		} catch (errors: any) {
			if (errors instanceof AxiosError) {
				return { errors: errors.response?.data.message };
			}
		}
	}

	async validateForgotPassowordToken(token: string) {
		try {
			await Axios.get(`/password-reset/${token}`);
			return "OK";
		} catch (errors: any) {
			if (errors instanceof AxiosError) {
				return { errors: errors.response?.data.message };
			}
		}
	}

	async createForgotPasswordToken(email: string) {
		try {
			await Axios.post(`/password-reset`, { email });
			return "OK";
		} catch (errors: any) {
			if (errors instanceof AxiosError) {
				return { errors: errors.response?.data.message };
			}
		}
	}

	async resetPassword(token: string, password: string) {
		try {
			await Axios.post(`/password-reset/${token}`, { password });
			return "OK";
		} catch (errors: any) {
			if (errors instanceof AxiosError) {
				return { errors: errors.response?.data.message };
			}
		}
	}
}
export default Auth;
