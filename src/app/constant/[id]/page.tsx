"use client";

import Layout from "@/components/layout/layout";
import "../../../styles/crops/pageCrops.css"
import "../../../styles/constant/constantPage.css"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { cropsService } from "@/services/crops";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";

interface Props {
    params: { id: string }
}

interface dadosConstants {
    comment: string
    createdAt: string
    cropId: string
    id: string
    reference: string
    type: string
    updatedAt: string
    value: number
}


const constant = ({ params }: Props) => {
    const [dados, setDados] = useState<dadosConstants[] | any>([])
    const [titulo,setTitulo] = useState<string | any>('') 

    useEffect(() => {
        let session = sessionStorage.getItem('@token')

        if (session) {
            const service = new cropsService(session)

            service.findOne(params.id).then((response) => {
                setDados(response.constants)
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
                <h2 className="titulo-crops" >Constants of {titulo}</h2>


                <div className="list-constants">
                    <div className="container-button-crops">
                        <NavButton Url={"/crops"} page="list" text="Voltar" type="voltar" />
                        <NavButton Url={`/criarConstant/${params.id}`} page="list" text="Cadastrar Constante" type="cadastrar" />
                    </div>

                    <div className="header-list">

                        <div className="header-col-type">
                            Tipo
                        </div>
                        <div className="header-col-reference">
                            Referencia
                        </div>
                        <div className="header-col-value">
                            valor
                        </div>

                        <div className="header-col-acoes-constant">
                            acoes
                        </div>

                    </div>
                    {
                        dados.map((e: dadosConstants) => (
                            <div key={e.id} className="content-list">
                                <div className="result-col-type">
                                    {e.type}
                                </div>

                                <div className="result-col-reference">
                                    {e.reference}
                                </div>

                                <div className="result-col-value">
                                    {e.value}
                                </div>

                                <div className="result-col-acoes-constant">

                                    <Image
                                        src={"/visualizar.svg"}
                                        alt="visualizar"
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

export default constant;