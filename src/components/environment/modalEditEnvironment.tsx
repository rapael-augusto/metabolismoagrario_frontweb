"use client";
import { useState } from "react";
import Modal from "../modal";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import { useParams } from "next/navigation";
import useConstantForm from "@/hooks/useConstantForm";
import { IEnvironmentData } from "@/types/cultivarTypes";
import InputDefault from "../forms/inputDefault";
import CustomSelect from "../layout/customSelect";
import { biomeSelectOptions, climateSelectOptions, cultivationSystemSelectOptions, irrigationSelectOptions, soilSelectOptions } from "@/utils/selectOptions";

interface props {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  data: IEnvironmentData & {
    environmentId: string;
    referenceId: string;
    cultivarId: string;
  };
}

export default function ModalEditEnvironment({
  visible,
  handleVisible,
  data,
}: props) {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { handleEnvironmentChange, handleEnvironmentUpdate } = useConstantForm({
    id,
  });
  const [environmentSelected, setEnvironmentSelected] = useState<{
    environmentId: string;
    referenceId: string;
    cultivarId: string;
    country: string | null;
    climate: string | null;
    biome: string | null;
    irrigation: string | null;
    soil: string | null;
    cultivationSystem: string | null;
  } | null>({
    environmentId: data.environmentId,
    referenceId: data.referenceId,
    cultivarId: data.cultivarId,
    country: data.country ?? null,
    climate: data.climate ?? null,
    biome: data.biome ?? null,
    irrigation: data.irrigation ?? null,
    soil: data.soil ?? null,
    cultivationSystem: data.cultivationSystem ?? null,
  });

  const {
    countries,
  } = useConstantForm({ id });

  const handleSubmit = async () => {
    if (!environmentSelected) return;
    await handleEnvironmentUpdate(
      {
        referenceId: environmentSelected?.referenceId,
        cultivarId: environmentSelected?.cultivarId,
        environmentId: environmentSelected?.environmentId,
      },
      {
        country: environmentSelected.country ?? undefined,
        climate: environmentSelected.climate ?? undefined,
        biome: environmentSelected.biome ?? undefined,
        irrigation: environmentSelected.irrigation ?? undefined,
        soil: environmentSelected.soil ?? undefined,
        cultivationSystem: environmentSelected.cultivationSystem ?? undefined,
      }
    );
    handleVisible(false);
  };

  return (
    <Modal isOpen={visible} size="lg">
      <Modal.Header
        title="Editar Ambiente"
        description=""
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        <>
          <div className="container-2-column">
            <CustomSelect
              type="form"
              label="Clima"
              options={climateSelectOptions}
              placeholder="Selecione o clima"
              onChange={(e) =>
                setEnvironmentSelected((prev) => ({
                  ...(prev || {
                    environmentId: "",
                    referenceId: "",
                    cultivarId: "",
                    country: null,
                    biome: null,
                    irrigation: null,
                    soil: null,
                    cultivationSystem: null,
                  }),
                  climate: e || null,
                }))
              }
              value={environmentSelected?.climate ?? ""}
              required
            />
            <CustomSelect
              type="form"
              label="Bioma"
              placeholder="Selecione o Bioma"
              options={biomeSelectOptions}
              onChange={(e) =>
                setEnvironmentSelected((prev) => ({
                  ...(prev || {
                    environmentId: "",
                    referenceId: "",
                    cultivarId: "",
                    country: null,
                    climate: null,
                    irrigation: null,
                    soil: null,
                    cultivationSystem: null,
                  }),
                  biome: e || null,
                }))
              }
              value={environmentSelected?.biome ?? ""}
              required
            />
          </div>

          <div className="container-2-column">
            <CustomSelect
              type="form"
              label="País"
              placeholder="Selecione o País"
              options={countries.map((country) => ({
                value: country.nome_pais,
                label: country.nome_pais,
              }))}
              onChange={(e) =>
                setEnvironmentSelected((prev) => ({
                  ...(prev || {
                    environmentId: "",
                    referenceId: "",
                    cultivarId: "",
                    biome: null,
                    climate: null,
                    irrigation: null,
                    soil: null,
                    cultivationSystem: null,
                  }),
                  country: e || null,
                }))
              }
              value={environmentSelected?.country ?? ""}
              required
            />
            <CustomSelect
              type="form"
              label="Sistema de cultivo"
              placeholder="Selecione o sistema de cultivo"
              options={cultivationSystemSelectOptions}
              onChange={(e) =>
                setEnvironmentSelected((prev) => ({
                  ...(prev || {
                    environmentId: "",
                    referenceId: "",
                    cultivarId: "",
                    biome: null,
                    climate: null,
                    irrigation: null,
                    soil: null,
                    country: null,
                  }),
                  cultivationSystem: e || null,
                }))
              }
              value={environmentSelected?.cultivationSystem ?? ""}
              required
            />
          </div>

          <div className="container-2-column">
            <CustomSelect
              type="form"
              label="Solo"
              placeholder="Selecione o Solo"
              options={soilSelectOptions}
              onChange={(e) =>
                setEnvironmentSelected((prev) => ({
                  ...(prev || {
                    environmentId: "",
                    referenceId: "",
                    cultivarId: "",
                    biome: null,
                    climate: null,
                    irrigation: null,
                    cultivationSystem: null,
                    country: null,
                  }),
                  soil: e || null,
                }))
              }
              value={environmentSelected?.soil ?? ""}
              required
            />
            <CustomSelect
              type="form"
              label="Irrigação"
              placeholder="Selecione a irrigação"
              options={irrigationSelectOptions}
              onChange={(e) =>
                setEnvironmentSelected((prev) => ({
                  ...(prev || {
                    environmentId: "",
                    referenceId: "",
                    cultivarId: "",
                    biome: null,
                    climate: null,
                    soil: null,
                    cultivationSystem: null,
                    country: null,
                  }),
                  irrigation: e || null,
                }))
              }
              value={environmentSelected?.irrigation ?? ""}
              required
            />
          </div>
        </>
      </Modal.Main>
      <Modal.Footer
        cancelText="Voltar"
        submitText="Atualizar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
