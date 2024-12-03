"use client";

import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

const SecurityComp: React.FC<any> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("@token");

    if (!token) {
      toast.error("Você não possui permissões para acessar essa pagina!");
      redirect("/");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
};

export default SecurityComp;
