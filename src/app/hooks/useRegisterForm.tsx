import { useState, useEffect } from "react";
import Auth from "@/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useRegisterForm = () => {
  const auth = new Auth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
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
      toast.error("Você não possui permissões para acessar essa pagina!");
      router.push("/");
    } else {
      setSession(token);
    }
  }, [router]);

  const cadastroEvento = async (e: React.FormEvent) => {
    e.preventDefault();

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

        if (message === "User already exists") {
          toast.error("Esse E-mail já está em uso!");
        } else {
          toast.success("Usuário cadastrado com sucesso!");
          router.push("/usersList");
          setResposta(status);
        }
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        toast.error("Erro ao cadsatrar usuário!");
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
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    password,
    setPassword,
    handleRoleChange,
    options,
    cadastroEvento,
  };
};

export default useRegisterForm;
