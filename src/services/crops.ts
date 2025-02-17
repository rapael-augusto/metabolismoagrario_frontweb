import {
	CropsParams,
	paramsBibliographicReference,
	paramsEntradaConstant,
} from "@/types/cropsTypes";
import Axios from "./api";
import { CultivarParams } from "@/types/cultivarTypes";
import { toast } from "react-toastify";

export class cropsService {
	async list() {
		return await Axios.get("/crops").then((s) => {
			return s.data;
		});
	}

	async create(params: CropsParams) {
		return await Axios.post("/crops", params)
			.then((s) => {
				toast.success("Cultura cadastrada com sucesso!");
				return { status: 1, mensagem: "Crop created" };
			})
			.catch((e) => {
				return { status: -1, mensagem: e.response.data.message[0] };
			});
	}

	async editCrop(id: string, params: CropsParams) {
		return await Axios.patch(`/crops/${id}`, params)
			.then(() => {
				toast.success("Cultura atualizada com sucesso!");
				return { status: 1, mensagem: "Crop updated" };
			})
			.catch((error) => ({
				status: -1,
				mensagem: error.response.data.message[0],
			}));
	}

	async findOne(id: string) {
		return await Axios.get(`/crops/${id}`).then((response) => {
			return response.data.crop;
		});
	}

	async findOneCultivar(id: string) {
		return await Axios.get(`/cultivars/${id}`)
			.then((response) => {
				return response.data;
			})
			.catch((e) => {
				return { status: -1, mensagem: e.response.data.message[0] };
			});
	}

	async createCultivar(idCrop: string, params: CultivarParams) {
		return await Axios.post(`/cultivars/${idCrop}`, params)
			.then((response) => {
				return { status: 1, mensagem: "Cultivar cadastrada com sucesso !" };
			})
			.catch((e) => {
				return { status: -1, mensagem: e.response.data.message[0] };
			});
	}

	async createConstantOfCultivar(
		idCrop: string,
		params: paramsEntradaConstant
	) {
		return await Axios.post(`/constants/${idCrop}`, params)
			.then((response) => {
				return { status: 1, mensagem: "Constante Criada com sucesso!" };
			})
			.catch((error) => {
				return { status: -1, mensagem: error.response.data.message[0] };
			});
	}

	async createBibliographicReference(data: paramsBibliographicReference) {
		return await Axios.post(`/bibliographic`, data)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return { status: -1, mensagem: error.response.data.message };
			});
	}

	async deleteConstant(idConstant: string) {
		return await Axios.delete(`/constants/${idConstant}`)
			.then((response) => {
				return { status: 1, mensagem: "Fator de conversão deletado" };
			})
			.catch((error) => {
				return { status: -1, mensagem: error.response.data.message };
			});
	}

	async deleteCultivar(idCultivar: string) {
		return await Axios.delete(`/cultivars/${idCultivar}`)
			.then((response) => {
				return { status: 1, mensagem: "Cultivar deletado" };
			})
			.catch((error) => {
				return { status: -1, mensagem: error.response.data.message };
			});
	}

	async deleteCrop(idCrop: string) {
		return await Axios.delete(`/crops/${idCrop}`)
			.then((response) => {
				return { status: 1, mensagem: "Cultura deletado" };
			})
			.catch((error) => {
				return { status: -1, mensagem: error.response.data.message };
			});
	}
}
