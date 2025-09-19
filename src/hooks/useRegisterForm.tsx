import { useState, useEffect } from "react";
import Auth from "@/services/auth";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserResponseType, UserRoles, UserUpdatePayload } from "@/types/authType";
import { userErrorTranslation } from "@/utils/translationsOptions";
import { validatePassword, validateEmail } from "@/utils/authUtils";

const useRegisterForm = () => {
  const auth = new Auth();
  const router = useRouter();
  const [user, setUser] = useState<UserResponseType>({
    id: "",
    name: "",
    email: "",
    role: UserRoles.OPERATOR, // Um valor padrão do enum
    createdAt: "",
    updatedAt: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [respostaRequisicao, setResposta] = useState<string>("");
  const [session, setSession] = useState<string | null>("");

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const options = [
    { value: "ADMIN", label: "Administrador" },
    { value: "OPERATOR", label: "Operador" },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("@token");

    if (!token) {
    } else {
      setSession(token);
    }
  }, [router]);

  const editUser = async () => {
    if (!user.name) {
      toast.error("Nome é um campo obrigatório para atualizar um usuário!");
      return;
    } else if (!user.email) {
      toast.error("E-mail é um campo obrigatório para atualizar um usuário!");
      return;
    } else if (!validateEmail(user.email)) {
      return; // A função validateEmail já exibe o toast de erro quando silent = false
    } else if (!user.role) {
      toast.error(
        "Tipo de usuário é um campo obrigatório para atualizar um usuário!"
      );
      return;
    } else if (
      (user.oldPassword && !user.password) ||
      (!user.oldPassword && user.password)
    ) {
      toast.error("Você precisa especificar a senha atual e a nova senha!");
      return;
    }

    const updateData: UserUpdatePayload = {
      name: user.name,
      email: user.email,
      oldPassword: user.oldPassword,
      password: user.password,
      role: user.role,
    };

    const data = await auth.update(user.id, updateData);
    // Se houve algum erro
    if (data.errors) {
      if (Array.isArray(data.errors)) {
        data.errors.map((message: string) =>
          toast.error(userErrorTranslation[message] || message)
        );
        return;
      }
      toast.error(data.errors);
      return;
    }
    router.push("/usersList");
    toast.success("Usuário atualizado com sucesso!");
  };

  const editProfile = async () => {
    if (!user.name) {
      toast.error("Nome é um campo obrigatório para atualizar um usuário!");
      return;
    }
    if (!user.email) {
      toast.error("E-mail é um campo obrigatório para atualizar um usuário!");
      return;
    }

    if (!validateEmail(user.email)) return; // A função validateEmail já exibe o toast de erro

    const updateData: UserUpdatePayload = {
      name: user.name,
      email: user.email,
      oldPassword: user.oldPassword,
      password: user.password,
    };

    const data = await auth.updateProfile(updateData);
    // Se houve algum erro
    if (data.errors) {
      if (Array.isArray(data.errors)) {
        data.errors.map((message: string) =>
          toast.error(userErrorTranslation[message] || message)
        );
        return;
      }
      toast.error(data.errors);
      return;
    }

    router.push("/profile");
    return data;
  };

  const cadastroEvento = async () => {
    if (!name) {
      toast.error("Nome é um campo obrigatório para cadastrar um usuário!");
      return;
    }

    if (!email) {
      toast.error("E-mail é um campo obrigatório para cadastrar um usuário!");
      return;
    }

    if (!validateEmail(email)) return; // A função validateEmail já exibe o toast de erro

    if (!role) {
      toast.error(
        "Tipo de usuário é um campo obrigatório para cadastrar um usuário!"
      );
      return;
    }

    if (!validatePassword(password)) return;

    const dadosCadastro = {
      name: name,
      email: email,
      role: role,
      password: password,
    };

    try {
      const response: any = await auth.cadastro(dadosCadastro, session);
      const { status, message } = response;

      if (typeof message === "string" && message === "User already exists")
        toast.error("Esse E-mail já está em uso!");
      else if (Array.isArray(message)) {
        toast.error(userErrorTranslation[message[0]]);
      } else {
        toast.success("Usuário cadastrado com sucesso!");
        router.push("/usersList");
        setResposta(status);
        return true;
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadsatrar usuário!");
      return false;
    }
  };

  useEffect(() => {
    if (respostaRequisicao === "1") {
      toast.success("Usuário cadastrado com sucesso!");
      router.push("/usersList");
    }
  }, [respostaRequisicao, router]);

  return {
    user,
    setUser,
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    password,
    setPassword,
    oldPassword,
    setOldPassword,
    handleRoleChange,
    options,
    editUser,
    cadastroEvento,
    editProfile,
  };
};

export default useRegisterForm;
