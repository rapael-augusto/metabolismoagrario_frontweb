"use client";

import "../../../styles/crops/pageCrops.css"
import "../../../styles/form/form.css"
import '../../../styles/home/login.css'

import Layout from "@/components/layout/layout";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";

import { useEffect, useState } from "react";
import { cropsService } from "@/services/crops";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router'

interface Props {
    params: { id: string }
}

interface paramsEntradaConstant {
    type: string
    reference: string
    value: string
    comment: string
}

type responseType = {
    status: number
    mensagem: string
}

const CriarConstant = ({ params }: Props) => {
    const [type, setType] = useState('')
    const [reference, setReference] = useState('')
    const [value, setValue] = useState('')
    const [comment, setComment] = useState('')
    const [token, setToken] = useState<string | null>('')
    const [response,setResponse] = useState('')

    useEffect(() => {
        let session = sessionStorage.getItem('@token')

        if (session) {
            setToken(session)
        } else {
            redirect('/')
        }
    }, [])


    const cadastroConstant = async (e: React.FormEvent) => {
        e.preventDefault()

        let service = new cropsService(token)

        let responseConstants : any | responseType = await service.createConstantOfCrop(params.id, {
            type: type,
            comment: comment,
            reference: reference,
            value: parseFloat(value),
        })
        
        setResponse(responseConstants.status)

    }

    
    if(response == '1'){
        window.location.href = `/constant/${params.id}`
    }

    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login">
                        <div className="form-input-box">
                            <h2 className="tittle-login">Constant Create</h2>
                        </div>

                        <div className="form-input-box">
                            <label htmlFor="">
                                Type
                            </label>
                            <select onChange={(e)=>{ setType(e.target.value)}}>
                                <option value="empty"></option>
                                <option value="HARVEST_INDEX">HARVEST_INDEX</option>
                                <option value="AERIAL_RESIDUE_INDEX">AERIAL_RESIDUE_INDEX</option>
                                <option value="PRODUCT_RESIDUE_INDEX">PRODUCT_RESIDUE_INDEX</option>
                                <option value="PRODUCT_DRY_MATTER_FACTOR">PRODUCT_DRY_MATTER_FACTOR</option>
                                <option value="RESIDUE_DRY_MATTER_FACTOR">RESIDUE_DRY_MATTER_FACTOR</option>
                                <option value="BELOWGROUND_INDEX">BELOWGROUND_INDEX</option>
                                <option value="WEED_AERIAL_FACTOR">WEED_AERIAL_FACTOR</option>
                                <option value="WEED_BELOWGROUND_INDEX">WEED_BELOWGROUND_INDEX</option>
                            </select>
                        </div>



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