"use client";
import { destroySession, getSession } from "@/libs/sessionLib";
import { IUserData } from "@/types/authType";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface AuthContextProps {
	user: IUserData | null;
	handleSetUser: (user: IUserData) => void;
	logout: () => void;
}

export const AuthContext = React.createContext({} as AuthContextProps);

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [user, setUser] = useState<IUserData | null>(null);

	function handleSetUser(user: IUserData) {
		setUser(user);
		sessionStorage.setItem("@user", JSON.stringify(user));
		router.refresh();
	}

	async function logout() {
		const { token } = await getSession();
		if (token) {
			await destroySession();
			router.push("/");
		}
		setUser(null);
		sessionStorage.removeItem("@user");
	}

	const checkSession = async () => {
		const { token } = await getSession();
		if (token) {
			try {
				const decodedToken = jwtDecode<IUserData & { exp: number }>(token);
				if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
					await logout(); // to-do implementar lógica do refreshToken
				}
				handleSetUser({
					email: decodedToken.email,
					name: decodedToken.name,
					role: decodedToken.role,
				});
			} catch (error) {
				await logout();
			}
		}
	};

	useEffect(() => {
		const storedUser = sessionStorage.getItem("@user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		} else {
			checkSession();
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, handleSetUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
