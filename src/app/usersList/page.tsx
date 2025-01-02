"use client";

import Layout from "@/components/layout/layout";
import "../../styles/crops/pageCrops.css";
import "../../styles/userList/userList.css";
import { useEffect, useState, useCallback } from "react";
import { redirect } from "next/navigation";
import NavButton from "@/components/layout/navigationButton";
import Image from "next/image";
import Auth from "@/services/auth";
import Table from "@/components/table/table"; // Importando o componente Table
import SearchForm from "@/components/forms/SearchForm";
import { toast } from "react-toastify";

interface DataUserType {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "OPERATOR";
}

const UsersList = () => {
  const [dados, setDados] = useState<DataUserType[]>([]);
  const [filtredData, setFiltredData] = useState<DataUserType[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("@token");

    if (!token) {
      toast.error("Você não possui permissões para acessar essa pagina!");
      redirect("/");
    } else {
      const auth = new Auth();

      auth.UsersList(token).then((res) => {
        setDados(res);
        setFiltredData(res);
      });
    }
  }, []);

  const handleView = (id: string) => {
    window.location.href = `/user/${id}`;
  };

  const handleEdit = (id: string) => {
    window.location.href = `/usersList/edit/${id}`;
  };

  const handleDelete = useCallback(
    async (id: string) => {
      const token = sessionStorage.getItem("@token");

      if (token) {
        const auth = new Auth();

        try {
          // await auth.deleteUser(id, token);
          // const updatedData = dados.filter(user => user.id !== id);
          // setDados(updatedData);
          console.log("Usuário removido");
        } catch (error) {
          console.error("Falha ao deletar usuário:", error);
        }
      } else {
        toast.error("Você não possui permissões para acessar essa pagina!");
        redirect("/");
      }
    },
    [dados]
  );

  const handleSearch = (search: string) => {
    const filtred = dados.filter((crop: DataUserType) =>
      crop.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(search);
    setFiltredData(filtred);
  };

  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "E-mail", accessor: "email" },
    { header: "Tipo", accessor: "role" },
  ];

  return (
    <Layout>
      <div className="cropsPage">
        <h2 className="titulo-crops">Lista de usuários</h2>

        <SearchForm placeholder="Pesquisa pelo nome" onSearch={handleSearch} />

        <div className="list-crops">
          <div className="container-button-crops">
            <NavButton Url="/home" text={"Voltar"} type="voltar" page="list" />
            <NavButton
              Url="/register"
              text={"Cadastrar usuário"}
              type="cadastrar"
              page="list"
            />
          </div>

          <Table
            data={filtredData}
            columns={columns}
            onView={(id) => handleView(id)}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDelete(id)}
            translations={{}}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UsersList;
