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

  async getNameOfAll() {
    try {
      const { data } = await Axios.get(`/references/`);
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

  async deleteEnvironment(referenceId: string, environmentId: string) {
    try {
      const { data } = await Axios.delete(
        `/references/environment/${referenceId}`,
        {
          data: { environments: [environmentId] },
        }
      );
      return {
        success: true,
        message: "Ambiente deletado com sucesso!",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  }
}
