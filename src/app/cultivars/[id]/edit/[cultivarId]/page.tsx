"use client";

import { useRouter } from "next/navigation";
import Layout from "@/components/layout/layout";
import "@/styles/crops/pageCrops.css";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import InputDefault from "@/components/forms/inputDefault";
import Button from "@/components/forms/button";
import NavButton from "@/components/layout/navigationButton";
import { useEffect, useState } from "react";
import { cropsService } from "@/services/crops";
import useCultivarForm from "@/app/hooks/useCultivarForm";

interface Props {
  params: { id: string; cultivarId: string };
}

const EditarCultivar = ({ params }: Props) => {
  const { id, cultivarId } = params;
  const { name, setName, editarCultivar } = useCultivarForm(id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let session = sessionStorage.getItem("@token");
    const service = new cropsService(session);
    const fetchCultivar = async () => {
      setIsLoading(true);
      const data = await service.findOneCultivar(cultivarId);
      setName(data.name);
      setIsLoading(false);
    };
    fetchCultivar();
  }, [cultivarId]);

  const handleEditCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cultivarId && typeof cultivarId === "string") {
      await editarCultivar(e, cultivarId);
    }
  };

  return (
    <Layout>
      <div className="cropsPage">
        <div className="list-crops">
          <form className="formBody-login" onSubmit={handleEditCrop}>
            <div className="form-title">
              <h2 className="tittle-login">Editar cultivar</h2>
            </div>

            {isLoading ? (
              <p style={{ width: "100%", textAlign: "center" }}>
                Carregando...
              </p>
            ) : (
              <>
                <InputDefault
                  classe="form-input-box"
                  label="Nome"
                  placeholder="Nome"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  type={"text"}
                  editButton
                />

                <div className="footer-form">
                  <NavButton
                    Url={`/cultivars/${id}`}
                    page="form"
                    text="Voltar"
                    type="voltar"
                  />
                  <Button
                    texto={"Salvar"}
                    classe={"form-button"}
                    onclick={handleEditCrop}
                  />{" "}
                  {/* Botão atualizado para "Salvar" */}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCultivar;
