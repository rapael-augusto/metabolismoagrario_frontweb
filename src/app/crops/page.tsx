'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"
import { cropsService } from "@/services/crops";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
// import {edit.svg} from "../../assets/images/edit.svg"

interface dataCropsType {
    createdAt: string,
    id: string,
    name: string,
    scientificName: string,
    updatedAt: string
}

const Crops = () => {
    const [dados, setDados] = useState<dataCropsType[] | any>([])

    useEffect(() => {
        let session = sessionStorage.getItem('@token')
        if (session != null) {

            const crops = new cropsService(session)
            crops.list().then((s) => {
                setDados(s)
            })
        } else {
            redirect('/')
        }
    }, [])


    return (
        <Layout>
            <div className="cropsPage">
                <h2 className="titulo-crops" >Crops list</h2>


                <div className="list-crops">
                    <div className="container-button-crops">
                        <a href="/cropsCreate">Criar Crops</a>
                    </div>

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
                        dados.map((e: dataCropsType) => (
                            <div key={e.id} className="content-list">
                                <div className="header-col-name">
                                    {e.name}
                                </div>
                                <div className="result-col-cientific-name">
                                    {e.scientificName}
                                </div>
                                <div className="result-col-acoes">
                                    <Image
                                        src={"/visualizar.svg"}
                                        alt="Editar"
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src={"/edit.svg"}
                                        alt="Editar"
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src={"/excluir.svg"}
                                        alt="Editar"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </div>
                        ))

                    }
                </div>

            </div>
        </Layout>

    );
}

export default Crops;