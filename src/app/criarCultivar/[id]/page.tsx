'use client';

import "../../../styles/crops/pageCrops.css"
import "../../../styles/form/form.css"
import '../../../styles/home/login.css'

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";
import NavButton from "@/components/layout/navigationButton";
import useCultivarForm from "@/app/hooks/useCultivarForm";

interface Props {
    params: { id: string }
}

const CriarCultivar = ({ params }: Props) => {
    const {
        name,
        setName,
        cadastroCultivar
    } = useCultivarForm(params.id);

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
