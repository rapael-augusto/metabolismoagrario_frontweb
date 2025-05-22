"use client";

import SearchForm from "@/components/forms/SearchForm";
import Layout from "@/components/layout/layout";
import "@/styles/crops/pageCrops.css";
import NavButton from "@/components/layout/navigationButton";
import Table, { TableAction } from "@/components/table/table";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { cultivarService } from "@/services/cultivar";
import { Constant, Environment, ReviewStatus } from "@/types/cultivarTypes";
import { FaEye, FaGavel, FaTrash } from "react-icons/fa";
import ModalApproveCultivar from "@/components/cultivars/modalApproveCultivar";
import ModalEditCultivar from "@/components/cultivars/modalEditCultivar";
import ModalRemoveCultivarReview from "@/components/cultivars/modalRemoveCultivarReview";
import ModalShowCultivarReview from "@/components/cultivars/modalShowCultivarReview";
import { useAuthContext } from "@/contexts/auth/authContext";

interface ICultivarView {
  id: string;
  name: string;
  cropId: string;
  crop: {
    name: string;
    scientificName: string;
  };
}

interface IReferenceView {
  id: string;
  title: string;
  comment?: string | null;
  status: ReviewStatus;
}

export interface CultivarReviewType {
  id: string;
  status: ReviewStatus;
  userId: string;
  justification: string;
  cultivarId: string;
  createdAt: string;
  reviewed_at: string | null;
  Cultivar: ICultivarView;
  reference: IReferenceView;
  Constants: Constant[];
  Environment: Environment & { country: { nome_pais: string } };
  requestedBy: { name: string; email: string };
}

export default function Reviews() {
  const { user } = useAuthContext();
  const [dados, setDados] = useState<CultivarReviewType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isModalShowOpen, setModalShowOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<CultivarReviewType>();

  console.log(dados);

  const filtredData = useMemo(() => {
    return dados.filter((review, index) =>
      review.Cultivar.name.toLowerCase().includes(search)
    );
  }, [dados, search]);

  useEffect(() => {
    const cultivarServ = new cultivarService();
    cultivarServ.listCultivarsReviews().then((response) => {
      setDados(response);
    });
  }, []);

  const columns = [
    {
      header: "Status",
      accessor: "status",
      type: "STATUS",
    },
    { header: "Nome", accessor: "Cultivar.name" },
    { header: "Solicitante", accessor: "requestedBy.name" },
    { header: "Justificativa", accessor: "justification" },
  ];

  const actions: TableAction[] = [
    {
      icon: FaEye,
      title: "Visualizar",
      onClick: (row: any) => handleOpenShowModal(row.id),
    },
    {
      icon: FaGavel,
      title: "Aprovar/rejeitar",
      onClick: (row: any) => handleOpenModal(row.id),
      visible: (row: any) =>
        user ? user.role === "ADMIN" && row.status === "PENDING" : false,
    },
    {
      icon: FaTrash,
      title: "Remover",
      onClick: (row: any) => handleOpenRemoveModal(row.id),
      visible: (row: any) =>
        user ? row.status === "PENDING" && user.role === "OPERATOR" : false,
    },
  ];

  const handleOpenEditModal = (id: string) => {
    const review = dados.find((item) => item.id === id);
    setEditModalOpen(true);
    setSelectedReview(review);
  };

  const handleOpenModal = (id: string) => {
    const review = dados.find((item) => item.id === id);
    setIsModalOpen(true);
    setSelectedReview(review);
  };

  const handleOpenShowModal = (id: string) => {
    const review = dados.find((item) => item.id === id);
    setModalShowOpen(true);
    setSelectedReview(review);
  };

  const handleOpenRemoveModal = (id: string) => {
    const review = dados.find((item) => item.id === id);
    setRemoveModalOpen(true);
    setSelectedReview(review);
  };

  const handleApproveCultivar = async (
    approved: boolean,
    justification: string
  ) => {
    const service = new cultivarService();
    if (selectedReview?.id) {
      const status = approved ? "Approved" : "Declined";
      const response = await service.approveCultivarReview(selectedReview.id, {
        status,
        justification,
      });
      if (response.status === -1) {
        toast.error("Houve um erro ao tentar atualizar a solicitação!");
        return;
      }
      setDados((prevDados) =>
        prevDados.filter((review) => review.id !== selectedReview.id)
      );
    }
    toast.success(`O registro foi ${approved ? "aprovado" : "rejeitado"}!`);
    setIsModalOpen(false);
  };

  const handleRejectCultivar = async (
    status: ReviewStatus,
    justification: string
  ) => {
    const service = new cultivarService();
    if (selectedReview?.id) {
      const response = await service.rejectCultivarReview(selectedReview.id, {
        status,
        justification,
      });
      if (response.status === -1) {
        toast.error("Houve um erro ao tentar atualizar a solicitação!");
        return;
      }
      setDados((prevDados) =>
        prevDados.filter((review) => review.id !== selectedReview.id)
      );
    }
    toast.success(
      status === "REJECTED"
        ? "A cultivar foi Rejeitada!"
        : "A cultivar foi enviada para revisão!"
    );
    setIsModalOpen(false);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <Layout>
      <div className="cropsPage">
        <h2 className="titulo-crops">Lista de solicitações</h2>
        <SearchForm placeholder="Pesquisa por nome" onSearch={handleSearch} />
        <div className="container-button-crops">
          <NavButton Url="/home" text={"Voltar"} type="voltar" page="list" />
        </div>
        <Table
          data={filtredData}
          columns={columns}
          actions={actions}
          translations={{}}
        />
        {selectedReview && (
          <>
            <ModalShowCultivarReview
              reviewSelected={selectedReview}
              handleModalOpen={(isOpen: boolean) => setModalShowOpen(isOpen)}
              isModalOpen={isModalShowOpen}
            />
            <ModalApproveCultivar
              reviewSelected={selectedReview}
              handleReject={handleRejectCultivar}
              handleApprove={handleApproveCultivar}
              handleModalOpen={(isOpen: boolean) => setIsModalOpen(isOpen)}
              isModalOpen={isModalOpen}
            />
            <ModalEditCultivar
              id={selectedReview?.Cultivar.cropId}
              cultivarId={selectedReview?.Cultivar.id}
              handleVisible={(isOpen: boolean) => setEditModalOpen(isOpen)}
              visible={editModalOpen}
            />
            <ModalRemoveCultivarReview
              handleVisible={(isOpen: boolean) => setRemoveModalOpen(isOpen)}
              reviewSelected={selectedReview}
              visible={removeModalOpen}
            />
          </>
        )}
      </div>
    </Layout>
  );
}
