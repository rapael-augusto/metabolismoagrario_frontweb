"use client";
import "@/styles/profilePage/profile.css";
import Layout from "@/components/layout/layout";
import { useAuthContext } from "@/contexts/auth/authContext";
import { useRouter } from "next/navigation";
import InputDefault from "@/components/forms/inputDefault";
import {
  userKeyTranslation,
  userTypeTranslation,
} from "@/utils/translationsOptions";
import { useEffect, useState } from "react";
import useRegisterForm from "@/hooks/useRegisterForm";
import { toast } from "react-toastify";
import { UserResponseType, UserRoles } from "@/types/authType";
import { validatePassword } from "@/utils/authUtils";

const ProfilePage = () => {
  const router = useRouter();
  const { user, logout, handleSetUser } = useAuthContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalUserData, setOriginalUserData] =
    useState<UserResponseType | null>(null);

  const { user: formUser, setUser, editProfile } = useRegisterForm();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    oldPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const userData = {
        id: "",
        name: user.name,
        email: user.email,
        role: user.role as UserRoles,
        oldPassword: "",
        password: "",
        createdAt: "",
        updatedAt: "",
      };
      setUser(userData);
      setOriginalUserData(userData);
    }
  }, [user, setUser]);

  function handleCancel() {
    if (originalUserData) {
      setUser(originalUserData);
    }
    setIsEditMode(false);
    setErrors({ name: "", email: "", oldPassword: "" });
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      console.log(formUser.password);
      console.log(formUser.oldPassword);
      const isUnchanged =
        originalUserData?.name === formUser.name &&
        originalUserData.email === formUser.email &&
        (!formUser.password || formUser.password === "") &&
        (!formUser.oldPassword || formUser.oldPassword === "");

      const newErrors = {
        name: !formUser?.name
          ? "Nome é obrigatório"
          : isUnchanged
          ? "Nenhum dado foi atualizado!"
          : "",
        email: !formUser?.email ? "Email é obrigatório" : "",
        oldPassword:
          formUser.oldPassword && formUser.oldPassword === formUser.password
            ? "As senhas não podem ser iguais!"
            : !formUser.oldPassword && (formUser.password && formUser.password !== "")
            ? "Informe sua senha atual para alterar os dados."
            : "",
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error !== "")) {
        toast.error(
          Object.values(newErrors)
            .filter((msg) => msg)
            .join(" ")
        );
        return;
      }

      // if(!isUnchanged){
      //   if (!validatePassword(formUser.password || "")) return;
      // }
      
      const ret = await editProfile();

      if (ret) {
        handleSetUser(ret);
        toast.success("Perfil atualizado com sucesso!");
        setIsEditMode(false);
      }

    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setIsLoading(false);
    }
  }

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

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "Informe sua senha atual para alterar os dados.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, oldPassword: "" }));
    }
  };

  return (
    <Layout isProfileVisible={false}>
      <div className="profile-page-container">
        <h2 className="profile-page-title">Informações do Usuário</h2>
        <div className="profile-card">
          <div className="profile-picture-box">
            {/* <div className="profile-picture">
              <Image
                src={"/Profile.svg"}
                alt="icone perfil"
                width={200}
                height={200}
                style={{ marginTop: "10px" }}
              />
              {!isEditMode && <FaEdit className="edit-icon" title="Editar" />}
            </div> */}
          </div>
          <div className="profile-info-wrapper">
            <div className="profile-info-box">
              {formUser &&
                (["name", "email", "role"] as Array<keyof typeof user>).map(
                  (key) => (
                    <InputDefault
                      key={key}
                      type={"text"}
                      placeholder={""}
                      classe={"form-input-boxReg"}
                      label={`${userKeyTranslation[key]}:`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUser((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }));
                      }}
                      value={
                        key === "role"
                          ? userTypeTranslation[formUser[key] as UserRoles] ||
                            ""
                          : formUser[key] || ""
                      }
                      disabled={
                        key === "role" ? true : !isEditMode || isLoading
                      }
                    />
                  )
                )}
              {isEditMode && (
                <>
                  <InputDefault
                    type="password"
                    placeholder="Informe sua senha atual"
                    classe="form-input-boxReg"
                    label="Senha Atual"
                    onChange={(e) => handleOldPasswordChange(e.target.value)}
                    value={formUser?.oldPassword ?? ""}
                    errorMsg={errors.oldPassword || undefined}
                  />

                  <InputDefault
                    type="password"
                    placeholder="Informe sua nova senha"
                    classe="form-input-boxReg"
                    label="Nova Senha"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    value={formUser?.password ?? ""}
                    legend="A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números."
                    errorMsg={passwordError ?? undefined}
                  />
                </>
              )}
            </div>
            <button
              className="profile-button update-button"
              onClick={() => {
                isEditMode ? handleSubmit() : setIsEditMode(!isEditMode);
              }}
            >
              {isLoading
                ? "Processando..."
                : isEditMode
                ? "Atualizar"
                : "Editar Perfil"}
            </button>
          </div>
        </div>
        <div className="button-container">
          {isEditMode ? (
            <button
              className="profile-button leave-button"
              onClick={() => handleCancel()}
              disabled={isLoading}
            >
              Cancelar
            </button>
          ) : (
            <>
              <button className="profile-button return-button" onClick={() => router.back()}>
                Voltar
              </button>
              <button className="profile-button leave-button" onClick={logout}>
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
