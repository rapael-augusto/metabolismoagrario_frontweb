'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css";
import "../../styles/form/form.css";
import '../../styles/home/login.css';
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";
import NavButton from "@/components/layout/navigationButton";
import useCropsForm from "@/app/hooks/useCropsForm";

const CriarCrops = () => {
    const {
        name,
        setName,
        scientificName,
        setScientificName,
        cadastroCrops
    } = useCropsForm();

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Nome Científico"
                            placeholder="Nome Científico"
                            value={scientificName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScientificName(e.target.value)}
                            type={'text'}
                        />

                        <br />

                        <div className="form-input-box">
                            <NavButton Url="/crops" page="form" text="Voltar" type="voltar" />
                            <Button texto={'Cadastrar'} classe={'button-home'} onclick={cadastroCrops} />
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CriarCrops;
