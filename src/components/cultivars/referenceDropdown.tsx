import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import EnvironmentDropdown from "./environmentDropdown";

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

export default function ReferenceDropdown({
	environmentData,
	title,
}: {
	environmentData: EnvironmentData[];
	title: string;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={Styles.toggleButton}
			>
				{title}
				{isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
			</button>
			<div className={Styles.content}>
				{environmentData.map((environment, index) => (
					<EnvironmentDropdown environment={environment} index={index} />
				))}
			</div>
		</div>
	);
}
