"use client";

import Layout from "@/components/layout/layout";
import "../../../styles/crops/pageCrops.css"
import "../../../styles/constant/constantPage.css"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { cropsService } from "@/services/crops";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";

interface Props {
    params: { id: string }
}
interface dadosConstants {
    comment: string
    createdAt: string
    cropId: string
    id: string
    reference: string
    climate: string
    biome: string
    country: string
    type: string
    updatedAt: string
    value: number
    irrigation: "Irrigation" | "Dry"
    cultivationSystem: "Conventional" | "Organic" | "Agroecological"
}

const constant = ({ params }: Props) => {
    const [dados, setDados] = useState<dadosConstants[]>([])
    const [dadosTemp, setDadosTemp] = useState<dadosConstants[]>([]) //state temporario para trabalhar com filtros
    const [titulo, setTitulo] = useState<string | any>('')
    const [cropId, setCropId] = useState<string | any>('')

    const [irrigacao, setIrrigacao] = useState<string>('all')
    const [clima, setClima] = useState<string>('all')

    //set opts

    const irrigationOptions = [
        { value: "all", label: "Todos" },
        { value: "Irrigation", label: "Irrigado" },
        { value: "Dry", label: "Sequeiro" },
    ]

    const climateOptions = [
        { value: "all", label: "Todos" },
        { value: "Tropical", label: "Tropical" },
        { value: "Subtropical", label: "Subtropical" },
        { value: "Desert", label: "Deserto" },
        { value: "Temperate", label: "Temperado" },
        { value: "Mediterranean", label: "Mediterrâneo" },
        { value: "SemiArid", label: "Semiárido" },
        { value: "Subpolar", label: "Frio" },
        { value: "MountainCold", label: "Frio da montanha" },
        { value: "Polar", label: "Polar" },
    ]


    //TRADUÇÕES
    const traducaoConstantes: any = {
        'HARVEST_INDEX': "ÍNDICE DE COLHEITA",
        'AERIAL_RESIDUE_INDEX': "ÍNDICE DE RESÍDUO DA PARTE AÉREA",
        'PRODUCT_RESIDUE_INDEX': "ÍNDICE DE RESÍDUO DO PRODUTO",
        'PRODUCT_DRY_MATTER_FACTOR': "TEOR DA MATÉRIA SECA COLHIDA",
        'RESIDUE_DRY_MATTER_FACTOR': "TEOR DA MATÉRIA SECA RESÍDUO",
        'BELOWGROUND_INDEX': "ÍNDICE DE RAIZ",
        'WEED_AERIAL_FACTOR': "FATOR DE CONVERSÃO PARA ESTIMAR A BIOMASSA AÉREA DAS ADVENTÍCIAS",
        'WEED_BELOWGROUND_INDEX': "ÍNDICE DE RAIZ ADVENTÍCIAS",
    }
    const traducaoClimas: any = {
        "TropicalRainforest": "Floresta tropical",
        "Tropical": "Tropical",
        "Subtropical": "Subtropical",
        "Desert": "Deserto",
        "Temperate": "Temperado",
        "Mediterranean": "Mediterrâneo",
        "SemiArid": "Semi-árido",
        "Subpolar": "Subpolar",
        "MountainCold": "Frio da montanha",
        "Polar": "Polar",
    }
    const traducaoIrrigacao: any = {
        "Irrigation": "Irrigado",
        "Dry": "Sequeiro"
    }
    const traducaoSistemaCultivo: any = {
        "Organic": "Orgânico",
        "Conventional": "Convencional",
        "Agroecological": "Agroecológico",
    }

    //AUTENTICACAO
    useEffect(() => {
        let session = sessionStorage.getItem('@token')

        if (session) {
            const service = new cropsService(session)

            service.findOneCultivar(params.id).then((response) => {
                setCropId(response.cropId)
                setDados(response.constants)
                setDadosTemp(response.constants)
                setTitulo(response.name)
            })


        } else {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }

    }, [])
    
    useEffect(() => {
        let dadosFiltrados = dados

        if(irrigacao != "all"){
            dadosFiltrados = dadosFiltrados.filter((e:dadosConstants) => e.irrigation == irrigacao)
        }

        if(clima != "all"){
            dadosFiltrados = dadosFiltrados.filter((e:dadosConstants) => e.climate == clima)
        }

        setDadosTemp(dadosFiltrados)

    }, [irrigacao, clima, dados])
    
    //VIEW
    return (
        <Layout>
            <div className="cropsPage">
                <h2 className="titulo-crops" >Constantes de {titulo}</h2>


                <div className="list-constants">

                    <div className="container-filtros">
                        <div>
                            <Select type="filter" options={irrigationOptions} onChange={(value) => setIrrigacao(value)} placeholder="Filtrar por irrigação" />
                        </div>
                        <div>
                            <Select type="filter" options={climateOptions} onChange={(value) => setClima(value)} placeholder="Filtrar por clima" />
                        </div>
          
                    </div>

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
                        <div className="header-col-climate">
                            Clima
                        </div>
                        <div className="header-col-biome">
                            Bioma
                        </div>
                        <div className="header-col-country">
                            País
                        </div>
                        <div className="header-col-irrigation">
                            Irrigação
                        </div>
                        <div className="header-col-cultivationSystem">
                            Sistema de cultivo
                        </div>

                        <div className="header-col-acoes-constant">
                            Ações
                        </div>

                    </div>
                    {
                        dadosTemp.map((e: dadosConstants) => (

                            <div key={e.id} className="content-list">
                                <div className="result-col-type">
                                    {traducaoConstantes[e.type]}
                                </div>

                                <div className="result-col-reference">
                                    {e.reference}
                                </div>

                                <div className="result-col-value">
                                    {e.value}
                                </div>
                                <div className="result-col-climate">
                                    {traducaoClimas[e.climate]}
                                </div>
                                <div className="result-col-biome">
                                    {e.biome}
                                </div>
                                <div className="result-col-country">
                                    {e.country}
                                </div>
                                <div className="result-col-irrigation">
                                    {traducaoIrrigacao[e.irrigation]}
                                </div>
                                <div className="result-col-cultivationSystem">
                                    {traducaoSistemaCultivo[e.cultivationSystem]}
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