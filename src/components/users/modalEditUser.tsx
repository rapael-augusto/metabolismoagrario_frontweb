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
import { validatePassword, validateEmail } from "@/utils/authUtils";
import { toast } from "react-toastify";

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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    const authService = new Auth();
    const fetchUser = async () => {
      const data = await authService.findOne(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  const handlePasswordChange = (value: string) => {
    setUser((prev) => ({ ...prev, password: value }));

    if (value.trim() === "") {
      setPasswordError(null);
      setErrors((prev) => ({ ...prev, password: "" }));
    } else {
      const error = validatePassword(value, true) as string;
      setPasswordError(error);
      setErrors((prev) => ({ ...prev, password: error || "" }));
    }
  };

  const handleOldPasswordChange = (value: string) => {
    setUser((prev) => ({ ...prev, oldPassword: value }));

    // Remove a validação automática aqui, pois ela será feita apenas no submit
    setErrors((prev) => ({ ...prev, oldPassword: "" }));
  };

  const handleEmailChange = (value: string) => {
    setUser((prev) => ({ ...prev, email: value }));

    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, email: "E-mail é obrigatório." }));
    } else {
      const error = validateEmail(value, true) as string;
      setErrors((prev) => ({ ...prev, email: error || "" }));
    }
  };

  async function handleSubmit() {
    let hasError = false;

    // Verifica se o usuário está tentando alterar a senha
    const hasPasswordChange = user.password && user.password.trim() !== "";

    // Só exige senha atual se estiver tentando alterar a senha
    if (
      hasPasswordChange &&
      (!user.oldPassword || user.oldPassword.trim() === "")
    ) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "Informe sua senha atual para alterar a senha.",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, oldPassword: "" }));
    }

    // Só valida a nova senha se ela foi informada
    if (hasPasswordChange && errors.password) {
      hasError = true;
    }

    // Valida o email
    if (errors.email) {
      hasError = true;
    }

    if (hasError) {
      toast.error("Corrija os erros antes de atualizar.");
      return;
    }
    console.log(user.password, user.oldPassword);
    await editUser();
    handleVisible(false);
    window.location.reload();
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
              type="text"
              placeholder="Informe seu Nome"
              classe="form-input-boxReg"
              label="Nome"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
              value={user.name}
            />
            <Select
              label="Tipo de usuário"
              options={options}
              value={user.role}
              onChange={(value: string) =>
                setUser((prev) => ({ ...prev, role: value as UserRoles }))
              }
              type="form"
            />
          </div>

          <InputDefault
            type="email"
            placeholder="Informe seu E-mail"
            classe="form-input-boxReg"
            label="E-mail"
            onChange={(e) => handleEmailChange(e.target.value)}
            value={user.email}
            errorMsg={errors.email || undefined}
          />

          <InputDefault
            type="password"
            placeholder="Informe sua senha atual"
            classe="form-input-boxReg"
            label="Senha Atual"
            onChange={(e) => handleOldPasswordChange(e.target.value)}
            value={user.oldPassword ?? ""}
            errorMsg={errors.oldPassword || undefined}
          />

          <InputDefault
            type="password"
            placeholder="Informe sua nova senha"
            classe="form-input-boxReg"
            label="Nova Senha"
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={user.password ?? ""}
            legend="A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números."
            errorMsg={passwordError ?? undefined}
          />
        </div>
      </Modal.Main>
      <Modal.Footer
        cancelText="Cancelar"
        submitText="Atualizar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
