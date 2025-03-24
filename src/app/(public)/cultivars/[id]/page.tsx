"use client";

import Layout from "@/components/layout/layout";
import "@/styles/crops/pageCrops.css";
import "@/styles/cultivar/pageCultivar.css";
import Table, { TableAction } from "@/components/table/table";
import { useEffect, useState, useCallback, useMemo } from "react";
import { cropsService } from "@/services/crops";
import NavButton from "@/components/layout/navigationButton";
import { cultivarsData } from "@/types/cultivarTypes";
import SearchForm from "@/components/forms/SearchForm";
import { toast } from "react-toastify";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ModalCreateCultivar from "@/components/cultivars/modalCreateCultivar";
import ModalEditCultivar from "@/components/cultivars/modalEditCultivar";
import { getSession } from "@/libs/sessionLib";
import { useAuthContext } from "@/contexts/auth/authContext";

interface Props {
	params: { id: string };
}

interface FilterOptions {
	key: keyof cultivarsData;
	exact: boolean;
	value: string;
}

const Cultivars = ({ params }: Props) => {
	const [modalEditVisible, setModalEditVisible] = useState(false);
	const [modalCreateVisible, setModalCreateVisible] = useState(false);
	const [dados, setDados] = useState<cultivarsData[]>([]);
	const [selectedCultivar, setSelectedCultivar] = useState<cultivarsData>();
	const [filterCriteria, setFilterCriteria] = useState<FilterOptions[]>([]);
	const [titulo, setTitulo] = useState<string | any>("");
	const { user } = useAuthContext();
	useEffect(() => {
		const service = new cropsService();
		service.findOne(params.id).then((response) => {
			setDados(response.cultivars);
			setTitulo(response.name);
		});
	}, []);

	const handleDeleteCultivar = useCallback(
		async (id: string) => {
			let { token: session } = await getSession();

			if (session != null) {
				const constantService = new cropsService();

				try {
					await constantService.deleteCultivar(id);
					const updatedData = dados.filter((dado) => dado.id !== id);
					setDados(updatedData);
					toast.success("Cultivar removida com sucesso!");
					console.log("Cultivar removida");
				} catch (error) {
					console.error("Falha ao deletar constante:", error);
				}
			} else {
			}
		},
		[dados]
	);

	const filteredData = useMemo(() => {
		return dados.filter((cultivar) =>
			filterCriteria.every((filterOp, index) => {
				const { key, value, exact } = filterOp;
				if (!value) return true;
				if (exact) return String(cultivar[key]) === value;
				return String(cultivar[key])
					.toLowerCase()
					.includes(value.toLowerCase());
			})
		);
	}, [dados, filterCriteria]);

	const handleView = (id: string) => {
		window.location.href = `/cultivars/view/${id}`;
	};

	const handleEdit = (id: string) => {
		setModalEditVisible(true);
		const cultivar = dados.find((item) => item.id === id);
		setSelectedCultivar(cultivar);
	};

	const columns = [{ header: "Nome", accessor: "name" }];

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
			visible: (row: any) =>
				user ? user.role === "ADMIN" && row.status === "Approved" : false,
		},
		{
			icon: FaTrash,
			title: "Deletar",
			onClick: (row: any) => handleDeleteCultivar(row.id),
			visible: (row: any) => (user ? user.role === "ADMIN" : false),
		},
	];

	const handleFilter = (
		filter: string,
		key: keyof cultivarsData,
		exact: boolean = false
	) => {
		setFilterCriteria((prevCriteria) => {
			const updatedCriteria = [...prevCriteria];
			const existingIndex = updatedCriteria.findIndex(
				(criteria) => criteria.key === key
			);
			if (existingIndex >= 0) {
				if (filter.trim() === "") {
					updatedCriteria.splice(existingIndex, 1);
				} else {
					updatedCriteria[existingIndex] = { key, exact, value: filter };
				}
			} else if (filter.trim() !== "") {
				updatedCriteria.push({ key, exact, value: filter });
			}
			return updatedCriteria;
		});
	};

	const handleVisible = (isVisible: boolean) =>
		setModalCreateVisible(isVisible);

	return (
		<Layout>
			<div className="cropsPage">
				<h2 className="titulo-crops">Cultivares de {titulo}</h2>
				<SearchForm
					placeholder="Pesquisa por nome"
					onSearch={(search: string) => handleFilter(search, "name")}
				/>

				<div className="container-button-crops">
					<NavButton Url={"/crops"} page="list" text="Voltar" type="voltar" />
					{user && (
						<div>
							<button
								onClick={() => setModalCreateVisible(true)}
								className="navButton-cadastrar-list"
							>
								Cadastrar Cultivar
							</button>
						</div>
					)}
				</div>
				<Table
					data={filteredData}
					columns={columns}
					actions={actions}
					translations={{}}
				/>
				<ModalCreateCultivar
					handleVisible={handleVisible}
					visible={modalCreateVisible}
					id={params.id}
				/>
				<ModalEditCultivar
					visible={modalEditVisible}
					handleVisible={(isVisible: boolean) => setModalEditVisible(isVisible)}
					id={params.id}
					cultivarId={selectedCultivar?.id ?? ""}
				/>
			</div>
		</Layout>
	);
};

export default Cultivars;
