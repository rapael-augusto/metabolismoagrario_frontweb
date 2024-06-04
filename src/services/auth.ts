
import { loginData,cadastroData } from "@/types/authType";
import Axios from "./api";
class Auth {

    async login(dados:loginData) {
        let retornoReq; 

        await Axios.post('/sessions',dados).then(response =>{       
            sessionStorage.setItem('@token',response.data.accessToken)
            sessionStorage.setItem('@refreshToken',response.data.refreshToken)
            sessionStorage.setItem('mensagem', `{"mensagem":"bem vindo !","tipo":"success"}`)
            sessionStorage.setItem('user',response.data.user.name )

            retornoReq = {status: 1, message: 'logado'}
        }).catch(e =>{
            sessionStorage.setItem('mensagem', `{"mensagem":"Credenciais inválidas !","tipo":"danger"}`)
            location.reload()
            retornoReq = {status: -1, message:e.response.data.message } 
        })

        return retornoReq;
    }

    async cadastro(dados: cadastroData, token: string|null){
        if(token != null){
            let retornoReq;

            await Axios.post('/users',dados,{
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }).then(response => {
                retornoReq = {status: 1, message: 'Usuario criado !'}
            }).catch(e =>{
                retornoReq = {status: -1, message:e.response.data.message }
            })
    
            return retornoReq
        }
    }

    async UsersList(token: string){
        return await Axios.get('/users',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) =>{
            return response.data
        })
    }
}

export default Auth
