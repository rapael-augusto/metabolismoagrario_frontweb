import { PPL_Constants } from "@/types/conversionFactor";
import {
	IEnvironmentData,
	IReferenceFormData,
	TCultivarConstants,
} from "@/types/cultivarTypes";
import Axios from "./api";

interface CreateReferenceDTO {
	constants: TCultivarConstants[];
	reference: IReferenceFormData;
	environment: IEnvironmentData;
}

export class ReferenceService {
	async createReference(cultivarId: string, referenceData: CreateReferenceDTO) {
		try {
			const { data } = await Axios.post(`/references/${cultivarId}`, {
				...referenceData,
			});
			return {
				success: true,
				message: "Referência criada com sucesso!",
				action: "back",
			};
		} catch (error: any) {
			return {
				success: false,
				message: error.response?.data?.message,
				action: "stay",
			};
		}
	}

	async findAllByCultivarId(cultivarId: string) {
		try {
			const { data } = await Axios.get(`/references/${cultivarId}`);
			return {
				success: true,
				data,
			};
		} catch (error: any) {
			return {
				success: false,
				message: error.response?.data?.message,
			};
		}
	}
}
