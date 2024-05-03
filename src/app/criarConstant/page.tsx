"use client";

import "../../styles/crops/pageCrops.css"
import "../../styles/form/form.css"
import '../../styles/home/login.css'

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";

import { useState } from "react";


const CriarConstant = () => {
    const [type, setType] = useState('')
    const [reference, setReference] = useState('')
    const [value, setValue] = useState('')
    const [comment, setComment] = useState('')


    // "type"
    // "reference"
    // "value"
    // "comment"

    const cadastroConstant = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('cadastro constant')
    }


    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login">
                        <div className="form-input-box">
                            <h2 className="tittle-login">Constant Create</h2>
                        </div>

                        <InputDefault
                            classe="form-input-box"
                            label="Type"
                            placeholder="type constant"
                            value={type}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Reference"
                            placeholder="reference"
                            value={reference}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReference((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Value"
                            placeholder="value of Constant"
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        {/* trocar por um textarea */}
                        <InputDefault
                            classe="form-input-box"
                            label="comment"
                            placeholder="comment"
                            value={comment}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <div className="form-input-box">
                            <Button texto={'Create'} classe={'button-home'} onclick={cadastroConstant} />
                        </div>

                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default CriarConstant;