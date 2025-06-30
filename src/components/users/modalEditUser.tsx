"use client";
import InputDefault from "@/components/forms/inputDefault";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import Select from "@/components/layout/customSelect";
import useRegisterForm from "@/hooks/useRegisterForm";
import { useEffect, useState } from "react";
import Auth from "@/services/auth";
import { UserRoles } from "@/types/authType";
import Modal from "../modal";
import Button from "../forms/button";

interface Props {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  userId: string;
}

export default function ModalEditUser({
  visible,
  handleVisible,
  userId,
}: Props) {
  const { user, setUser, editUser, options } = useRegisterForm();

  useEffect(() => {
    const authService = new Auth();
    const fetchUser = async () => {
      const data = await authService.findOne(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  function editTeste() {
    editUser;
  }

  return (
    <Modal isOpen={visible} size="lg">
      <Modal.Header
        title="Editar Usuário"
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
                setUser((prevUser) => ({
                  ...prevUser,
                  name: e.target.value,
                }))
              }
              value={user.name}
            />
            <Select
              label="Tipo de usuário"
              options={options}
              value={user.role}
              onChange={(value: string) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  role: value as UserRoles,
                }))
              }
              type={"form"}
            />
          </div>

          <InputDefault
            type={"email"}
            placeholder={"Informe seu E-mail"}
            classe={"form-input-boxReg"}
            label={"E-mail"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prevUser) => ({
                ...prevUser,
                email: e.target.value,
              }))
            }
            value={user.email}
          />

          <InputDefault
            type={"password"}
            placeholder={"Informe sua senha atual"}
            classe={"form-input-boxReg"}
            label={"Senha atual"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prevUser) => ({
                ...prevUser,
                oldPassword: e.target.value,
              }))
            }
            value={user.oldPassword ?? ""}
          />

          <InputDefault
            type={"password"}
            placeholder={"Informe sua senha"}
            classe={"form-input-boxReg"}
            label={"Senha"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prevUser) => ({
                ...prevUser,
                password: e.target.value,
              }))
            }
            value={user.password ?? ""}
          />
        </div>
      </Modal.Main>
      <Modal.Footer
        cancelText="Cancelar"
        submitText="Atualizar"
        onCancel={() => handleVisible(false)}
        onSubmit={editUser}
      />
    </Modal>
  );
}
