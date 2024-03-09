import loginData from "@/types/loginType";
import Axios from "./api";

export async function Login(dados:loginData){
    let retornoReq; 

    await Axios.post('/sessions',dados).then(response =>{       
        sessionStorage.setItem('@token',response.data.accessToken)
        sessionStorage.setItem('@refreshToken',response.data.refreshToken)
        retornoReq = {status: 1, message: 'logado'}
    }).catch(e =>{
        retornoReq = {status: -1, message:e.response.data.message } 
    })

    return retornoReq;
}

