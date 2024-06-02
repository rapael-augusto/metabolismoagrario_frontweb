'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"
import { cropsService } from "@/services/crops";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";

interface dataCropsType {
    createdAt: string,
    id: string,
    name: string,
    scientificName: string,
    climate: string
    updatedAt: string
}

const Crops = () => {
    const [dados, setDados] = useState<dataCropsType[] | any>([]) //state para nao perder todos os dados 
    const [dadosTemp, setDadosTemp] = useState<dataCropsType[] | any>([]) //state auxiliar para setar filtro

    const TraducaoClimas: any = {
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

    useEffect(() => {
        let session = sessionStorage.getItem('@token')
        if (session != null) {

            const crops = new cropsService(session)
            crops.list().then((response) => {
                let climas = Object.keys(response)
                let cropsAgrupadas: dataCropsType | any = []

                climas.forEach((clima) => {
                    if (response[clima].length != 0) {
                        cropsAgrupadas.push(...response[clima])
                    }
                })

                setDados(cropsAgrupadas)
                setDadosTemp(cropsAgrupadas)
            })
        } else {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }

    }, [])

    function filtroCrops(e: any) {

        if (e == 'All') {
            setDadosTemp(dados)
        } else {
            setDadosTemp(dados)
            setDadosTemp(dados.filter((crop: dataCropsType) => crop.climate == e))
        }
    }



    return (
        <Layout>
            <div className="cropsPage">
                <h2 className="titulo-crops" >Lista de culturas</h2>


                <div className="list-crops">
                    <div className="container-button-crops">
                        <NavButton Url="/home" text={"Voltar"} type="voltar" page="list" />
                        <div>
                            <select defaultValue={""} className="filtro_crops" onChange={(e) => { filtroCrops(e.target.value) }}>
                                <option disabled hidden value="">Filtrar por clima</option>
                                <option value="All">Todos os climas</option>
                                <option value="TropicalRainforest">Floresta tropical</option>  
                                <option value="Tropical">Tropical</option>  
                                <option value="Subtropical">Subtropical</option>  
                                <option value="Desert">Deserto</option>  
                                <option value="Temperate">Temperado</option>  
                                <option value="Mediterranean">Mediterrâneo</option>  
                                <option value="SemiArid">Semi-árido</option>  
                                <option value="Subpolar">Subpolar</option>  
                                <option value="MountainCold">Frio da montanha</option>  
                                <option value="Polar">Polar</option> 
                            </select>

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
                        <div className="header-col-climate">
                            Clima
                        </div>
                        <div className="header-col-acoes">
                            Ações
                        </div>
                    </div>
                    {
                        dadosTemp.map((e: dataCropsType) => (
                            <div key={e.id} className="content-list">
                                <div className="result-col-name">
                                    {e.name}
                                </div>
                                <div className="result-col-cientific-name">
                                    {e.scientificName}
                                </div>
                                <div className="header-col-climate">
                                    {TraducaoClimas[e.climate]}
                                </div>
                                <div className="result-col-acoes">
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

export default Crops;