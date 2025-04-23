import { createSoil } from "@/types/soilType";
import Axios from "./api";

export class soilService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async createSoil(data: createSoil) {
    try {
      const response = await Axios.post("/customSoil", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar o solo personalizado:", error);
      throw error;
    }
  }
}
