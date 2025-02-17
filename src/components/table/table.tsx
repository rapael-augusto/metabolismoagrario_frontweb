import React, { useMemo, useState } from "react";
import "@/styles/table/table.css";
import StatusColumn from "./columns/status";
import { IconType } from "react-icons";
import { ReviewStatus } from "@/types/cultivarTypes";

interface TableProps {
	data: any[];
	columns: TableColumn[];
	actions?: TableAction[];
	translations?: { [key: string]: { [key: string]: string } };
	perPage?: number;
}

export interface TableColumn {
	header: string;
	accessor: string;
	type?: string;
	visible?: boolean;
}

export interface TableAction {
	icon: IconType;
	title: string;
	onClick: (row: any) => void;
	visible?: (row: any) => boolean;
}

const Table: React.FC<TableProps> = ({
	data,
	columns,
	actions,
	translations,
	perPage = 4,
}) => {
	const [currentPage, setCurrentPage] = useState(1);

	const getTranslation = (
		value: string,
		translationMap?: { [key: string]: string }
	): string => {
		return translationMap && translationMap[value]
			? translationMap[value]
			: "Não informado";
	};

	const displayValue = (row: any, accessor: string): string => {
		const keys = accessor.split(".");
		let value = row;
		for (const key of keys) {
			value = value ? value[key] : undefined;
		}
		return value === null || value === undefined || value === ""
			? "Não informado"
			: String(value);
	};

	const pages = Math.ceil(data.length / perPage);

	const paginatedData = data.slice(
		(currentPage - 1) * perPage,
		currentPage * perPage
	);

	const handlePaginate = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div style={{ width: "100%" }}>
			<div className="table-wrapper">
				<table className="table-container">
					<thead>
						<tr>
							{columns.map(
								(col) =>
									(col.visible ?? true) && (
										<th key={col.accessor} scope="col">
											<span title={col.header}>{col.header}</span>
										</th>
									)
							)}
							{actions && (
								<th scope="col" style={{ textAlign: "center" }}>
									Ações
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{paginatedData.map((row: any, index) => (
							<tr key={row.id}>
								{columns.map((col) => {
									const colVisible = col.visible ?? true;
									const text =
										translations && translations[col.accessor]
											? getTranslation(
													displayValue(row, col.accessor),
													translations[col.accessor]
											  )
											: displayValue(row, col.accessor);
									return (
										colVisible && (
											<td key={col.accessor}>
												{col.type && col.type === "STATUS" ? (
													<StatusColumn
														status={
															displayValue(row, col.accessor) as ReviewStatus
														}
													/>
												) : (
													<span title={text}>{text}</span>
												)}
											</td>
										)
									);
								})}
								{actions && (
									<td className="actions-col" style={{ textAlign: "center" }}>
										<div>
											{actions.map((action, index) => {
												if (action.visible && !action.visible(row)) return null;
												return (
													<action.icon
														key={`action_${index}`}
														onClick={() => action.onClick(row)}
														title={action.title}
													/>
												);
											})}
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{data.length > perPage && (
				<div className="paginatedWrapper">
					<button
						className="pagePrevButton"
						onClick={() => handlePaginate(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<p>Anterior</p>
					</button>
					<div className="pagesWrapper">
						{Array.from({ length: pages }, (_, index) => (
							<button
								key={index}
								onClick={() => handlePaginate(index + 1)}
								className={`${currentPage === index + 1 ? "pageActive" : ""}`}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						className="pageNextButton"
						onClick={() => handlePaginate(currentPage + 1)}
						disabled={currentPage === pages}
					>
						<p>Próxima</p>
					</button>
				</div>
			)}
		</div>
	);
};

export default Table;
