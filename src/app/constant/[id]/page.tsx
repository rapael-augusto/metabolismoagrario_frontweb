"use client";

import Layout from "@/components/layout/layout";
import "../../../styles/crops/pageCrops.css"
import "../../../styles/constant/constantPage.css"
import Table from "@/components/table/table";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { cropsService } from "@/services/crops";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";
import { typeFilterOptions, climateFilterOptions, soilFilterOptions, cultivationSystemFilterOptions, irrigationFilterOptions  } from "@/utils/constantFilterOptions";
import { typeTranslation, irrigationTranslation, cultivationSystemTranslation, soilTranslation } from "@/utils/translationsOptions";

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


    const columns = [
        { header: 'Tipo', accessor: 'type' },
        { header: 'Valor', accessor: 'value' },
        { header: 'Clima', accessor: 'climate' },
        { header: 'Bioma', accessor: 'biome' },
        { header: 'País', accessor: 'country' },
        { header: 'Irrigação', accessor: 'irrigation' },
        { header: 'Sistema de cultivo', accessor: 'cultivationSystem' },
        { header: 'Solo', accessor: 'soil' }
    ]

    const handleDeleteConstant = async (id: string) => {
        
        let session = sessionStorage.getItem('@token')
        
        if (session != null) {
            const constant = new cropsService(session)

            try {
                await constant.deleteConstant(id)
                setDados(dadosTemp.filter(dado => dado.id !== id))
                console.log("Fator de conversão removido")
            } catch (error) {
                console.error("Falha ao deletar constante:", error)
            }
        } else {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }
        
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
                
                <div className="container-button-crops">
                    <NavButton Url={`/cultivars/${cropId}`} page="list" text="Voltar" type="voltar" />
                    <NavButton Url={`/criarConstant/${params.id}`} page="list" text="Cadastrar fator de conversão" type="cadastrar" />
                </div>
                
                <h2 className="titulo-crops" >Fatores de conversão de {titulo}</h2>

                <div className="list-constants">

                    <div className="container-filtros">

                        <div>
                            <Select type="filter" options={typeFilterOptions} onChange={(value) => setTipo(value)} placeholder="Filtrar por tipo"/>
                        </div>

                        <div>
                            <Select type="filter" options={climateFilterOptions} onChange={(value) => setClima(value)} placeholder="Filtrar por clima" />
                        </div>

                        <div>
                            <Select type="filter" options={irrigationFilterOptions} onChange={(value) => setIrrigacao(value)} placeholder="Filtrar por irrigação" />
                        </div>
                        
                        <div>
                            <Select type="filter" options={cultivationSystemFilterOptions} onChange={(value) => setSistemaCultivo(value)} placeholder="Filtrar por sistema de cultivo"/>
                        </div>
                        
                        <div>
                            <Select type="filter" options={soilFilterOptions} onChange={(value) => setSolo(value)} placeholder="Filtrar por solo"/>
                        </div>
          
                    </div>

                    <Table data={dadosTemp} columns={columns} onDelete={handleDeleteConstant} />

                    <div className="header-list">

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
                                    {typeTranslation[e.type]}
                                </div>

                                <div className="result-col-value">
                                    {e.value}
                                </div>

                                <div className="result-col-reference">
                                    {e.reference}
                                </div>

                                
                                <div className="result-col-climate">
                                    {e.climate ? e.climate : "Não informado"}
                                </div>

                                <div className="result-col-biome">
                                    {e.biome ? e.biome : "Não informado"}
                                </div>
                                
                                <div className="result-col-country">
                                    {e.country}
                                </div>
                                
                                <div className="result-col-irrigation">
                                    {irrigationTranslation[e.irrigation] ? irrigationTranslation[e.irrigation] : "Não informado"}
                                </div>
                                
                                <div className="result-col-cultivationSystem">
                                    {cultivationSystemTranslation[e.cultivationSystem] ? cultivationSystemTranslation[e.cultivationSystem] : "Não informado"}
                                </div>
                                
                                <div className="result-col-soil">
                                    {soilTranslation[e.soil] ? soilTranslation[e.soil] : "Não informado"}
                                </div>

                                <div className="result-col-acoes-constant">

                                    <Image
                                        src={"/eye.svg"}
                                        alt="visualizar"
                                        width={24}
                                        height={24}
                                    />

                                    <Image
                                        src={"/pencil.svg"}
                                        alt="Editar"
                                        width={24}
                                        height={24}
                                    />
                                    <Image
                                        src={"/delete.svg"}
                                        alt="excluir"
                                        width={24}
                                        height={24}
                                        onClick={() => handleDeleteConstant(e.id)}
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