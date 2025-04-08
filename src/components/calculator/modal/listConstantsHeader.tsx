import { FaFilter, FaTimes } from "react-icons/fa";
import styles from "@/styles/calculator/listConstantsHeader/index.module.css";
import { CalculatorContext } from "@/contexts/calculatorContext";
import { useContext, useState } from "react";
import {
	filterOptionsTranlation,
	translationsMap,
} from "@/utils/translationsOptions";
import ListFilters from "./filter/listFilters";
import { dadosConstants } from "@/app/(public)/constant/[id]/page";
import Modal from "@/components/modal";
import { toast } from "react-toastify";

export default function ListConstantsHeader() {
	const { filterCriteria, updateFilter } = useContext(CalculatorContext);
	const [filters, setFilters] = useState({
		climate: "",
		biome: "",
		irrigation: "",
		cultivationSystem: "",
		soil: "",
	});

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
	};

	const handleReset = (filterName: string) => {
		setFilters((prevFilters) => ({ ...prevFilters, [filterName]: "" }));
	};
	const [isModalOpen, setIsModalOpen] = useState(true);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const handleConfirmModal = () => {
		Object.entries(filters).map(([key, value]) => {
			updateFilter(key as keyof dadosConstants, value);
		});
		handleCloseModal();
	};

	const handleRemoveFilter = (key: keyof dadosConstants) => {
		updateFilter(key, "");
		handleReset(key);
	};

	return (
		<div className={styles.listConstantsHeader}>
			<div className={styles.filterButtonsContainer}>
				<>
					<h4>Filtrando por: </h4>
					<div className={styles.filterButtonsWrapper}>
						{Object.entries(filterCriteria).map(
							([key, value]) =>
								key !== "type" &&
								value && (
									<button
										key={value}
										onClick={(e) =>
											handleRemoveFilter(key as keyof dadosConstants)
										}
										className={styles.filterButton}
										disabled={key === "type"}
									>
										<span>
											{filterOptionsTranlation[key]}:{" "}
											<b>{translationsMap[key][value] ?? value}</b>
										</span>
										{key !== "type" && <FaTimes />}
									</button>
								)
						)}
					</div>
				</>
			</div>
			<button onClick={handleOpenModal}>
				<FaFilter />
				Filtrar
			</button>

			<Modal size={"md"} isOpen={isModalOpen}>
				<Modal.Header
					title="Filtrar Referências"
					description="Escolha os filtros desejados para refinar os resultados. Os filtros aplicados serão exibidos na parte superior, e você pode removê-los individualmente."
					onClose={handleCloseModal}
				/>
				<Modal.Main>
					<ListFilters
						filters={filters}
						handleReset={handleReset}
						handleFilterChange={handleFilterChange}
					/>
				</Modal.Main>
				<Modal.Footer
					cancelText="Voltar"
					submitText="Filtrar"
					onCancel={handleCloseModal}
					onSubmit={handleConfirmModal}
				/>
			</Modal>
		</div>
	);
}
