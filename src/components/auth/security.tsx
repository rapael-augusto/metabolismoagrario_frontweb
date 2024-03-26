"use client";

import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

//componente para encapsular todas as rotas protegidas 
const SecurityComp: React.FC<any> = ({ children }) => {

    const [componente,setComponente] = useState<ReactNode>('')

    useEffect(()=>{
        const token = sessionStorage.getItem('@token')

        if(!token){
            redirect('/')
        }else{
            setComponente(children)
        }
    },[])

    return (
        <>
            {componente}
        </>
    )
    
}

export default SecurityComp;