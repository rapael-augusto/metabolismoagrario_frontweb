'use client';

import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import '../../styles/form/form.css'
import '../../styles/home/login.css'
import Auth from "@/services/auth";
import { redirect } from "next/navigation";
import NavButton from "@/components/layout/navigationButton";

const registerComp = () => {
    const auth = new Auth
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [respostaRequisicao,setResposta] = useState <string>('')
    const [session,setSession] = useState <string|null>('')

    useEffect(() => {
        const token = sessionStorage.getItem('@token')

        if (!token) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        }else{
            setSession(token)
        }

    }, [])


    const cadastroEvento = async (e: React.FormEvent) => {
        e.preventDefault()

        //validates 
        if (!name) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Nome é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`)
            location.reload()
        } else if (!email) {
            sessionStorage.setItem('mensagem', `{"mensagem":"E-mail é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`)
            location.reload()
        } else if (!role) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Tipo de usuário é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`)
            location.reload()
        } else if (!password) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Senha é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`)
            location.reload()
        } else {
            //requisicao
            const dadosCadastro = {
                name: name,
                email: email,
                role: role,
                password: password,
            };
           
            const response: any = await auth.cadastro(dadosCadastro,session);
            const { status, message } = response;

            if(message == "User already exists"){
                sessionStorage.setItem('mensagem', `{"mensagem":"Esse E-mail não está disponível","tipo":"danger"}`)
                location.reload()
            }

            setResposta(status)
            
        }


    }

    if (respostaRequisicao == "1"){
        sessionStorage.setItem('mensagem', `{"mensagem":"Usuário cadastrado com sucesso !","tipo":"success"}`)
        window.location.href = `/usersList`
    }

    return (
        <Layout>
            {/* <div className="feedback-error" >mensagem de erro aqui</div> */}

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

                <div className="form-input-box">
                    <label htmlFor="">
                        Tipo de usuário
                    </label>
                    <select onChange={(e) => { setRole(e.target.value) }}>
                        <option value="empty"></option>
                        <option value="ADMIN">Administrador</option>
                        <option value="OPERATOR">Operador</option>
                    </select>
                </div>



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
                    <NavButton Url="/usersList" page="form" text="Voltar" type="voltar" />
                </div>
            </form>
        </Layout>
    );
}

export default registerComp;