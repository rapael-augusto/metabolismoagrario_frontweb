'use client';

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css"
import "../../styles/form/form.css"
import '../../styles/home/login.css'
import InputDefault from "@/components/forms/inputDefault";
import { useState } from "react";
import Button from "@/components/forms/button";

const CriarCrops = () => {
    const [name, setName] = useState('')
    const [CientificName, setCientificName] = useState('')

    const cadastroCrops = async (e: React.FormEvent) =>{
        e.preventDefault()
        console.log('cadastro crop logica')
    }

    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login">
                        <div className="form-input-box">
                            <h2 className="tittle-login">Crops Create</h2>
                        </div>

                        <InputDefault
                            classe="form-input-box"
                            label="Name"
                            placeholder="Name crop"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />

                        <InputDefault
                            classe="form-input-box"
                            label="Cientific Name"
                            placeholder="Cientific Name crop"
                            value={CientificName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCientificName((e.target as HTMLInputElement).value)}
                            type={'text'}
                        />
                        
                        <br />
                        <div className="form-input-box">
                            <Button texto={'Create'} classe={'button-home'} onclick={cadastroCrops} />
                        </div>

                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default CriarCrops;