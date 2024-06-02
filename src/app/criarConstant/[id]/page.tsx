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
            sessionStorage.setItem('mensagem', `{"mensagem":"Tipo é um campo obrigatório para cadastrar uma constante !","tipo":"danger"}`)
            location.reload()
        } else if (!value) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Valor é um campo obrigatório para cadastrar uma constante !","tipo":"danger"}`)
            location.reload()
        } else {
            let service = new cropsService(token)
            let responseConstants: any | responseType = await service.createConstantOfCrop(params.id, {
                type: type,
                comment: comment,
                reference: reference,
                value: parseFloat(value),
            })

            setResponse(responseConstants.status)
        }

    }

    if (response == '1') {
        sessionStorage.setItem('mensagem', `{"mensagem":"Cultura cadastrada com sucesso !","tipo":"success"}`)
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

                        <div className="form-input-box">
                            <label htmlFor="">
                                Tipo
                            </label>
                            <select onChange={(e) => { setType(e.target.value) }}>
                                <option value="empty"></option>
                                <option value="HARVEST_INDEX">ÍNDICE DE COLHEITA</option>
                                <option value="AERIAL_RESIDUE_INDEX">ÍNDICE DE RESÍDUOS AÉREOS</option>
                                <option value="PRODUCT_RESIDUE_INDEX">ÍNDICE DE RESÍDUOS DO PRODUTO</option>
                                <option value="PRODUCT_DRY_MATTER_FACTOR">FATOR DE MATÉRIA SECA DO PRODUTO</option>
                                <option value="RESIDUE_DRY_MATTER_FACTOR">FATOR DE MATÉRIA SECA DE RESÍDUO</option>
                                <option value="BELOWGROUND_INDEX">ÍNDICE ABAIXO</option>
                                <option value="WEED_AERIAL_FACTOR">FATOR AÉREO DE ERVAS DANINHAS</option>
                                <option value="WEED_BELOWGROUND_INDEX">ÍNDICE DE ERVAS ABAIXO DO SOLO</option>
                            </select>
                        </div>

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