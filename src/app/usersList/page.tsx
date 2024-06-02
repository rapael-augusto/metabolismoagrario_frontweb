'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import NavButton from "@/components/layout/navigationButton";
import Image from "next/image";
import Auth from "@/services/auth";

interface DataUserType {
    id: string
    name: string
    email: string
    role: "ADMIN" | "OPERATOR"
}

const UsersList = () => {
    const [dados, setDados] = useState<DataUserType[]>([])

    useEffect(() => {
        const token = sessionStorage.getItem('@token')

        if (!token) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`)
            redirect('/')
        } else {
            const auth = new Auth

            auth.UsersList(token).then((res) => {
                setDados(res)
            })
        }
    }, [])

    return (
        <Layout>
            <div className="cropsPage">
                <h2 className="titulo-crops" >Lista de usuários</h2>

                <div className="list-crops">
                    <div className="container-button-crops">
                        <NavButton Url="/home" text={"Voltar"} type="voltar" page="list" />
                        <NavButton Url="/register" text={"Cadastrar usuário"} type="cadastrar" page="list" />
                    </div>

                    <div className="header-list">

                        <div className="header-col-name">
                            Nome
                        </div>
                        <div className="header-col-cientific-name">
                            E-mail
                        </div>
                        <div className="header-col-climate">
                            Tipo
                        </div>
                        <div className="header-col-acoes">
                            Ações
                        </div>
                    </div>
                    {
                        dados.map((user: DataUserType) => (
                            <div key={user.id} className="content-list">
                                <div className="result-col-name">
                                    {user.name}
                                </div>
                                <div className="result-col-cientific-name">
                                    {user.email}
                                </div>
                                <div className="header-col-climate">
                                    {user.role}
                                </div>
                                <div className="result-col-acoes">
                                    <Image
                                        src={"/visualizar.svg"}
                                        alt="visualizar"
                                        width={20}
                                        height={20}
                                    />
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

export default UsersList;