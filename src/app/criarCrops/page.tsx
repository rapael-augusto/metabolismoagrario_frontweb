'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"
import "../../styles/form/form.css"
import '../../styles/home/login.css'
import InputDefault from "@/components/forms/inputDefault";
import { useEffect, useState } from "react";
import Button from "@/components/forms/button";
import { cropsService } from "@/services/crops";
import { redirect } from "next/navigation";
import NavButton from "@/components/layout/navigationButton";
import { responseCropsCreate } from "@/types/cropsTypes";

const CriarCrops = () => {

    const [name, setName] = useState('')
    const [scientificName, setScientificName] = useState('')
    const [response, setResponse] = useState<1 | -1>(-1)

    useEffect(() => {
        let session = sessionStorage.getItem('@token')

        if (!session) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }
    }, [])

    const cadastroCrops = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Nome é um campo obrigatório para cadastrar uma cultura !","tipo":"danger"}`)
            location.reload()
        } else if (!scientificName) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Nome científico é um campo obrigatório para cadastrar uma cultura !","tipo":"danger"}`)
            location.reload()
        }else {
            let session = sessionStorage.getItem('@token')
            let service = new cropsService(session)

            let respostaRequisicao: any | responseCropsCreate = await service.create({
                name: name,
                scientificName: scientificName
            })

            const { status, mensagem } = respostaRequisicao
            setResponse(status)
        }

    }


    if (response == 1) {
        redirect('/crops')
    }

    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login">
                        <div className="form-input-box">
                            <h2 className="tittle-login">Cadastrar cultura</h2>
                        </div>

                        <InputDefault
                            classe="form-input-box"
                            label="Nome"
                            placeholder="Nome"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Nome Científico"
                            placeholder="Nome Científico"
                            value={scientificName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScientificName((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <br />

                        <div className="form-input-box">
                            <Button texto={'Cadastrar'} classe={'button-home'} onclick={cadastroCrops} />
                            <NavButton Url="/crops" page="form" text="Voltar" type="voltar" />
                        </div>

                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default CriarCrops;