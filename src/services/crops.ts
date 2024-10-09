import {
  CropsParams,
  paramsBibliographicReference,
  paramsEntradaConstant,
} from "@/types/cropsTypes";
import Axios from "./api";
import { CultivarParams } from "@/types/cultivarTypes";

export class cropsService {
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  async list() {
    if (this.token) {
      return await Axios.get("/crops", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((s) => {
        return s.data;
      });
    }
  }

  async create(params: CropsParams) {
    if (this.token) {
      return await Axios.post("/crops", params, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((s) => {
          sessionStorage.setItem(
            "mensagem",
            `{"mensagem":"Cultura cadastrada com sucesso !","tipo":"success"}`
          );

          setTimeout(() => {
            const alertBox = document.querySelector(".alert-box");
            if (alertBox) {
              console.log("Ocultando alerta após 2s");
              alertBox.classList.add("hidden");
            }
          }, 2000);

          return { status: 1, mensagem: "Crop created" };
        })
        .catch((e) => {
          return { status: -1, mensagem: e.response.data.message[0] };
        });
    }
  }

  async editCrop(id: string, params: CropsParams) {
    if (this.token) {
      return await Axios.patch(`/crops/${id}`, params, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then(() => {
          sessionStorage.setItem(
            "mensagem",
            `{"mensagem":"Cultura atualizada com sucesso!","tipo":"success"}`
          );
          setTimeout(() => {
            const alertBox = document.querySelector(".alert-box");
            if (alertBox) {
              alertBox.classList.add("hidden");
            }
          }, 2000);
          return { status: 1, mensagem: "Crop updated" };
        })
        .catch((error) => ({
          status: -1,
          mensagem: error.response.data.message[0],
        }));
    }
  }

  async findOne(id: string) {
    if (this.token) {
      return await Axios.get(`/crops/${id}`).then((response) => {
        return response.data.crop;
      });
    }
  }

  async findOneCultivar(id: string) {
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

  async createCultivar(idCrop: string, params: CultivarParams) {
    if (this.token) {
      return await Axios.post(`/cultivars/${idCrop}`, params)
        .then((response) => {
          sessionStorage.setItem(
            "mensagem",
            `{"mensagem":"Cultivar cadastrada com sucesso !","tipo":"success"}`
          );
          setTimeout(() => {
            const alertBox = document.querySelector(".alert-box");
            if (alertBox) {
              console.log("Ocultando alerta após 2s");
              alertBox.classList.add("hidden");
            }
          }, 2000);

          return { status: 1, mensagem: "Cultivar cadastrada com sucesso !" };
        })
        .catch((e) => {
          return { status: -1, mensagem: e.response.data.message[0] };
        });
    }
  }

  async createConstantOfCultivar(
    idCrop: string,
    params: paramsEntradaConstant
  ) {
    if (this.token) {
      return await Axios.post(`/constants/${idCrop}`, params, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          sessionStorage.setItem(
            "mensagem",
            `{"mensagem":"Constante criada com sucesso !","tipo":"success"}`
          );
          setTimeout(() => {
            const alertBox = document.querySelector(".alert-box");
            if (alertBox) {
              console.log("Ocultando alerta após 2s");
              alertBox.classList.add("hidden");
            }
          }, 2000);

          return { status: 1, mensagem: "Constante Criada com sucesso !" };
        })
        .catch((error) => {
          return { status: -1, mensagem: error.response.data.message[0] };
        });
    }
  }

  async createBibliographicReference(data: paramsBibliographicReference) {
    if (this.token) {
      return await Axios.post(`/bibliographic`, data, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return { status: -1, mensagem: error.response.data.message };
        });
    }
  }

  async deleteConstant(idConstant: string) {
    if (this.token) {
      return await Axios.delete(`/constants/${idConstant}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          return { status: 1, mensagem: "Fator de conversão deletado" };
        })
        .catch((error) => {
          return { status: -1, mensagem: error.response.data.message };
        });
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

  async deleteCrop(idCrop: string) {
    if (this.token) {
      return await Axios.delete(`/crops/${idCrop}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          return { status: 1, mensagem: "Cultura deletado" };
        })
        .catch((error) => {
          return { status: -1, mensagem: error.response.data.message };
        });
    }
  }
}
