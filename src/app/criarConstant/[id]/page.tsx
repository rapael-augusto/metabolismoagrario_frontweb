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
import { typeSelectOptions,  climateSelectOptions, irrigationSelectOptions, cultivationSystemSelectOptions, biomeSelectOptions, soilSelectOptions } from "@/utils/selectOptions";

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
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const [bibliographicReferenceId, setBibliographicReferenceId] = useState<number | null>(null)
    const [authorName, setAuthorName] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState<number>(0)
    const [source, setSource] = useState('')



    const router = useRouter()


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

    const validateFields = () => {
        const newErrors: string[] = [];

        if (!type) newErrors.push("Tipo é um campo obrigatório.")
        if (!value) newErrors.push("Valor é um campo obrigatório.")
        if (!climate) newErrors.push("Clima é um campo obrigatório.")
        if (!biome) newErrors.push("Bioma é um campo obrigatório.")
        if (!irrigation) newErrors.push("Irrigação é um campo obrigatório.")
        if (!country) newErrors.push("País é um campo obrigatório.")
        if (!cultivationSystem) newErrors.push("Sistema de cultivo é um campo obrigatório.")
        if (!reference) newErrors.push("Referência é um campo obrigatório.")

        setErrorMessage(newErrors);
        return newErrors.length === 0;
    }

    const createBibliographicReference = async () => {
        if (token) {
            const service = new cropsService(token)
            const response = await service.createBibliographicReference({
                authorName,
                title,
                year,
                source
            })
            return response.id
        }
    }
    
    const cadastroConstant = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateFields()) {
            return
        }

        let refId = bibliographicReferenceId

        if(!refId) {
            refId = await createBibliographicReference()
            setBibliographicReferenceId(refId)
        }

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
                soil: soil !== 'NaoInformado' ? soil : undefined,
                bibliographicReferenceId: refId
            };

            Object.keys(paramsData).forEach(key => paramsData[key] === undefined && delete paramsData[key])

            let responseConstants: any | responseType = await service.createConstantOfCultivar(params.id, paramsData)

            console.log(responseConstants)
            setResponse(responseConstants.status)
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
                    <div className="form-title">
                        <h2 className="tittle-login">Cadastrar fator de conversão</h2>
                    </div>
                    <form className="form-container">

                        {errorMessage.length > 0 && (
                            <div className="error-message">
                                {errorMessage.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </div>
                        )}

                        <h3>Referência bibliográfica</h3>

                        <InputDefault
                            classe="form-input-box"
                            label="Nome do autor"
                            placeholder="Nome do autor"
                            value={authorName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorName(e.target.value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Título"
                            placeholder="Título"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Ano"
                            placeholder="Ano"
                            value={year ? year.toString() : ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYear(parseInt(e.target.value))}
                            type={'number'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Fonte"
                            placeholder="Fonte"
                            value={source}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSource(e.target.value)}
                            type={'text'}
                        />


                        <h3>Informações sobre o fator de conversão</h3>

                        <Select type="form" label="Tipo" options={typeSelectOptions} onChange={handleTypeChange}/>

                        <InputDefault
                            classe="form-input-box"
                            label="Valor"
                            placeholder="Valor da Constante"
                            value={value} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <div className="container-2-column">
                            <Select type="form" label="Clima" options={climateSelectOptions} onChange={handleClimateChange}/>     
                            <Select type="form" label="Bioma" options={biomeSelectOptions} onChange={handleBiomeChange}/>  
                        </div>

                        <div className="container-2-column">
                            <InputDefault
                                classe="form-input-box"
                                label="País"
                                placeholder="País"
                                value={country}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry((e.target as HTMLInputElement).value)}
                                type={'text'}
                            />

                            <Select type="form" label="Sistema de cultivo" options={cultivationSystemSelectOptions} onChange={handleCultivationSystemChange}/>
                        </div>

                        <div className="container-2-column">
                            <Select type="form" label="Solo" options={soilSelectOptions} onChange={handleSoilChange}/>
                            <Select type="form" label="Irrigação" options={irrigationSelectOptions} onChange={handleIrrigationChange}/>
                        </div>


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

                        <div className="footer-form">
                            <NavButton Url={`/constant/${params.id}`} page="form" text="Voltar" type="voltar" />
                            <Button texto={'Cadastrar'} classe={'form-button'} onclick={cadastroConstant} />
                        </div>

                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default CriarConstant;