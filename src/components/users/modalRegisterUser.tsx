"use client";

import Layout from "@/components/layout/layout";
import Button from "@/components/forms/button";
import InputDefault from "@/components/forms/inputDefault";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";
import useRegisterForm from "@/hooks/useRegisterForm";
import Modal from "../modal";
import { filterTextInput } from "@/utils/filterTextInput";
import { useState } from "react";
import { validatePassword, validateEmail } from "@/utils/authUtils";

interface Props {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
}

export default function ModalRegisterUser({ visible, handleVisible }: Props) {
  const [passwordError, setPasswordError] = useState<string | null>(null);
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

  async function handleSubmit() {
    if (await cadastroEvento()) {
      handleVisible(false);
      window.location.reload();
    }
  }

  return (
    <Modal isOpen={visible} size="lg">
      <Modal.Header
        title="Cadastrar usuário"
        description=""
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        <div className="user-form">
          <div className="container-2-column">
            <InputDefault
              type={"text"}
              placeholder={"Informe seu Nome"}
              classe={"form-input-boxReg"}
              label={"Nome"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(filterTextInput((e.target as HTMLInputElement).value))
              }
              value={name}
            />
            <Select
              label="Tipo de usuário"
              options={options}
              onChange={handleRoleChange}
              type={"form"}
              placeholder={"Selecione o tipo de usuário"}
            />
          </div>

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
            legend="A senha deve ter pelo menos 8 caracteres, incluindo letras
                    maiúsculas, minúsculas e números."
            placeholder={"Informe sua senha"}
            classe={"form-input-boxReg"}
            label={"Senha"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = (e.target as HTMLInputElement).value;
              setPassword(value);

              if (value.trim() === "") {
                setPasswordError(null);
              } else {
                const error = validatePassword(value, true) as string;
                setPasswordError(error);
              }
            }}
            errorMsg={passwordError ?? undefined}
            value={password}
          />
        </div>
      </Modal.Main>
      <Modal.Footer
        cancelText="Voltar"
        submitText="Cadastrar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}