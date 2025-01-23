"use client";

import Layout from "@/components/layout/layout";
import "../../../styles/crops/pageCrops.css";
import "../../../styles/cultivar/pageCultivar.css";
import Table from "@/components/table/table";
import { useEffect, useState, useCallback } from "react";
import { redirect, useRouter } from "next/navigation";
import { cropsService } from "@/services/crops";
import NavButton from "@/components/layout/navigationButton";
import { cultivarsData } from "@/types/cultivarTypes";
import SearchForm from "@/components/forms/SearchForm";
import { toast } from "react-toastify";
import Modal from "@/components/modal";
import { cultivarService } from "@/services/cultivar";
import { getRoleFromStorage, initializeRoleInStorage } from "@/utils/authUtils";

interface Props {
  params: { id: string };
}

const Cultivars = ({ params }: Props) => {
  const [dados, setDados] = useState<cultivarsData[]>([]);
  const [selectedCultivar, setSelectedCultivar] = useState<cultivarsData>();
  const [filteredData, setFiltredData] = useState<cultivarsData[]>([]);
  const [titulo, setTitulo] = useState<string | any>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    initializeRoleInStorage();
    const roleFromStorage = getRoleFromStorage();
    setRole(roleFromStorage);
  }, []);
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

  const handleOpenModal = (id: string) => {
    const cultivar = dados.find((item) => item.id === id);
    setSelectedCultivar(cultivar);
    setIsModalOpen(true);
  };

  const handleApproveCultivar = async (approved: boolean) => {
    const service = new cultivarService(null);
    if (selectedCultivar?.id) {
      const status = approved ? "Approved" : "Declined";
      await service.update(selectedCultivar.id, {
        status: status,
        name: selectedCultivar.name,
      });
      setDados((prevDados) =>
        prevDados.map((cultivar) =>
          cultivar.id === selectedCultivar.id
            ? { ...selectedCultivar, status }
            : cultivar
        )
      );
    }
    setIsModalOpen(false);
  };

  const columns = [
    { header: "Status", accessor: "status", type: "STATUS" },
    { header: "Nome", accessor: "name" },
  ];

  const handleSearch = (search: string) => {
    const filtred = dados.filter((cultivar: cultivarsData) =>
      cultivar.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltredData(filtred);
  };

  const checkPermissions = {
    changeStatus: role === "ADMIN",
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
          onChangeStatus={(id) => handleOpenModal(id)}
          permissions={checkPermissions}
          translations={{}}
        />
        <Modal isOpen={isModalOpen} size="sm">
          <Modal.Header
            title="Aprovar cultivar"
            description=""
            onClose={() => setIsModalOpen(false)}
          />
          <Modal.Main>
            <>
              <p style={{ fontSize: "1.25rem" }}>
                Você deseja aprovar o cadastro da cultivar:{" "}
                <b>{selectedCultivar?.name}</b>?
              </p>
            </>
          </Modal.Main>
          <Modal.Footer
            cancelText="Rejeitar"
            submitText="Aprovar"
            onCancel={() => handleApproveCultivar(false)}
            onSubmit={() => handleApproveCultivar(true)}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default Cultivars;
