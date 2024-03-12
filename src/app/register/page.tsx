'use client';

import Layout from "@/components/layout/layout";
import { useState } from "react";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import '../../styles/form/form.css'
import '../../styles/home/login.css'

const registerComp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const cadastroEvento = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('cadastro evento')
    }

    return (
        <Layout>
            <div className="feedback-error" >mensagem de erro aqui</div>

            <form className="formBody-login">
                <div className="form-input-box">
                    <h2 className="tittle-login">Cadastrar</h2>
                </div>

                <InputDefault
                    type={'text'}
                    placeholder={'Informe seu Nome'}
                    classe={'form-input-box'}
                    label={'Nome'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value)}
                    value={name}
                />

                <InputDefault
                    type={'email'}
                    placeholder={'Informe seu E-mail'}
                    classe={'form-input-box'}
                    label={'E-mail'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target as HTMLInputElement).value)}
                    value={email}
                />

                <InputDefault
                    type={'password'}
                    placeholder={'Informe sua senha'}
                    classe={'form-input-box'}
                    label={'Senha'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)}
                    value={password}
                />

                <div className="form-input-box">
                    <Button texto={'Cadastrar'} classe={'button-home'} onclick={cadastroEvento} />
                </div>
            </form>
        </Layout>
    );
}

export default registerComp;