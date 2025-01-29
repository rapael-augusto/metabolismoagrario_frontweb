import { useState, useEffect } from "react";
import { cropsService } from "@/services/crops";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { cultivarService } from "@/services/cultivar";
import { getRoleFromStorage, initializeRoleInStorage } from "@/utils/authUtils";

const useCultivarForm = (id: string) => {
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    initializeRoleInStorage();
    const roleFromStorage = getRoleFromStorage();
    setRole(roleFromStorage);
  }, []);
  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem("@token");
    if (session) {
      setToken(session);
    } else {
      toast.error("Você não possui permissões para acessar essa pagina!");
      redirect("/");
    }
  }, []);

  const cadastroCultivar = async () => {
    if (!name) {
      toast.error("Nome é um campo obrigatório para cadastrar uma cultivar!");
      return false;
    } else if (token) {
      const cultivarSer = new cultivarService(token);
      const service = new cropsService(token);
      let respostaRequisicao = null;
      if (role === "ADMIN") {
        respostaRequisicao = await service.createCultivar(id, { name });
      } else {
        respostaRequisicao = await cultivarSer.createCultivarReview(id, {
          name,
        });
      }
      if (respostaRequisicao) {
        const { status } = respostaRequisicao;
        setResponse(status.toString()); // Converter status para string se necessário

        if (role === "ADMIN") {
          toast.success("A cultivar foi criada com sucesso!");
        } else {
          toast.info("Sua solicitação de cadastro de cultivar foi criada!");
        }
      } else {
        setResponse("-1");
      }
      return true;
    }
  };

  const editarCultivar = async (cultivarId: string) => {
    if (!name) {
      toast.error("Nome é um campo obrigatório para atualizar uma cultivar!");
    } else if (token) {
      const service = new cultivarService(token);
      const respostaRequisicao = await service.update(cultivarId, { name });

      if (respostaRequisicao) {
        const { status } = respostaRequisicao;
        toast.success("Cultivar atualizada com sucesso!");
        setResponse(status.toString()); // Converter status para string se necessário
      } else {
        toast.error("Houve um erro ao atualizar!");
        setResponse("-1");
      }
    }
  };

  useEffect(() => {
    if (response === "1") {
      window.location.reload();
    }
  }, [response, id]);

  return {
    name,
    setName,
    cadastroCultivar,
    editarCultivar,
  };
};

export default useCultivarForm;
