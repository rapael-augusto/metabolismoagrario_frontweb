import api from "./api";

export class ConstantService {
  async update(id: string, value: number) {
    try {
      const { data } = await api.patch(`/constants/${id}`, { value });
      return {
        success: true,
        message: "Fatores de conversão atualizados.",
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
