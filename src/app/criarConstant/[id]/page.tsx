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
import { useRouter } from "next/navigation";

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
    const [soil, setSoil] = useState('')
    const router = useRouter()
    
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
        { value: "NaoInformado", label: "Não definido" },
        { value: "Seco", label: "Seco" },
        { value: "Semiárido", label: "Semiárido" },
        { value: "Temperado", label: "Temperado" },
        { value: "Frio", label: "Frio" },
        { value: "Mediterrâneo", label: "Mediterrâneo" },
        { value: "Montanha", label: "Montanha" },
    ]
        
    const irrigationOptions = [
        { value: "NaoInformado", label: "Não definido" },
        { value: "Irrigation", label: "Irrigado" },
        { value: "Dry", label: "Sequeiro" },
    ]
            
    const cultivationSystemOptions = [
        { value: "NaoInformado", label: "Não definido" },
        { value: "Conventional", label: "Convencional" },
        { value: "Organic", label: "Orgânico" },
    ]

    const biomeOptions = [
        { value: "NaoInformado", label: "Não definido" },
        { value: "Amazônia", label: "Amazônia" },
        { value: "Biomas de Montanha", label: "Biomas de Montanha" },
        { value: "Cerrado", label: "Cerrado" },
        { value: "Caatinga", label: "Caatinga" },
        { value: "Desertos", label: "Desertos" },
        { value: "Floresta Temperada", label: "Floresta Temperada" },
        { value: "Floresta Tropical", label: "Floresta Tropical" },
        { value: "Floresta Mediterrânea", label: "Floresta Mediterrânea" },
        { value: "Mata Atlântica", label: "Mata Atlântica" },
        { value: "Pampa", label: "Pampa" },
        { value: "Pradarias", label: "Pradarias" },
        { value: "Savanas", label: "Savanas" },
        { value: "Taiga", label: "Taiga" },
        { value: "Tundra", label: "Tundra" },
    ]

    const soilOptions = [
        { value: "NaoInformado", label: "Não definido" },
        { value: "Clayey", label: "Argiloso" },
        { value: "Sandy", label: "Arenoso" },
        { value: "SandyClay", label: "Arenoargiloso" },
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

    const handleBiomeChange = (value: string) => {
        setBiome(value)
    }

    const handleSoilChange = (value: string) => {
        setSoil(value)
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
            
            let paramsData: any = {
                type: type,
                comment: comment,
                reference: reference,
                value: typeof value === 'string' ? parseFloat(value) : value,
                biome: biome !== 'NaoInformado' ? biome : undefined,
                climate: climate !== 'NaoInformado' ? climate : undefined,
                irrigation: irrigation !== 'NaoInformado' ? irrigation : undefined,
                country: country,
                cultivationSystem: cultivationSystem !== 'NaoInformado' ? cultivationSystem : undefined,
                soil: soil !== 'NaoInformado' ? soil : undefined
            };

            Object.keys(paramsData).forEach(key => paramsData[key] === undefined && delete paramsData[key])

            let responseConstants: any | responseType = await service.createConstantOfCultivar(params.id, paramsData)

            console.log(responseConstants)
            setResponse(responseConstants.status)
        }

    }
    

    if (response == '1') {
        sessionStorage.setItem('mensagem', `{"mensagem":"Fator de conversão cadastrado com sucesso !","tipo":"success"}`)
        // window.location.href = `/constant/${params.id}`
        router.push(`/constant/${params.id}`)
    }

    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login">
                        <div className="form-input-box">
                            <h2 className="tittle-login">Cadastrar fator de conversão</h2>
                        </div>

                        <Select type="form" label="Tipo" options={typeOptions} onChange={handleTypeChange}/>

                        <InputDefault
                            classe="form-input-box"
                            label="Valor"
                            placeholder="Valor da Constante"
                            value={value} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <Select type="form" label="Clima" options={climateOptions} onChange={handleClimateChange}/>     

                        <Select type="form" label="Bioma" options={biomeOptions} onChange={handleBiomeChange}/>  

                        <InputDefault
                            classe="form-input-box"
                            label="País"
                            placeholder="País"
                            value={country}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <Select type="form" label="Sistema de cultivo" options={cultivationSystemOptions} onChange={handleCultivationSystemChange}/>

                        {/* SOLO */}

                        <Select type="form" label="Solo" options={soilOptions} onChange={handleSoilChange}/>

                        <Select type="form" label="Irrigação" options={irrigationOptions} onChange={handleIrrigationChange}/>

                        <InputDefault
                            classe="form-input-box"
                            label="Referência"
                            placeholder="Referência"
                            value={reference}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReference((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        {/* trocar por um textarea */}
                        <InputDefault
                            classe="form-input-box"
                            label="Observações"
                            placeholder="Observações"
                            value={comment}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment((e.target as HTMLInputElement).value)}
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