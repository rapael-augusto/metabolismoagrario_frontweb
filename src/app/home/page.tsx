"use client";

import "../../styles/home/homepage.css";
import SecurityComp from "@/components/auth/security";
import Modulo from "@/components/home/module";
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { initializeRoleInStorage, getRoleFromStorage } from "@/utils/authUtils";
import { FaGavel } from "react-icons/fa";

const Home = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    initializeRoleInStorage();
    const roleFromStorage = getRoleFromStorage();
    setRole(roleFromStorage);
  }, []);

  const renderLayout = () => {
    console.log("Role no renderLayout:", role);
    if (role === "ADMIN") {
      return (
        <>
          <Modulo URL="/crops" text="Culturas" imageUrl="/vaso.svg" />
          <Modulo URL="/usersList" text="Usuários" imageUrl="/account.svg" />
          <Modulo
            URL="/calculator"
            text="Calculadora"
            imageUrl="/calculate.svg"
          />
          <Modulo URL="/reviews" text="Solicitações" icon={FaGavel} />
        </>
      );
    } else if (role === "OPERATOR") {
      return (
        <>
          <Modulo URL="/crops" text="Culturas" imageUrl="/vaso.svg" />
          <Modulo URL="/reviews" text="Minhas Solicitações" icon={FaGavel} />
        </>
      );
    } else {
      return <div>Você não tem permissão para acessar esta página.</div>;
    }
  };

  return (
    <SecurityComp>
      <Layout>
        <div className="homepage-box">{renderLayout()}</div>
      </Layout>
    </SecurityComp>
  );
};

export default Home;
