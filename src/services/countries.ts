import Axios from "./api";

export class countriesService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  // listar todos os países
  async listAll() {
    try {
      const response = await Axios.get('/countries', {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : ''
        }
      });
      return response;
    } catch (error) {
      console.error("Erro ao carregar os países:", error);
      throw error;
    }
  }
}
