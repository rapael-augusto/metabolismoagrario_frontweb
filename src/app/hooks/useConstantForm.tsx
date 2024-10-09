import { useState, useEffect } from "react";
import { cropsService } from "@/services/crops";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { countriesService } from "@/services/countries";
import { soilService } from "@/services/soil";
import { biomeService } from "@/services/biome";
import { link } from "fs";

const useConstantForm = (params: { id: string }) => {
  const [type, setType] = useState("");
  const [reference, setReference] = useState("");
  const [value, setValue] = useState("");
  const [comment, setComment] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [climate, setClimate] = useState("");
  const [biome, setBiome] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [cultivationSystem, setCultivationSystem] = useState("");
  const [country, setCountry] = useState("");
  const [soil, setSoil] = useState("");
  const [customSoil, setCustomSoil] = useState<string | null>(null);
  const [customBiome, setCustomBiome] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [bibliographicReferenceId, setBibliographicReferenceId] = useState<
    number | null
  >(null);
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>(0);
  const [source, setSource] = useState("");
  const [countries, setCountries] = useState<{ nome_pais: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem("@token");
    if (session) {
      setToken(session);
    } else {
      sessionStorage.setItem(
        "mensagem",
        JSON.stringify({
          mensagem: "Você não possui permissões para acessar essa página!",
          tipo: "danger",
        })
      );
      redirect("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCountries(token);
    }
  }, [token]);

  const fetchCountries = async (token: string) => {
    try {
      const service = new countriesService(token);
      const response = await service.listAll();
      setCountries(response.data);
    } catch (error) {
      console.error("Erro ao carregar os países:", error);
    }
  };

  const handleTypeChange = (value: string) => setType(value);
  const handleClimateChange = (value: string) => setClimate(value);
  const handleIrrigationChange = (value: string) => setIrrigation(value);
  const handleCultivationSystemChange = (value: string) =>
    setCultivationSystem(value);
  const handleBiomeChange = (value: string) => {
    if (value === "Other") {
      setCustomBiome("");
    } else {
      setBiome(value);
      setCustomBiome(null);
    }
  };
  const handleSoilChange = async (value: string) => {
    if (value === "Other") {
      setCustomSoil("");
    } else {
      setCustomSoil(null);
      setSoil(value);
    }
  };

  const handleCountryChange = (value: string) => setCountry(value);

  const validateFields = () => {
    const newErrors: string[] = [];

    if (!type) newErrors.push("Tipo é um campo obrigatório.");
    if (!value) newErrors.push("Valor é um campo obrigatório.");
    if (!climate) newErrors.push("Clima é um campo obrigatório.");
    if (!biome && !customBiome) newErrors.push("Bioma é um campo obrigatório.");
    if (!irrigation) newErrors.push("Irrigação é um campo obrigatório.");
    if (!country) newErrors.push("País é um campo obrigatório.");
    if (!cultivationSystem)
      newErrors.push("Sistema de cultivo é um campo obrigatório.");

    setErrorMessage(newErrors);
    return newErrors.length === 0;
  };

  const createCustomSoil = async (name: string) => {
    if (token) {
      const service = new soilService(token);
      try {
        const response = await service.createSoil({
          name,
        });
        return response.id;
      } catch (error) {
        console.error("Erro ao criar solo personalizado:", error);
        setErrorMessage((prevErrors) => [
          ...prevErrors,
          "Erro ao criar solo personalizado",
        ]);
        return null;
      }
    }
    return null;
  };

  const createCustomBiome = async (name: string) => {
    if (token) {
      const service = new biomeService(token);
      try {
        const response = await service.createBiome({
          name,
        });
        return response.id;
      } catch (error) {
        console.error("Erro ao criar bioma personalizado:", error);
        setErrorMessage((prevErrors) => [
          ...prevErrors,
          "Erro ao criar bioma personalizado",
        ]);
        return null;
      }
    }
    return null;
  };

  const createBibliographicReference = async () => {
    if (token) {
      try {
        const service = new cropsService(token);
        const response = await service.createBibliographicReference({
          authorName,
          title,
          year,
          source,
        });
        return response.id;
      } catch (error) {
        console.error("Erro ao criar referência bibliográfica:", error);
        setErrorMessage((prevErrors) => [
          ...prevErrors,
          "Erro ao criar referência bibliográfica",
        ]);
        return null;
      }
    }
    return null;
  };

  const cadastroConstant = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    let refId = bibliographicReferenceId;

    if (!refId) {
      refId = await createBibliographicReference();
      setBibliographicReferenceId(refId);
    }

    let customSoilId = null;
    if (soil === "Other" && customSoil) {
      customSoilId = await createCustomSoil(customSoil);
    }

    console.log("Custom ssoil", customSoilId);

    let customBiomeId = null;
    if (biome === "Outro" && customBiome) {
      customBiomeId = await createCustomBiome(customBiome);
    }

    const service = new cropsService(token);

    const paramsData: any = {
      type,
      comment,
      value: typeof value === "string" ? parseFloat(value) : value,
      biome: biome !== "NaoInformado" ? biome : undefined,
      customBiome: biome === "Outro" ? customBiomeId : undefined,
      climate: climate !== "NaoInformado" ? climate : undefined,
      irrigation: irrigation !== "NaoInformado" ? irrigation : undefined,
      country,
      cultivationSystem:
        cultivationSystem !== "NaoInformado" ? cultivationSystem : undefined,
      soil: soil !== "NaoInformado" ? soil : undefined,
      customSoil: soil === "Other" ? customSoilId : undefined,
      linkReference: reference,
      bibliographicReferenceId: refId,
    };
    Object.keys(paramsData).forEach(
      (key) => paramsData[key] === undefined && delete paramsData[key]
    );

    try {
      const responseConstants: any | ResponseType =
        await service.createConstantOfCultivar(params.id, paramsData);
      console.log(responseConstants);
      setResponse(responseConstants.status);

      if (responseConstants.status === 1) {
        sessionStorage.setItem(
          "mensagem",
          JSON.stringify({
            mensagem: "Fator de conversão cadastrado com sucesso!",
            tipo: "success",
          })
        );
        router.replace(`/constant/${params.id}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar fator de conversão:", error);
      setErrorMessage((prevErrors) => [
        ...prevErrors,
        "Erro ao cadastrar fator de conversão",
      ]);
    }
  };

  return {
    type,
    reference,
    value,
    comment,
    climate,
    biome,
    irrigation,
    cultivationSystem,
    country,
    soil,
    customSoil,
    customBiome,
    authorName,
    title,
    year,
    source,
    errorMessage,
    countries,
    handleTypeChange,
    handleClimateChange,
    handleIrrigationChange,
    handleCultivationSystemChange,
    handleBiomeChange,
    handleSoilChange,
    handleCountryChange,
    setAuthorName,
    setTitle,
    setYear,
    setSource,
    setReference,
    setValue,
    setComment,
    setCountry,
    setSoil,
    setCustomSoil,
    setCustomBiome,
    cadastroConstant,
    createCustomSoil,
    createCustomBiome,
  };
};

export default useConstantForm;
