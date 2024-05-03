import axios from "axios";
import Axios from "./api";

type CropsParams = {
    name: string
    scientificName: string
}

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
}