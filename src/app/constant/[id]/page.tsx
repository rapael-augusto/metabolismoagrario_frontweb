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
    soil: string
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
    const [tipo, setTipo] = useState<string>('all')
    const [sistemaCultivo, setSistemaCultivo] = useState<string>('all')
    const [solo, setSolo] = useState<string>('all')

    //set opts

    const irrigationOptions = [
        { value: "all", label: "Todos" },
        { value: "Irrigation", label: "Irrigado" },
        { value: "Dry", label: "Sequeiro" },
    ]

    const climateOptions = [
        { value: "NaoInformado", label: "Não informado" },
        { value: "Seco", label: "Seco" },
        { value: "Semiárido", label: "Semiárido" },
        { value: "Temperado", label: "Temperado" },
        { value: "Frio", label: "Frio" },
        { value: "Mediterrâneo", label: "Mediterrâneo" },
        { value: "Montanha", label: "Montanha" },
    ]

    const typeOptions = [
        { value: "all", label: "Todos" },
        { value: "HARVEST_INDEX", label: "ÍNDICE DE COLHEITA" },
        { value: "AERIAL_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DA PARTE AÉREA"},
        { value: "PRODUCT_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DO PRODUTO" },
        { value: "PRODUCT_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA COLHIDA"},
        { value: "RESIDUE_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA RESÍDUO" },
        { value: "BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ" },
        { value: "WEED_AERIAL_FACTOR", label: "FATOR DE CONVERSÃO PARA ESTIMAR A BIOMASSA AÉREA DAS ADVENTÍCIAS" },
        { value: "WEED_BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ ADVENTÍCIAS" },
    ]

    const cultivationSystemOptions = [
        { value: "all", label: "Todos" },
        { value: "Agroecological", label: "Agroecológico" },
        { value: "Conventional", label: "Convencional" },
        { value: "Organic", label: "Orgânico" },
    ]

    const soilOptions = [
        { value: "all", label: "Todos" },
        { value: "Clayey", label: "Argiloso" },
        { value: "Sandy", label: "Arenoso" },
        { value: "SandyClay", label: "Arenoargiloso" },
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
    const traducaoIrrigacao: any = {
        "Irrigation": "Irrigado",
        "Dry": "Sequeiro"
    }
    const traducaoSistemaCultivo: any = {
        "Organic": "Orgânico",
        "Conventional": "Convencional",
        "Agroecological": "Agroecológico",
    }
    const traducaoSolo: any = {
        "Clayey": "Argiloso",
        "Sandy": "Arenoso",
        "SandyClay": "Arenoargiloso",
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

        if(tipo != "all"){
            dadosFiltrados = dadosFiltrados.filter((e:dadosConstants) => e.type == tipo)
        }

        if(sistemaCultivo != "all"){
            dadosFiltrados = dadosFiltrados.filter((e:dadosConstants) => e.cultivationSystem == sistemaCultivo)
        }

        if(solo != "all"){
            dadosFiltrados = dadosFiltrados.filter((e:dadosConstants) => e.soil == solo)
        }

        setDadosTemp(dadosFiltrados)

    }, [irrigacao, clima, tipo, sistemaCultivo, dados, solo])
    

    //VIEW
    return (
        <Layout>
            <div className="cropsPage">
                <h2 className="titulo-crops" >Fatores de conversão de {titulo}</h2>


                <div className="list-constants">

                    <div className="container-filtros">
                        <div>
                            <Select type="filter" options={irrigationOptions} onChange={(value) => setIrrigacao(value)} placeholder="Filtrar por irrigação" />
                        </div>
                        <div>
                            <Select type="filter" options={climateOptions} onChange={(value) => setClima(value)} placeholder="Filtrar por clima" />
                        </div>
                        <div>
                            <Select type="filter" options={cultivationSystemOptions} onChange={(value) => setSistemaCultivo(value)} placeholder="Filtrar por sistema de cultivo"/>
                        </div>
                        <div>
                            <Select type="filter" options={typeOptions} onChange={(value) => setTipo(value)} placeholder="Filtrar por tipo"/>
                        </div>
                        <div>
                            <Select type="filter" options={soilOptions} onChange={(value) => setSolo(value)} placeholder="Filtrar por solo"/>
                        </div>
          
                    </div>

                    <div className="container-button-crops">
                        <NavButton Url={`/cultivars/${cropId}`} page="list" text="Voltar" type="voltar" />
                        <NavButton Url={`/criarConstant/${params.id}`} page="list" text="Cadastrar fator de conversão" type="cadastrar" />
                    </div>

                    <div className="header-list">
                        Dados

                        <div className="header-col-type">
                            Tipo
                        </div>
                        <div className="header-col-value">
                            Valor
                        </div>
                        <div className="header-col-reference">
                            Referência
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
                        <div className="header-col-soil">
                            Solo
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

                                <div className="result-col-value">
                                    {e.value}
                                </div>

                                <div className="result-col-reference">
                                    {e.reference}
                                </div>

                                
                                <div className="result-col-climate">
                                    {e.climate ? e.climate : "Não definido"}
                                </div>
                                <div className="result-col-biome">
                                    {e.biome ? e.biome : "Não definido"}
                                </div>
                                <div className="result-col-country">
                                    {e.country}
                                </div>
                                <div className="result-col-irrigation">
                                    {traducaoIrrigacao[e.irrigation] ? traducaoIrrigacao[e.irrigation] : "Não definido"}
                                </div>
                                <div className="result-col-cultivationSystem">
                                    {traducaoSistemaCultivo[e.cultivationSystem] ? traducaoSistemaCultivo[e.cultivationSystem] : "Não definido"}
                                </div>
                                <div className="result-col-soil">
                                    {traducaoSolo[e.soil] ? traducaoSolo[e.soil] : "Não definido"}
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