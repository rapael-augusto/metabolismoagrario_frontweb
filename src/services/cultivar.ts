import { toast } from "react-toastify";
import Axios from "./api";
import { CultivarParams } from "@/types/cultivarTypes";

export class cultivarService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async createCultivar(idCrop: string, params: CultivarParams) {
    if (this.token) {
      return await Axios.post(`/cultivars/${idCrop}`, params, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          toast.success("Cultivar cadastrada com sucesso!");
          return { status: 1, mensagem: "Cultivar cadastrada com sucesso!" };
        })
        .catch((e) => {
          return { status: -1, mensagem: e.response.data.message[0] };
        });
    }
  }

  async findOne(id: string) {
    if (this.token) {
      return await Axios.get(`/cultivars/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((e) => {
          return { status: -1, mensagem: e.response.data.message[0] };
        });
    }
  }

  async update(id: string, params: CultivarParams) {
    try {
      const { data } = await Axios.patch(`/cultivars/${id}`, params);
      return { status: 1, mensagem: "Cultivar atualizada com sucesso!" };
    } catch (error: any) {
      return { status: -1, mensagem: error.response.data.message[0] };
    }
  }

  async deleteCultivar(idCultivar: string) {
    if (this.token) {
      return await Axios.delete(`/cultivars/${idCultivar}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          return { status: 1, mensagem: "Cultivar deletado" };
        })
        .catch((error) => {
          return { status: -1, mensagem: error.response.data.message };
        });
    }
  }
}
