"use client";
import "@/styles/profilePage/profile.css";
import Layout from "@/components/layout/layout";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { useAuthContext } from "@/contexts/auth/authContext";
import { useRouter } from "next/navigation";
import InputDefault from "@/components/forms/inputDefault";
import {
  userKeyTranslation,
  userTypeTranslation,
} from "@/utils/translationsOptions";
import { useEffect, useState } from "react";
import useRegisterForm from "@/hooks/useRegisterForm";
import Auth from "@/services/auth";
import { toast } from "react-toastify";
import { UserResponseType, UserRoles } from "@/types/authType";

const ProfilePage = () => {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalUserData, setOriginalUserData] = useState<UserResponseType | null>(null);

  const { user: formUser, setUser, editUser, options } = useRegisterForm();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

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
      }
      setUser(userData);
      setOriginalUserData(userData);
    }
  }, [user, setUser]);

  function handleCancel(){
    if (originalUserData) {
      setUser(originalUserData);
    }
    setIsEditMode(false);
    setErrors({ name: "", email: "" });
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const newErrors = {
        name: !formUser?.name ? "Nome é obrigatório" : "",
        email: !formUser?.email ? "Email é obrigatório" : "",
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error !== "")) {
        toast.error("Corrija os erros antes de atualizar.");
        return;
      }

      await editUser();
      setIsEditMode(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout isProfileVisible={false}>
      <div className="profile-page-container">
        <h2>Informações do Usuário</h2>
        <div className="profile-card">
          <div className="profile-picture-box">
            <div className="profile-picture">
              <Image
                src={"/Profile.svg"}
                alt="icone perfil"
                width={200}
                height={200}
                style={{ marginTop: "10px" }}
              />
              {!isEditMode && <FaEdit className="edit-icon" title="Editar" />}
            </div>
            <button
              className="update-button"
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
                        ? userTypeTranslation[formUser[key] as UserRoles] || ""
                        : formUser[key] || ""
                    }
                    disabled={key === "role" ? true : !isEditMode || isLoading}
                  />
                )
              )}
          </div>
        </div>
        <div className="button-container">
          {isEditMode ? (
            <button
              className="leave-button"
              onClick={() => handleCancel()}
              disabled={isLoading}
            >
              Cancelar
            </button>
          ) : (
            <>
              <button className="return-button" onClick={() => router.back()}>
                Voltar
              </button>
              <button className="leave-button" onClick={logout}>
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
