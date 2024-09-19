import { createSoil } from "@/types/soilType";
import Axios from "./api";

export class biomeService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async createBiome(data: createSoil) {
    try {
      const response = await Axios.post('/customBiome', data, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : ''
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar o bioma personalizado:", error);
      throw error;
    }
  }
}
