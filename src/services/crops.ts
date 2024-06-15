import { CropsParams,paramsEntradaConstant } from "@/types/cropsTypes";
import Axios from "./api";
import { CultivarParams } from "@/types/cultivarTypes";

export class cropsService {
    private token: string | null

    constructor(token: string | null) {
        this.token = token
    }

    async list() {

        if (this.token) {

            return await Axios.get('/crops', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((s) => {
                return s.data
            })

        }
    }

    async create(params: CropsParams) {
        
        if (this.token) {
            return await Axios.post('/crops', params, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((s) => {
                sessionStorage.setItem('mensagem', `{"mensagem":"Cultura cadastrada com sucesso !","tipo":"success"}`)
                return { status: 1, mensagem: 'Crop created' }
            }).catch((e) => {
                return { status: -1, mensagem: e.response.data.message[0] }
            })
        }

    }

    async findOne(id: string) {

        if (this.token) {

            return await Axios.get(`/crops/${id}`).then((response) => {
                return response.data.crop
            })

        }

    }

    async findOneCultivar(id: string)  {
        if (this.token) {
            return await Axios.get(`/cultivars/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                return response.data
            }).catch((e) => {
                return { status: -1, mensagem: e.response.data.message[0] }
            })
        }
    }

    async createCultivar(idCrop:string,params: CultivarParams){
        if (this.token) {
            return await Axios.post(`/cultivars/${idCrop}`,params,{
                headers:{
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response)=>{
                sessionStorage.setItem('mensagem', `{"mensagem":"Cultivar cadastrada com sucesso !","tipo":"success"}`)
                return { status: 1, mensagem: 'Cultivar cadastrada com sucesso !'}
             }).catch((e) => {
                return { status: -1, mensagem: e.response.data.message[0] }
            })
        }
    }

    async createConstantOfCultivar(idCrop: string, params: paramsEntradaConstant) {
        if (this.token) {
            return await Axios.post(`/constants/${idCrop}`,params,{
                headers:{
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response)=>{
                sessionStorage.setItem('mensagem', `{"mensagem":"Constante criada com sucesso !","tipo":"success"}`)
                return {status: 1, mensagem: 'Constante Criada com sucesso !'}
            }).catch((error)=>{
                return {status: -1, mensagem: error.response.data.message[0]}
            })
        }

    }
}