export interface loginData {
	email: string;
	password: string;
}

export enum UserRoles {
	OPERATOR = "OPERATOR",
	ADMIN = "ADMIN",
}

export interface UserResponseType {
	id: string;
	name: string;
	email: string;
	oldPassword?: string;
	password?: string;
	role: UserRoles;
	createdAt: string;
	updatedAt: string;
}

export interface UserUpdatePayload {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  role?: UserRoles;
}

export interface cadastroData {
	name: string;
	email: string;
	role: string;
	password: string;
}

export interface IUserData {
  name: string;
  email: string;
  role: string;
}
