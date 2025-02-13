import { toast } from "react-toastify";
import Axios from "./api";
import { CultivarParams, ReviewStatus } from "@/types/cultivarTypes";

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

  async listCultivarsReviews() {
    const { data } = await Axios.get("cultivars/review/list");
    return data;
  }

  // @Patch('cultivars/review/update/:reviewId')
  async approveCultivarReview(
    reviewId: string,
    data: {
      status: "Approved" | "Declined";
      justification: string;
    }
  ) {
    try {
      return await Axios.patch(`cultivars/review/update/${reviewId}`, {
        ...data,
      });
    } catch (error: any) {
      return { status: -1, mensagem: error.response.data.message };
    }
  }

  // @Delete('cultivars/review/:reviewId')
  async deleteCultivarReview(reviewId: string) {
    try {
      await Axios.delete(`cultivars/review/${reviewId}`);
      toast.success("A solicitação foi removida!");
      return { status: 1, mensagem: "ok" };
    } catch (error: any) {
      return { status: -1, mensagem: error.response.data.message };
    }
  }

  // @Post('cultivars/review/:cropId')
  async createCultivarReview(cropId: string, cultivarData: CultivarParams) {
    try {
      return await Axios.post(`cultivars/review/${cropId}`, cultivarData);
    } catch (error: any) {
      return { status: -1, mensagem: error.response.data.message };
    }
  }

  // @Patch('cultivars/review/updateCultivar/:reviewId')
  async updateCultivarByReview(reviewId: string, cultivarData: CultivarParams) {
    try {
      return await Axios.patch(
        `cultivars/review/updateCultivar/${reviewId}`,
        cultivarData
      );
    } catch (error: any) {
      return { status: -1, mensagem: error.response.data.message };
    }
  }
}
