"use client";

import "../../../styles/form/form.css";
import '../../../styles/home/login.css';

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";
import NavButton from "@/components/layout/navigationButton";
import CustomSelect from "@/components/layout/customSelect";
import Select, { SingleValue } from 'react-select'
import { typeSelectOptions, climateSelectOptions, irrigationSelectOptions, cultivationSystemSelectOptions, biomeSelectOptions, soilSelectOptions } from "@/utils/selectOptions";
import useConstantForm from "../../hooks/useConstantForm";
import { countriesService } from "@/services/countries";
import { useEffect, useState } from "react";

interface Props {
    params: { id: string }
}

const CriarConstant = ({ params }: Props) => {
    const {
        type, reference, value, comment, climate, biome, irrigation, cultivationSystem, country, soil, customSoil,
        authorName, title, year, source, errorMessage, countries,
        handleTypeChange, handleClimateChange, handleIrrigationChange, handleCultivationSystemChange, handleBiomeChange, handleSoilChange, handleCountryChange,
        setAuthorName, setTitle, setYear, setSource, setSoil, setReference, setValue, setComment, setCountry, setCustomSoil,
        cadastroConstant, createCustomSoil
    } = useConstantForm(params);

    const renderCountriesList = () => {
        return countries.map((country, index) => (
            <li key={index}>{country.nome_pais}</li>
        ));
    };

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

                        <h3>Informações sobre o fator de conversão</h3>

                        <CustomSelect type="form" label="Tipo" options={typeSelectOptions} onChange={handleTypeChange} />

                        <InputDefault
                            classe="form-input-boxConst"
                            label="Valor"
                            placeholder="Valor da Constante"
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <div className="container-2-column">
                            <CustomSelect type="form" label="Clima" options={climateSelectOptions} onChange={handleClimateChange} />
                            <CustomSelect type="form" label="Bioma" options={biomeSelectOptions} onChange={handleBiomeChange} />
                        </div>

                        <div className="container-2-column">
                            <CustomSelect type="form" label="País" options={countries.map(country => ({ value: country.nome_pais, label: country.nome_pais }))} onChange={handleCountryChange} />
                            <CustomSelect type="form" label="Sistema de cultivo" options={cultivationSystemSelectOptions} onChange={handleCultivationSystemChange} />
                        </div>

                        <div className="container-2-column">
                            <CustomSelect
                                type="form"
                                label="Solo"
                                options={soilSelectOptions}
                                onChange={(value: string) => {
                                    handleSoilChange(value);
                                    if (value === 'Other') {
                                        setSoil('Other')
                                        setCustomSoil('');
                                    } else {
                                        setSoil(value);
                                        setCustomSoil(null);
                                    }
                                }}
                            />
                            {soil === 'Other' && (
                                <InputDefault
                                    classe="form-input-boxConst"
                                    label="Solo Personalizado"
                                    placeholder="Digite o solo"
                                    value={customSoil}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomSoil(e.target.value)}
                                    type="text"
                                />
                            )}

                            <CustomSelect type="form" label="Irrigação" options={irrigationSelectOptions} onChange={handleIrrigationChange} />
                        </div>

                        <InputDefault
                            classe="form-input-boxConst"
                            label="Referência"
                            placeholder="Referência"
                            value={reference}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReference((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        {/* trocar por um textarea */}
                        <InputDefault
                            classe="form-input-boxConst"
                            label="Observações"
                            placeholder="Observações"
                            value={comment}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <div className="footer-formConst">
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