"use client";

import "../../../styles/crops/pageCrops.css"
import "../../../styles/form/form.css"
import '../../../styles/home/login.css'

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";

import { useEffect, useState } from "react";
import { cropsService } from "@/services/crops";
import { redirect } from "next/navigation";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";

interface Props {
    params: { id: string }
}

type responseType = {
    status: number
    mensagem: string
}

const CriarConstant = ({ params }: Props) => {
    const [type, setType] = useState('')
    const [reference, setReference] = useState('')
    const [value, setValue] = useState('')
    const [comment, setComment] = useState('')
    const [token, setToken] = useState<string | null>('')
    const [response, setResponse] = useState('')
    const [climate, setClimate] = useState('')
    const [biome, setBiome] = useState('')
    const [irrigation, setIrrigation] = useState('')
    const [cultivationSystem, setCultivationSysten] = useState('')
    const [country, setCountry] = useState('')
    
    const typeOptions = [
        { value: "HARVEST_INDEX", label: "ÍNDICE DE COLHEITA" },
        { value: "AERIAL_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DA PARTE AÉREA"},
        { value: "PRODUCT_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DO PRODUTO" },
        { value: "PRODUCT_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA COLHIDA"},
        { value: "RESIDUE_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA RESÍDUO" },
        { value: "BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ" },
        { value: "WEED_AERIAL_FACTOR", label: "FATOR DE CONVERSÃO PARA ESTIMAR A BIOMASSA AÉREA DAS ADVENTÍCIAS" },
        { value: "WEED_BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ ADVENTÍCIAS" },
    ]

    const climateOptions = [
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
        
    const irrigationOptions = [
        { value: "Irrigation", label: "Irrigado" },
        { value: "Dry", label: "Sequeiro" },
    ]
            
    const cultivationSystemOptions = [
        { value: "Conventional", label: "Convencional" },
        { value: "Organic", label: "Orgânico" },
        { value: "Agroecological", label: "Agroecológico" },
    ]
                
          
    const handleTypeChange = (value: string) => {
        setType(value)
    }

    const handleClimateChange = (value: string) => {
        setClimate(value)
    }

    const handleIrrigationChange = (value: string) => {
        setIrrigation(value)
    }

    const handleCultivationSystemChange = (value: string) => {
        setCultivationSysten(value)
    }

    useEffect(() => {
        let session = sessionStorage.getItem('@token')

        if (session) {
            setToken(session)
        } else {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }
    }, [])


    const cadastroConstant = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!type) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Tipo é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else if (!value) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Valor é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else if (!climate){
            sessionStorage.setItem('mensagem', `{"mensagem":"Clima é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else if (!biome){
            sessionStorage.setItem('mensagem', `{"mensagem":"Bioma é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else if (!irrigation){
            sessionStorage.setItem('mensagem', `{"mensagem":"Irrigação é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else if (!country){
            sessionStorage.setItem('mensagem', `{"mensagem":"País é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else if (!cultivationSystem){
            sessionStorage.setItem('mensagem', `{"mensagem":"Sistema de cultivo é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else if (!reference){
            sessionStorage.setItem('mensagem', `{"mensagem":"Referência é um campo obrigatório para cadastrar uma constante!","tipo":"danger"}`)
            location.reload()
        } else {
            let service = new cropsService(token)
            let responseConstants: any | responseType = await service.createConstantOfCultivar(params.id, {
                type: type,
                comment: comment,
                reference: reference,
                value: typeof value === 'string' ? parseFloat(value) : value,
                biome: biome,
                climate: climate, 
                irrigation: irrigation, 
                country: country, 
                cultivationSystem: cultivationSystem
            })

            console.log(responseConstants)
            setResponse(responseConstants.status)
        }

    }
    

    if (response == '1') {
        sessionStorage.setItem('mensagem', `{"mensagem":"Constante cadastrada com sucesso !","tipo":"success"}`)
        window.location.href = `/constant/${params.id}`
    }

    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login">
                        <div className="form-input-box">
                            <h2 className="tittle-login">Cadastrar constante</h2>
                        </div>

                        <Select type="form" label="Tipo" options={typeOptions} onChange={handleTypeChange}/>

                        <InputDefault
                            classe="form-input-box"
                            label="Referência"
                            placeholder="Referência"
                            value={reference}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReference((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Valor"
                            placeholder="Valor da Constante"
                            value={value} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        {/* trocar por um textarea */}
                        <InputDefault
                            classe="form-input-box"
                            label="Comentário"
                            placeholder="Comentário"
                            value={comment}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <Select type="form" label="Clima" options={climateOptions} onChange={handleClimateChange}/>

                        <Select type="form" label="Irrigação" options={irrigationOptions} onChange={handleIrrigationChange}/>

                        <Select type="form" label="Sistema de cultivo" options={cultivationSystemOptions} onChange={handleCultivationSystemChange}/>


                        <InputDefault
                            classe="form-input-box"
                            label="Bioma"
                            placeholder="Bioma"
                            value={biome}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBiome((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="País"
                            placeholder="País"
                            value={country}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <div className="form-input-box">
                            <Button texto={'Cadastrar'} classe={'button-home'} onclick={cadastroConstant} />
                            <NavButton Url={`/constant/${params.id}`} page="form" text="Voltar" type="voltar" />
                        </div>

                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default CriarConstant;