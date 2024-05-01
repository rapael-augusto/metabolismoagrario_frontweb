import Axios from "./api";

export class cropsService {
    private token:string| null

    constructor(token: string|null){
        this.token = token
    }
    
    async list() {

        if(this.token){

            return await Axios.get('/crops',{
                headers:{
                    Authorization : `Bearer ${this.token}`
                }
            }).then((s)=>{
                return s.data
            })

        }   
    }
}