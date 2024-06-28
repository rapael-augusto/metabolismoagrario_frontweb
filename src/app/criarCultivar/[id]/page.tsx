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
import { CreateCultivarResponseType } from "@/types/cultivarTypes";

interface Props {
    params: { id: string }
}

const CriarCultivar = ({ params }: Props) => {
    const [name, setName] = useState('')
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

    const cadastroCultivar = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Nome é um campo obrigatório para cadastrar uma cultivar !","tipo":"danger"}`)
            location.reload()
        }else{
            const service = new cropsService(token)

            let respostaRequisicao: any | CreateCultivarResponseType = await service.createCultivar(params.id,{
                name: name
            })

            const { status, mensagem } = respostaRequisicao
            setResponse(status)
        }
    }

    if(response == "1"){
        redirect(`/cultivars/${params.id}`)
    }

    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login">
                        <div className="form-input-box">
                            <h2 className="tittle-login">Cadastrar cultivar</h2>
                        </div>
                    
                        <InputDefault
                            classe="form-input-box"
                            label="Nome Cultivar"
                            placeholder="Nome Cultivar"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />
                        
                        <br />
                        <div className="form-input-box">
                            <Button texto={'Cadastrar'} classe={'button-home'} onclick={cadastroCultivar} />
                            <NavButton Url={`/cultivars/${params.id}`} page="form" text="Voltar" type="voltar" />
                        </div>

                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default CriarCultivar;