'use client';

import SecurityComp from "@/components/auth/security";
import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"

import { cropsService } from "@/services/crops";
import { useEffect, useState } from "react";

interface dataCropsType {
    createdAt: string,
    id: string,
    name:string,
    scientificName: string,
    updatedAt:string
}

const Crops = () => {
    const [token, setToken] = useState<string | null>('')
    const [dados, setDados] = useState<dataCropsType[]|[]>([])

    useEffect(() => {
        let session = sessionStorage.getItem('@token')
        setToken(session)
    }, [])

    async function carregarDados() {
        const crops = new cropsService(token)
        setDados(await crops.list()) 
    }

   
    function renderizarCrops(){

        return (
            <>
              1 2 3
            </>
        )
    }
    



    return (
        <SecurityComp>
            <Layout>
                <div className="cropsPage">
                    <h2 className="titulo-crops" >Crops list</h2>
                    <div className="list-crops">

                        <div className="header-list">
                            <div className="header-col-name">
                                Name
                            </div>
                            <div className="header-col-cientific-name">
                                Cientific Name
                            </div>
                            <div className="header-col-acoes">
                                acoes
                            </div>
                        </div>
                        {
                            //renderizar dados 
                        }
                        <div className="content-list">
                            <div className="header-col-name">
                                Laranja
                            </div>
                            <div className="result-col-cientific-name">
                                laranja da ciencia
                            </div>
                            <div className="result-col-acoes">
                                [editar] [excluir]
                            </div>
                        </div>
                        <div className="content-list">
                            <div className="header-col-name">
                                Laranja
                            </div>
                            <div className="result-col-cientific-name">
                                laranja da ciencia
                            </div>
                            <div className="result-col-acoes">
                                [editar] [excluir]
                            </div>
                        </div>


                    </div>

                </div>
            </Layout>
        </SecurityComp>
    );
}

export default Crops;