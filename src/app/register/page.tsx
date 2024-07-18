'use client';

import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import '../../styles/form/form.css';
import '../../styles/home/login.css';
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";
import useRegisterForm from "../hooks/useRegisterForm"; // Importa o hook

const RegisterComp = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        role,
        password,
        setPassword,
        handleRoleChange,
        options,
        cadastroEvento,
    } = useRegisterForm(); // Usa o hook

    return (
        <Layout>
            <form className="formBody-login" onSubmit={cadastroEvento}>
                <div className="form-input-box">
                    <h2 className="tittle-login">Cadastrar</h2>
                </div>

                <InputDefault
                    type={'text'}
                    placeholder={'Informe seu Nome'}
                    classe={'form-input-box'}
                    label={'Nome'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value)}
                    value={name}
                />

                <InputDefault
                    type={'email'}
                    placeholder={'Informe seu E-mail'}
                    classe={'form-input-box'}
                    label={'E-mail'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target as HTMLInputElement).value)}
                    value={email}
                />

                <Select label="Tipo de usuário" options={options} onChange={handleRoleChange} type={"form"} />

                <InputDefault
                    type={'password'}
                    placeholder={'Informe sua senha'}
                    classe={'form-input-box'}
                    label={'Senha'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)}
                    value={password}
                />

                <div className="form-input-box">
                    <Button texto={'Cadastrar'} classe={'button-home'} onclick={cadastroEvento} />
                    <NavButton Url="/usersList" page="form" text="Voltar" type="voltar" />
                </div>
            </form>
        </Layout>
    );
}

export default RegisterComp;
