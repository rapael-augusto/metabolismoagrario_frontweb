"use client";

import Layout from "@/components/layout/layout";
import "../../../styles/crops/pageCrops.css";
import "../../../styles/constant/constantPage.css";
import Table from "@/components/table/table";
import { useEffect, useState, useCallback, useRef } from "react";
import { redirect } from "next/navigation";
import { cropsService } from "@/services/crops";
import Image from "next/image";
import NavButton from "@/components/layout/navigationButton";
import Select from "@/components/layout/customSelect";
import {
  typeFilterOptions,
  climateFilterOptions,
  soilFilterOptions,
  cultivationSystemFilterOptions,
  irrigationFilterOptions,
  biomeFilterOptions,
} from "@/utils/constantFilterOptions";
import {
  typeTranslation,
  irrigationTranslation,
  cultivationSystemTranslation,
  soilTranslation,
} from "@/utils/translationsOptions";
import { useRouter } from "next/router";

interface Props {
  params: { id: string };
}
interface dadosConstants {
  comment: string;
  createdAt: string;
  cropId: string;
  id: string;
  reference: string;
  climate: string;
  biome: string;
  soil: string;
  country: string;
  type: string;
  updatedAt: string;
  value: number;
  irrigation: "Irrigation" | "Dry";
  cultivationSystem: "Conventional" | "Organic" | "Agroecological";
}

const constant = ({ params }: Props) => {
  const [dados, setDados] = useState<dadosConstants[]>([]);
  const [dadosTemp, setDadosTemp] = useState<dadosConstants[]>([]);
  const [titulo, setTitulo] = useState<string | any>("");
  const [cropId, setCropId] = useState<string | any>("");
  const [irrigacao, setIrrigacao] = useState<string>("all");
  const [clima, setClima] = useState<string>("all");
  const [tipo, setTipo] = useState<string>("all");
  const [sistemaCultivo, setSistemaCultivo] = useState<string>("all");
  const [solo, setSolo] = useState<string>("all");
  const [biome, setBiome] = useState<string>("all");

  const columns = [
    { header: "Tipo", accessor: "type" },
    { header: "Valor", accessor: "value" },
    { header: "Clima", accessor: "climate" },
    { header: "Bioma", accessor: "biome" },
    { header: "País", accessor: "country" },
    { header: "Irrigação", accessor: "irrigation" },
    { header: "Sistema de cultivo", accessor: "cultivationSystem" },
    { header: "Solo", accessor: "soil" },
  ];

  const handleDeleteConstant = useCallback(
    async (id: string) => {
      let session = sessionStorage.getItem("@token");

      if (session != null) {
        const constantService = new cropsService(session);

        try {
          await constantService.deleteConstant(id);
          const updatedData = dadosTemp.filter((dado) => dado.id !== id);
          setDados(updatedData);
          setDadosTemp(updatedData);
          console.log("Fator de conversão removido");
          // window.location.reload()
        } catch (error) {
          console.error("Falha ao deletar constante:", error);
        }
      } else {
        sessionStorage.setItem(
          "mensagem",
          `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`
        );
        redirect("/");
      }
    },
    [dadosTemp]
  );

  //AUTENTICACAO
  useEffect(() => {
    let session = sessionStorage.getItem("@token");

    if (session) {
      const service = new cropsService(session);

      service.findOneCultivar(params.id).then((response) => {
        setCropId(response.cropId);
        setDados(response.constants);
        setDadosTemp(response.constants);
        setTitulo(response.name);
      });
    } else {
      sessionStorage.setItem(
        "mensagem",
        `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`
      );
      redirect("/");
    }
  }, [params.id]);

  useEffect(() => {
    let dadosFiltrados = dados;

    if (irrigacao != "all") {
      dadosFiltrados = dadosFiltrados.filter(
        (e: dadosConstants) => e.irrigation == irrigacao
      );
    }

    if (clima != "all") {
      dadosFiltrados = dadosFiltrados.filter(
        (e: dadosConstants) => e.climate == clima
      );
    }

    if (tipo != "all") {
      dadosFiltrados = dadosFiltrados.filter(
        (e: dadosConstants) => e.type == tipo
      );
    }

    if (sistemaCultivo != "all") {
      dadosFiltrados = dadosFiltrados.filter(
        (e: dadosConstants) => e.cultivationSystem == sistemaCultivo
      );
    }

    if (solo != "all") {
      dadosFiltrados = dadosFiltrados.filter(
        (e: dadosConstants) => e.soil == solo
      );
    }

    if (biome != "all") {
      dadosFiltrados = dadosFiltrados.filter(
        (e: dadosConstants) => e.biome == biome
      );
    }

    setDadosTemp(dadosFiltrados);
  }, [irrigacao, clima, tipo, sistemaCultivo, solo, biome]);

  //VIEW
  return (
    <Layout>
      <div className="cropsPage">
        <div className="container-button-crops">
          <NavButton
            Url={`/cultivars/${cropId}`}
            page="list"
            text="Voltar"
            type="voltar"
          />
          <NavButton
            Url={`/criarConstant/${params.id}`}
            page="list"
            text="Cadastrar fator de conversão"
            type="cadastrar"
          />
        </div>

        <h2 className="titulo-crops">Fatores de conversão de {titulo}</h2>

        <div className="list-constants">
          <div className="container-filtros">
            <div>
              <Select
                type="filter"
                options={typeFilterOptions}
                onChange={(value) => setTipo(value)}
                placeholder="Filtrar por tipo"
              />
            </div>

            <div>
              <Select
                type="filter"
                options={climateFilterOptions}
                onChange={(value) => setClima(value)}
                placeholder="Filtrar por clima"
              />
            </div>

            <div>
              <Select
                type="filter"
                options={biomeFilterOptions}
                onChange={(value) => setBiome(value)}
                placeholder="Filtrar por Bioma"
              />
            </div>

            <div>
              <Select
                type="filter"
                options={irrigationFilterOptions}
                onChange={(value) => setIrrigacao(value)}
                placeholder="Filtrar por irrigação"
              />
            </div>

            <div>
              <Select
                type="filter"
                options={cultivationSystemFilterOptions}
                onChange={(value) => setSistemaCultivo(value)}
                placeholder="Filtrar por sistema de cultivo"
              />
            </div>

            <div>
              <Select
                type="filter"
                options={soilFilterOptions}
                onChange={(value) => setSolo(value)}
                placeholder="Filtrar por solo"
              />
            </div>
          </div>

          <Table
            data={dadosTemp}
            columns={columns}
            onDelete={handleDeleteConstant}
            translations={{
              type: typeTranslation,
              irrigation: irrigationTranslation,
              cultivationSystem: cultivationSystemTranslation,
              soil: soilTranslation,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default constant;
