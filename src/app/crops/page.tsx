'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"
import { cropsService } from "@/services/crops";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";
import { dataCropsType } from "@/types/cropsTypes";

const Crops = () => {
    const [dados, setDados] = useState<dataCropsType[] | any>([])

    useEffect(() => {
        let session = sessionStorage.getItem('@token')
        if (session != null) {

            const crops = new cropsService(session)

            crops.list().then((response) => {
                setDados(response)
            })
        } else {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }

    }, [])

    return (
        <Layout>
            <div className="cropsPage">
                <h2 className="titulo-crops" >Lista de culturas</h2>


                <div className="list-crops">
                    <div className="container-button-crops">
                        <NavButton Url="/home" text={"Voltar"} type="voltar" page="list" />
                        <div>
                            <NavButton Url="/criarCrops" text={"Cadastrar Cultura"} type="cadastrar" page="list" />
                        </div>
                    </div>

                    <div className="header-list">

                        <div className="header-col-name">
                            Nome
                        </div>
                        <div className="header-col-cientific-name">
                            Nome científico
                        </div>
                        <div className="header-col-acoes">
                            Ações
                        </div>
                    </div>
                    {
                        dados.map((e: dataCropsType) => (
                            <div key={e.id} className="content-list">
                                <div className="result-col-name">
                                    {e.name}
                                </div>
                                <div className="result-col-cientific-name">
                                    {e.scientificName}
                                </div>
                                <div className="result-col-acoes">
                                    <a href={`/cultivars/${e.id}`}>
                                        <Image
                                            src={"/visualizar.svg"}
                                            alt="visualizar"
                                            width={20}
                                            height={20}
                                        />
                                    </a>

                                    <Image
                                        src={"/edit.svg"}
                                        alt="Editar"
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src={"/excluir.svg"}
                                        alt="excluir"
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