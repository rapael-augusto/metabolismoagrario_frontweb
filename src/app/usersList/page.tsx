'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"
import { useEffect } from "react";
import { redirect } from "next/navigation";

const UsersList = () => {

    useEffect(()=>{
        const token = sessionStorage.getItem('@token')

        if(!token){
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }
        
    },[])

    return (  
        <Layout>
            Lista de usuarios cadastrados
        </Layout>
    );
}
 
export default UsersList;