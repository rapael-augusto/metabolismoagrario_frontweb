import { PPL_Constants } from "./conversionFactor";

export type CultivarParams = {
	name: string;
};

export type CreateCultivarResponseType = {
	status: number;
	mensagem: string;
};

export type ReviewStatus =
	| "APPROVED"
	| "PENDING"
	| "REJECTED"
	| "CHANGES_REQUESTED";

export type cultivarsData = {
	id: string;
	cropId: string;
	name: string;
};

export interface Environment {
	countryName: string;
	id: string;
	climate: string | null;
	biome: string | null;
	customBiome: string | null;
	irrigation: string | null;
	countryId: string;
	soil: string | null;
	customSoil: string | null;
	cultivationSystem: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface EnvironmentData {
	id: string;
	environment: Environment;
	constants: Constant[];
}

export interface Constant {
	id: string;
	value: number;
	type: keyof PPL_Constants;
	comment?: string | null;
	status: ReviewStatus;
}

export interface Reference {
	id: string;
	title: string;
	comment?: string | null;
	environments: EnvironmentData[];
}

export interface CultivarView {
	id: string;
	name: string;
	references: Reference[];
}

export type TCultivarConstants = { type: keyof PPL_Constants; value: number };

export interface IEnvironmentData {
	climate: string | undefined;
	biome: string | undefined;
	customBiome?: string | null;
	irrigation: string | undefined;
	country: string | undefined;
	soil: string | undefined;
	customSoil?: string | null;
	cultivationSystem: string | undefined;
}

export interface IReferenceFormData {
	title: string;
	comment?: string | null;
}
