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
    const [dados, setDados] = useState<dadosConstants[]>([])
    const [titulo, setTitulo] = useState<string | any>('')
    const [cropId,setCropId] = useState<string | any>('')

    const constantesTraducao : any = {
        'HARVEST_INDEX': "ÍNDICE DE COLHEITA" ,
        'AERIAL_RESIDUE_INDEX': "ÍNDICE DE RESÍDUOS AÉREOS",
        'PRODUCT_RESIDUE_INDEX' : "ÍNDICE DE RESÍDUOS DO PRODUTO",
        'PRODUCT_DRY_MATTER_FACTOR': "FATOR DE MATÉRIA SECA DO PRODUTO",
        'RESIDUE_DRY_MATTER_FACTOR': "FATOR DE MATÉRIA SECA DE RESÍDUO",
        'BELOWGROUND_INDEX': "ÍNDICE ABAIXO",
        'WEED_AERIAL_FACTOR': "FATOR AÉREO DE ERVAS DANINHAS",
        'WEED_BELOWGROUND_INDEX': "ÍNDICE DE ERVAS ABAIXO DO SOLO",
    }

    useEffect(() => {
        let session = sessionStorage.getItem('@token')

        if (session) {
            const service = new cropsService(session)

            service.findOneCultivar(params.id).then((response) => {
                setCropId(response.cropId)
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
                <h2 className="titulo-crops" >Constantes de {titulo}</h2>


                <div className="list-constants">
                    <div className="container-button-crops">
                        <NavButton Url={`/cultivars/${cropId}`} page="list" text="Voltar" type="voltar" />
                        <NavButton Url={`/criarConstant/${params.id}`} page="list" text="Cadastrar Constante" type="cadastrar" />
                    </div>

                    <div className="header-list">

                        <div className="header-col-type">
                            Tipo
                        </div>
                        <div className="header-col-reference">
                            Referência
                        </div>
                        <div className="header-col-value">
                            Valor
                        </div>

                        <div className="header-col-acoes-constant">
                            Ações
                        </div>

                    </div>
                    {
                        dados.map((e: dadosConstants) => (
                            <div key={e.id} className="content-list">
                                <div className="result-col-type">
                                    {constantesTraducao[e.type]}      
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