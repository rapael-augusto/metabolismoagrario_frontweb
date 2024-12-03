import { useState, useEffect } from "react";
import { cropsService } from "@/services/crops";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const useCultivarForm = (id: string) => {
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("@token");
    if (session) {
      setToken(session);
    } else {
      toast.error("Você não possui permissões para acessar essa pagina!");
      redirect("/");
    }
  }, []);

  const cadastroCultivar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Nome é um campo obrigatório para cadastrar uma cultivar!");
    } else if (token) {
      const service = new cropsService(token);
      const respostaRequisicao = await service.createCultivar(id, { name });

      if (respostaRequisicao) {
        const { status } = respostaRequisicao;
        setResponse(status.toString()); // Converter status para string se necessário
      } else {
        setResponse("-1");
      }
    }
  };

  useEffect(() => {
    if (response === "1") {
      redirect(`/cultivars/${id}`);
    }
  }, [response, id]);

  return {
    name,
    setName,
    cadastroCultivar,
  };
};

export default useCultivarForm;
