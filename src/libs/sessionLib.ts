"use server";
import { cookies } from "next/headers";

export const createSession = async (token: string, refreshToken: string) => {
	const cookieStorage = await cookies();
	cookieStorage.set("@token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
	});
};

export const getSession = async () => {
	const cookieStorage = await cookies();
	const token = cookieStorage.get("@token")?.value || null;
	return { token };
};

export const destroySession = async () => {
	const cookieStorage = await cookies();
	cookieStorage.delete("@token");
};
