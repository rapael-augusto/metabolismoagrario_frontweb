"use client";

import Layout from "@/components/layout/layout";
import "@/styles/crops/pageCrops.css";
import { cropsService } from "@/services/crops";
import { useCallback, useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import Table, { TableAction } from "@/components/table/table";
import NavButton from "@/components/layout/navigationButton";
import { dataCropsType } from "@/types/cropsTypes";
import SearchForm from "@/components/forms/SearchForm";
import { toast } from "react-toastify";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { getRoleFromStorage, initializeRoleInStorage } from "@/utils/authUtils";
import ModalCreateCrops from "@/components/crops/modalCreateCrops";
import ModalEditCrops from "@/components/crops/modalEditCrops";
import { useAuthContext } from "@/contexts/auth/authContext";
import { getSession } from "@/libs/sessionLib";
import { useTranslation } from "react-i18next";

const Crops = () => {
  const [cropIdSelected, setCropIdSelected] = useState("");
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [dados, setDados] = useState<dataCropsType[] | any>([]);
  const [filtredData, setFiltredData] = useState<dataCropsType[] | any>([]);
  const { user } = useAuthContext();
  const router = useRouter();
  const { t } = useTranslation();

  const columns = [
    { header: t("translation-utils.name"), accessor: "name" },
    { header: t("translation-utils.scientific-name"), accessor: "scientificName" },
  ];

  useEffect(() => {
    const crops = new cropsService();
    crops.list().then((response) => {
      setDados(response);
      setFiltredData(response);
    });
  }, []);

  const handleView = (id: string) => {
    router.push(`/cultivars/${id}`);
  };

  const handleEdit = (id: string) => {
    setCropIdSelected(id);
    setModalEditVisible(true);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      const { token } = await getSession();

      if (token) {
        const crops = new cropsService();

        try {
          await crops.deleteCrop(id);
          const updatedData = dados.filter(
            (crop: { id: string }) => crop.id !== id,
          );
          setDados(updatedData);
          setFiltredData(updatedData);
          toast.success(t("crops-module.delete-success"));
          console.log("Cultura removida");
          window.location.reload();
        } catch (error) {
          console.error("Falha ao deletar cultura:", error);
          toast.success(t("crops-module.delete-error"));
        }
      } else {
      }
    },
    [dados],
  );

  const handleSearch = (search: string) => {
    const filtred = dados.filter((crop: dataCropsType) =>
      crop.name.toLowerCase().includes(search.toLowerCase()),
    );
    console.log(search);
    setFiltredData(filtred);
  };

  const tableActions: TableAction[] = [
    {
      icon: FaEye,
      title: t("translation-utils.actions.visualize"),
      onClick: (row: any) => handleView(row.id),
    },
    {
      icon: FaEdit,
      title: t("translation-utils.actions.edit"),
      onClick: (row: any) => handleEdit(row.id),
      visible: (row: any) => (user ? user.role === "ADMIN" : false),
    },
    {
      icon: FaTrash,
      title: t("translation-utils.actions.delete"),
      onClick: (row: any) => handleDelete(row.id),
      visible: (row: any) => (user ? user.role === "ADMIN" : false),
    },
  ];

  const handleVisible = (isVisible: boolean) =>
    setModalCreateVisible(isVisible);

  return (
    <Layout>
      <div className="cropsPage">
        <h2 className="titulo-crops">{t("crops-module.crops-list")}</h2>
        <SearchForm placeholder={t("crops-module.search-placeholder")} onSearch={handleSearch} />
        <div className="container-button-crops">
          <NavButton Url="/modules" text={t("translation-utils.return")} type="voltar" page="list" />
          {user && user.role === "ADMIN" && (
            <div>
              <button
                onClick={() => setModalCreateVisible(true)}
                className="navButton-cadastrar-list"
              >
                {t("crops-module.register-crops")}
              </button>
            </div>
          )}
        </div>
        <Table
          data={filtredData}
          columns={columns}
          actions={tableActions}
          translations={{}}
        />
      </div>
      <ModalCreateCrops
        visible={modalCreateVisible}
        handleVisible={handleVisible}
      />
      <ModalEditCrops
        visible={modalEditVisible}
        handleVisible={(isVisible: boolean) => setModalEditVisible(isVisible)}
        id={cropIdSelected}
      />
    </Layout>
  );
};

export default Crops;
