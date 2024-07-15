import { useState, useEffect } from "react";
import { cropsService } from "@/services/crops";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const useConstantForm = (params: { id: string }) => {
    const [type, setType] = useState('');
    const [reference, setReference] = useState('');
    const [value, setValue] = useState('');
    const [comment, setComment] = useState('');
    const [token, setToken] = useState<string | null>('');
    const [response, setResponse] = useState('');
    const [climate, setClimate] = useState('');
    const [biome, setBiome] = useState('');
    const [irrigation, setIrrigation] = useState('');
    const [cultivationSystem, setCultivationSysten] = useState('');
    const [country, setCountry] = useState('');
    const [soil, setSoil] = useState('');
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [bibliographicReferenceId, setBibliographicReferenceId] = useState<number | null>(null);
    const [authorName, setAuthorName] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState<number>(0);
    const [source, setSource] = useState('');

    const router = useRouter();

    useEffect(() => {
        let session = sessionStorage.getItem('@token');

        if (session) {
            setToken(session);
        } else {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`);
            redirect('/');
        }
    }, []);

    const handleTypeChange = (value: string) => setType(value);
    const handleClimateChange = (value: string) => setClimate(value);
    const handleIrrigationChange = (value: string) => setIrrigation(value);
    const handleCultivationSystemChange = (value: string) => setCultivationSysten(value);
    const handleBiomeChange = (value: string) => setBiome(value);
    const handleSoilChange = (value: string) => setSoil(value);

    const validateFields = () => {
        const newErrors: string[] = [];

        if (!type) newErrors.push("Tipo é um campo obrigatório.");
        if (!value) newErrors.push("Valor é um campo obrigatório.");
        if (!climate) newErrors.push("Clima é um campo obrigatório.");
        if (!biome) newErrors.push("Bioma é um campo obrigatório.");
        if (!irrigation) newErrors.push("Irrigação é um campo obrigatório.");
        if (!country) newErrors.push("País é um campo obrigatório.");
        if (!cultivationSystem) newErrors.push("Sistema de cultivo é um campo obrigatório.");
        if (!reference) newErrors.push("Referência é um campo obrigatório.");

        setErrorMessage(newErrors);
        return newErrors.length === 0;
    };

    const createBibliographicReference = async () => {
        if (token) {
            const service = new cropsService(token);
            const response = await service.createBibliographicReference({
                authorName,
                title,
                year,
                source
            });
            return response.id;
        }
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

        const service = new cropsService(token);

        const paramsData: any = {
            type,
            comment,
            reference,
            value: typeof value === 'string' ? parseFloat(value) : value,
            biome: biome !== 'NaoInformado' ? biome : undefined,
            climate: climate !== 'NaoInformado' ? climate : undefined,
            irrigation: irrigation !== 'NaoInformado' ? irrigation : undefined,
            country,
            cultivationSystem: cultivationSystem !== 'NaoInformado' ? cultivationSystem : undefined,
            soil: soil !== 'NaoInformado' ? soil : undefined,
            bibliographicReferenceId: refId
        };

        Object.keys(paramsData).forEach(key => paramsData[key] === undefined && delete paramsData[key]);

        const responseConstants: any | ResponseType = await service.createConstantOfCultivar(params.id, paramsData);

        console.log(responseConstants);
        setResponse(responseConstants.status);

        if (responseConstants.status === 1) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Fator de conversão cadastrado com sucesso !","tipo":"success"}`);
            router.push(`/constant/${params.id}`);
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
        authorName,
        title,
        year,
        source,
        errorMessage,
        handleTypeChange,
        handleClimateChange,
        handleIrrigationChange,
        handleCultivationSystemChange,
        handleBiomeChange,
        handleSoilChange,
        setAuthorName,
        setTitle,
        setYear,
        setSource,
        setReference,
        setValue,
        setComment,
        setCountry,
        cadastroConstant
    };
};

export default useConstantForm;
