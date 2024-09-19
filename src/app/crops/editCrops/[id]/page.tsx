'use client';

import { useRouter } from 'next/navigation';
import Layout from "@/components/layout/layout";
import "../../../../styles/crops/pageCrops.css";
import "../../../../styles/form/form.css";
import '../../../../styles/home/login.css';
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";
import NavButton from "@/components/layout/navigationButton";
import useCropsForm from "@/app/hooks/useCropsForm";
import { useEffect, useState } from 'react';
import { cropsService } from "@/services/crops";

interface Props {
    params: { id: string }
}

const EditarCrops = ({ params }: Props) => {
    const {
        name,
        setName,
        scientificName,
        setScientificName,
        editarCrop
    } = useCropsForm();

    const router = useRouter();
    const { id } = params;

    const [isLoading, setIsLoading] = useState(true);

    const loadCropData = async () => {
        if (id && typeof id === 'string') {
            const service = new cropsService(sessionStorage.getItem("@token"));
            const crop = await service.findOne(id);
            if (crop) {
                setName(crop.name);
                setScientificName(crop.scientificName);
            }
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        loadCropData(); 
    }, [id]);

    const handleEditCrop = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id && typeof id === 'string') {
            await editarCrop(id);
        }
    };

    return (
        <Layout>
            <div className="cropsPage">
                <div className="list-crops">
                    <form className="formBody-login" onSubmit={handleEditCrop}>
                        <div className="form-title">
                            <h2 className="tittle-login">Editar Cultura</h2> 
                        </div>

                        {!isLoading && ( 
                            <>
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

                                <div className="footer-form">
                                    <NavButton Url="/crops" page="form" text="Voltar" type="voltar" />
                                    <Button texto={'Salvar'} classe={'form-button'} onclick={handleEditCrop} /> {/* Botão atualizado para "Salvar" */}
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default EditarCrops;
