"use client";

import Layout from "@/components/layout/layout";
import "../../../styles/crops/pageCrops.css";
import "../../../styles/cultivar/pageCultivar.css";
import Table from "@/components/table/table";
import { useEffect, useState, useCallback } from "react";
import { redirect, useRouter } from "next/navigation";
import { cropsService } from "@/services/crops";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";
import { cultivarsData } from "@/types/cultivarTypes";
import router from "next/router";
import SearchForm from "@/components/forms/SearchForm";
import { toast } from "react-toastify";

interface Props {
  params: { id: string };
}

const Cultivars = ({ params }: Props) => {
  const [dados, setDados] = useState<cultivarsData[]>([]);
  const [filteredData, setFiltredData] = useState<cultivarsData[]>([]);
  const [titulo, setTitulo] = useState<string | any>("");
  const router = useRouter();

  useEffect(() => {
    let session = sessionStorage.getItem("@token");

    if (session) {
      const service = new cropsService(session);

      service.findOne(params.id).then((response) => {
        setDados(response.cultivars);
        setTitulo(response.name);
      });
    } else {
      toast.error("Você não possui permissões para acessar essa página!");
      redirect("/");
    }
  }, []);

  const handleDeleteCultivar = useCallback(
    async (id: string) => {
      let session = sessionStorage.getItem("@token");

      if (session != null) {
        const constantService = new cropsService(session);

        try {
          await constantService.deleteCultivar(id);
          const updatedData = dados.filter((dado) => dado.id !== id);
          setDados(updatedData);
          toast.success("Cultivar removida com sucesso!");
          console.log("Cultivar removida");
        } catch (error) {
          console.error("Falha ao deletar constante:", error);
        }
      } else {
        toast.error("Você não possui permissões para acessar essa pagina !");
        redirect("/");
      }
    },
    [dados]
  );

  useEffect(() => {
    setFiltredData(dados);
  }, [dados]);

  const handleView = (id: string) => {
    window.location.href = `/constant/${id}`;
  };

  const handleEdit = (id: string) => {
    router.replace(`/cultivars/${params.id}/edit/${id}`);
  };

  const columns = [{ header: "Nome", accessor: "name" }];

  const handleSearch = (search: string) => {
    const filtred = dados.filter((cultivar: cultivarsData) =>
      cultivar.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltredData(filtred);
  };

  return (
    <Layout>
      <div className="cropsPage">
        <h2 className="titulo-crops">Cultivares de {titulo}</h2>

        <SearchForm placeholder="Pesquisa por nome" onSearch={handleSearch} />

        <div className="container-button-crops">
          <NavButton Url={"/crops"} page="list" text="Voltar" type="voltar" />
          <NavButton
            Url={`/criarCultivar/${params.id}`}
            page="list"
            text="Cadastrar Cultivar"
            type="cadastrar"
          />
        </div>
        <Table
          data={filteredData}
          columns={columns}
          onView={(id) => handleView(id)}
          onDelete={(id) => handleDeleteCultivar(id)}
          onEdit={(id) => handleEdit(id)}
          translations={{}}
        />
      </div>
    </Layout>
  );
};

export default Cultivars;
