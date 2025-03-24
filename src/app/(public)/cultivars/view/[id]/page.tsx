"use client";

import Layout from "@/components/layout/layout";
import "@/styles/crops/pageCrops.css";
import "@/styles/cultivar/pageCultivar.css";
import NavButton from "@/components/layout/navigationButton";
import InputDefault from "@/components/forms/inputDefault";
import ReferenceDropdown from "@/components/cultivars/referenceDropdown";
import Styles from "@/styles/cultivar/ViewCultivarPage.module.css";
import { useEffect, useState } from "react";
import { cultivarService } from "@/services/cultivar";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth/authContext";

interface Props {
	params: { id: string };
}

interface EnvironmentData {
	id: string;
	climate: string | null;
	biome: string | null;
	customBiome: string | null;
	irrigation: string | null;
	countryId: string;
	soil: string | null;
	customSoil: string | null;
	cultivationSystem: string | null;
	createdAt: string;
	updatedAt: string;
	constants: Constant[];
}

interface Constant {
	id: string;
	value: number;
	type: string;
	comment: string | null;
}

interface Reference {
	id: string;
	title: string;
	comment: string | null;
	environments: EnvironmentData[];
}

interface Cultivar {
	id: string;
	name: string;
	references: Reference[];
}

const ViewCultivar = ({ params }: Props) => {
	const [cultivar, setCultivar] = useState<Cultivar | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();
	const { user } = useAuthContext();

	useEffect(() => {
		const service = new cultivarService();
		const fetchCultivar = async () => {
			try {
				const data = await service.findOne(params.id);
				setCultivar(data);
			} catch (error) {
				console.error("Erro ao buscar cultivar:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchCultivar();
	}, [params.id]);

	return (
		<Layout>
			<div className="cropsPage">
				<h2 className="titulo-crops">
					Detalhes da cultivar {cultivar && cultivar.name}
				</h2>
				<div className="container-button-crops">
					<Link href="#" onClick={() => router.back()}>
						<FaChevronLeft color="#000" />
					</Link>
				</div>

				<main className={Styles.cultivarCardContainer}>
					<div className={Styles.cultivarCard}>
						<section className={Styles.infoSection}>
							<h3 className={Styles.sectionTitle}>Informações</h3>
							<div className={Styles.formContainer}>
								<InputDefault
									classe="form-input-box"
									label="Nome"
									placeholder="Nome"
									value={cultivar ? cultivar.name : ""}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										console.log(e.target.value)
									}
									type={"text"}
									disabled
								/>
							</div>
						</section>

						<section className={Styles.referenceSection}>
							<div className={Styles.sectionHeader}>
								<h3 className={Styles.sectionTitle}>Referências</h3>
								{user && (
									<Link
										href={`/criarConstant/${params.id}`}
										className={Styles.headerButton}
									>
										Criar Referência
									</Link>
								)}
							</div>
							<div className={Styles.dropdownsContainer}>
								{cultivar && cultivar.references.length > 0 ? (
									<>
										{cultivar.references.map((item, index) => (
											<ReferenceDropdown
												title={item.title}
												environmentData={item.environments}
												key={`referenceDropDown${index}`}
											/>
										))}
									</>
								) : (
									<p>Nenhuma referência encontrada</p>
								)}
							</div>
						</section>
					</div>
				</main>
			</div>
		</Layout>
	);
};

export default ViewCultivar;
