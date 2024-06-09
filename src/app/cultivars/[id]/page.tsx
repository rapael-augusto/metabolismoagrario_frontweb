"use client";

import Layout from "@/components/layout/layout";
import "../../../styles/crops/pageCrops.css"
import "../../../styles/cultivar/pageCultivar.css"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { cropsService } from "@/services/crops";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";
import { cultivarsData } from "@/types/cultivarTypes";

interface Props {
    params: { id: string }
}

const Cultivars = ({ params }: Props) => {
    const [dados, setDados] = useState<cultivarsData[]>([])
    const [titulo, setTitulo] = useState<string | any>('')

    useEffect(() => {
        let session = sessionStorage.getItem('@token')

        if (session) {
            const service = new cropsService(session)

            service.findOne(params.id).then((response) => {
                setDados(response.cultivars)
                setTitulo(response.name)
            })


        } else {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }

    }, [])

    return (
        <Layout>
            <div className="cropsPage">
                <h2 className="titulo-crops">Cultivares de {titulo}</h2>

                <div className="list-cultivars">
                    <div className="container-button-crops">
                        <NavButton Url={"/crops"} page="list" text="Voltar" type="voltar" />
                        <NavButton Url={`/criarCultivar/${params.id}`} page="list" text="Cadastrar Cultivar" type="cadastrar" />
                    </div>

                    <div className="header-list">

                        <div className="header-col-nameCultivar">
                            Nome
                        </div>

                        <div className="header-col-acoesCultivar">
                            Ações
                        </div>

                    </div>
                    {
                        dados.map((e: cultivarsData) => (
                            <div key={e.id} className="content-list">
                                <div className="result-col-nameCultivar">
                                    {e.name}
                                </div>

                                <div className="result-col-acoesCultivar">
                                    <a href={`/constant/${e.id}`}>
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

export default Cultivars;