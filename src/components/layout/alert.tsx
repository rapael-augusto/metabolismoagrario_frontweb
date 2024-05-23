"use client";

import "@/styles/layout/layout.css"
import { useEffect, useState } from "react";
import Image from "next/image";

interface objetoMensagemType {
    mensagem: string | null
    tipo: string | null
}

const Alert = () => {
    const [mensagem, setMensagem] = useState<string | any>('')
    const [tipoMensagem, setTipoMensagem] = useState<string | any>('hide')

    useEffect(() => {
        let mensagemSessao = sessionStorage.getItem('mensagem')

        if (!(mensagemSessao == null || mensagemSessao == "")) {
            const objetoMensagem: objetoMensagemType = JSON.parse(`${mensagemSessao}`)
            setMensagem(objetoMensagem.mensagem)
            setTipoMensagem(objetoMensagem.tipo)
        }

    }, [mensagem])

    function fecharAlerta() {
        sessionStorage.removeItem('mensagem')
        setTipoMensagem("hide")
        setMensagem("")
    }

    return (
        <div id="box_alerta" className={`alert-box ${tipoMensagem}`}>
            <span id="mensagem_span">
                {mensagem}
            </span>

            <Image
                src={"/close.svg"}
                alt="Fechar"
                width={20}
                height={20}
                onClick={fecharAlerta}
                className={`icone-fechar ${tipoMensagem}`}
            />

        </div>
    );
}

export default Alert;