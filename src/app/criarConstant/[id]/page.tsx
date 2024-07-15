"use client";

import "../../../styles/crops/pageCrops.css";
import "../../../styles/form/form.css";
import '../../../styles/home/login.css';

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";
import { typeSelectOptions, climateSelectOptions, irrigationSelectOptions, cultivationSystemSelectOptions, biomeSelectOptions, soilSelectOptions } from "@/utils/selectOptions";
import useConstantForm from "../../hooks/useConstantForm";


interface Props {
    params: { id: string }
}

const CriarConstant = ({ params }: Props) => {
    const {
        type, reference, value, comment, climate, biome, irrigation, cultivationSystem, country, soil,
        authorName, title, year, source, errorMessage,
        handleTypeChange, handleClimateChange, handleIrrigationChange, handleCultivationSystemChange, handleBiomeChange, handleSoilChange,
        setAuthorName, setTitle, setYear, setSource, setReference, setValue, setComment, setCountry,
        cadastroConstant
    } = useConstantForm(params);

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

                        <Select type="form" label="Tipo" options={typeSelectOptions} onChange={handleTypeChange} />

                        <InputDefault
                            classe="form-input-box"
                            label="Valor"
                            placeholder="Valor da Constante"
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <div className="container-2-column">
                            <Select type="form" label="Clima" options={climateSelectOptions} onChange={handleClimateChange} />
                            <Select type="form" label="Bioma" options={biomeSelectOptions} onChange={handleBiomeChange} />
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

                            <Select type="form" label="Sistema de cultivo" options={cultivationSystemSelectOptions} onChange={handleCultivationSystemChange} />
                        </div>

                        <div className="container-2-column">
                            <Select type="form" label="Solo" options={soilSelectOptions} onChange={handleSoilChange} />
                            <Select type="form" label="Irrigação" options={irrigationSelectOptions} onChange={handleIrrigationChange} />
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
};

export default CriarConstant;