"use client";

import Layout from "@/components/layout/layout";
import "@/styles/crops/pageCrops.css";
import "@/styles/userList/userList.css";
import { useEffect, useState, useCallback } from "react";
import { redirect } from "next/navigation";
import NavButton from "@/components/layout/navigationButton";
import Image from "next/image";
import Auth from "@/services/auth";
import Table, { TableAction } from "@/components/table/table";
import SearchForm from "@/components/forms/SearchForm";
import { toast } from "react-toastify";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { getRoleFromStorage, initializeRoleInStorage } from "@/utils/authUtils";
import { useAuthContext } from "@/contexts/auth/authContext";
import ModalViewUser from "@/components/users/modalViewUser";
import ModalEditUser from "@/components/users/modalEditUser";
import ModalRegisterUser from "@/components/users/modalRegisterUser";
import { useConfirm } from "@/contexts/confirmationModal/confirmationModalContext";

interface DataUserType {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "OPERATOR";
}

const UsersList = () => {
  const [dados, setDados] = useState<DataUserType[]>([]);
  const [filtredData, setFiltredData] = useState<DataUserType[]>([]);
  const { user } = useAuthContext();
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const confirm = useConfirm();

  useEffect(() => {
    const auth = new Auth();

    auth.UsersList().then((res) => {
      setDados(res);
      setFiltredData(res);
    });
  }, []);

  const handleView = (id: string) => {
    setModalCreateVisible(true);
    setSelectedUserId(id);
  };

  const handleEdit = (id: string) => {
    setModalEditVisible(true);
    setSelectedUserId(id);
  };

  const handleRegister = () => {
    setModalRegisterVisible(true);
  };

  const handleDelete = useCallback(
    async (id: string, targetName: string) => {
      const confirmed = await confirm({
        title: `Deseja deletar o usuário: ${targetName}?`,
        message: "",
        variant: "danger",
        confirmText: "Deletar",
      });
      const auth = new Auth();
      if (!confirmed) return;
      try {
        await auth.deleteUser(id);
        const updatedData = dados.filter((user) => user.id !== id);
        setDados(updatedData);
        toast.success("Usuário removido com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error("Falha ao deletar usuário:", error);
      }
    },
    [dados]
  );

  const handleSearch = (search: string) => {
    const filtred = dados.filter((crop: DataUserType) =>
      crop.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltredData(filtred);
  };

  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "E-mail", accessor: "email" },
    { header: "Tipo", accessor: "role" },
  ];

  const actions: TableAction[] = [
    {
      icon: FaEye,
      title: "Visualizar",
      onClick: (row: any) => handleView(row.id),
    },
    {
      icon: FaEdit,
      title: "Editar",
      onClick: (row: any) => handleEdit(row.id),
      visible: (row: any) => (user ? user.role === "ADMIN" : false),
    },
    {
      icon: FaTrash,
      title: "Deletar",
      onClick: (row: any) => {
        const foundUser = filtredData.find((user) => user.id === row.id);
        handleDelete(row.id, foundUser ? foundUser.name : "");
      },
      visible: (row: any) => (user ? user.role === "ADMIN" : false),
    },
  ];

  const handleCreateVisible = (isVisible: boolean) => {
    setModalCreateVisible(isVisible);
  };

  const handleEditVisible = (isVisible: boolean) => {
    setModalEditVisible(isVisible);
  };

  const handleRegisterVisible = (isVisible: boolean) => {
    setModalRegisterVisible(isVisible);
  };

  return (
    <Layout>
      <div className="cropsPage">
        <h2 className="titulo-crops">Lista de Usuários</h2>

        <SearchForm placeholder="Pesquisa pelo nome" onSearch={handleSearch} />

        <div className="list-crops">
          <div className="container-button-crops">
            <NavButton Url="/home" text={"Voltar"} type="voltar" page="list" />
            <button
              className="register-button"
              onClick={() => handleRegisterVisible(true)}
            >
              Cadastrar usuário
            </button>
          </div>

          <Table
            data={filtredData}
            columns={columns}
            actions={actions}
            translations={{}}
          />
        </div>
      </div>
      {selectedUserId && (
        <>
          <ModalViewUser
            visible={modalCreateVisible}
            handleVisible={handleCreateVisible}
            userId={selectedUserId}
          />
          <ModalEditUser
            visible={modalEditVisible}
            handleVisible={handleEditVisible}
            userId={selectedUserId}
          />
        </>
      )}
      <ModalRegisterUser
        visible={modalRegisterVisible}
        handleVisible={handleRegisterVisible}
      />
    </Layout>
  );
};

export default UsersList;
