import { useState, useEffect } from "react";
import Auth from "@/services/auth";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserResponseType, UserRoles } from "@/types/authType";
import { errorTranslation } from "@/utils/translationsOptions";

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

    const data = await auth.update(user.id, user);
    // Se houve algum erro
    if (data.errors) {
      if (Array.isArray(data.errors)) {
        data.errors.map((message: string) => toast.error(message));
        return;
      }
      toast.error(data.errors);
      return;
    }
    router.push("/usersList");
    toast.success("Usuário atualizado com sucesso!");
  };

  const cadastroEvento = async () => {

    if (!name) {
      toast.error("Nome é um campo obrigatório para cadastrar um usuário!");
    } else if (!email) {
      toast.error("E-mail é um campo obrigatório para cadastrar um usuário!");
    } else if (!role) {
      toast.error(
        "Tipo de usuário é um campo obrigatório para cadastrar um usuário!"
      );
    } else if (!password) {
      toast.error("Senha é um campo obrigatório para cadastrar um usuário!");
    } else {
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
          toast.error(errorTranslation[message[0]]);
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
  };
};

export default useRegisterForm;
