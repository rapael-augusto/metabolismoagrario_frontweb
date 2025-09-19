"use client";

import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";
import useRegisterForm from "@/hooks/useRegisterForm";
import { validateEmail } from "@/utils/authUtils";
import { useState } from "react";

const RegisterComp = () => {
  const [emailError, setEmailError] = useState<string | null>(null);

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
  } = useRegisterForm();

  return (
    <Layout>
      <form className="formBody-login" onSubmit={cadastroEvento}>
        <div className="form-input-boxReg">
          <h2 className="tittle-loginReg">Cadastrar</h2>
        </div>

        <InputDefault
          type={"text"}
          placeholder={"Informe seu Nome"}
          classe={"form-input-boxReg"}
          label={"Nome"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName((e.target as HTMLInputElement).value)
          }
          value={name}
        />
        <Select
          label="Tipo de usuário"
          options={options}
          onChange={handleRoleChange}
          type={"form"}
        />

        <InputDefault
          type={"email"}
          placeholder={"Informe seu E-mail"}
          classe={"form-input-boxReg"}
          label={"E-mail"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = (e.target as HTMLInputElement).value;
            setEmail(value);

            if (value.trim() === "") {
              setEmailError("E-mail é obrigatório.");
            } else {
              const error = validateEmail(value, true) as string;
              setEmailError(error || null);
            }
          }}
          value={email}
          errorMsg={emailError || undefined}
        />

        <InputDefault
          type={"password"}
          placeholder={"Informe sua senha"}
          classe={"form-input-boxReg"}
          label={"Senha"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword((e.target as HTMLInputElement).value)
          }
          value={password}
        />

        <div className="form-input-boxReg">
          <NavButton Url="/usersList" page="form" text="Voltar" type="voltar" />
          <Button
            texto={"Cadastrar"}
            classe={"button-home"}
            onclick={cadastroEvento}
          />
        </div>
      </form>
    </Layout>
  );
};

export default RegisterComp;
