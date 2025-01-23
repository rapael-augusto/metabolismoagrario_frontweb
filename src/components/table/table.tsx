import React, { useState } from "react";
import Image from "next/image";
import "../../styles/table/table.css";
import StatusColumn from "./columns/status";
import { FaEye, FaGavel, FaPencil, FaTrash } from "react-icons/fa6";

interface TableProps {
  data: any[];
  columns: { header: string; accessor: string; type?: string }[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onChangeStatus?: (id: string) => void;
  onDelete: (id: string) => void;
  translations?: { [key: string]: { [key: string]: string } };
  permissions?: { [key: string]: boolean };
  perPage?: number;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  onView,
  onDelete,
  onEdit,
  onChangeStatus,
  translations,
  permissions = {},
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

  const displayValue = (value: any): string => {
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
        {/* Adicionando um contêiner para rolagem */}
        <table className="table-container">
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                Ações
              </th>
              {columns.map((col) => (
                <th key={col.accessor} scope="col">
                  <span title={col.header}>{col.header}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row: any, index) => (
              <tr key={row.id}>
                <td className="actions-col" style={{ textAlign: "center" }}>
                  <div>
                    {row.status === "Pending" &&
                      permissions["changeStatus"] &&
                      onChangeStatus && (
                        <FaGavel
                          onClick={() => onChangeStatus(row.id)}
                          title="Editar"
                        />
                      )}
                    {onView && (
                      <FaEye
                        onClick={() => onView(row.id)}
                        title="Visualizar"
                      />
                    )}
                    {onEdit && (
                      <FaPencil onClick={() => onEdit(row.id)} title="Editar" />
                    )}
                    <FaTrash
                      onClick={() => onDelete(row.id)}
                      className="pointer-cursor"
                      title="Excluir"
                    />
                  </div>
                </td>

                {columns.map((col) => {
                  const text =
                    translations && translations[col.accessor]
                      ? getTranslation(
                          row[col.accessor],
                          translations[col.accessor]
                        )
                      : displayValue(row[col.accessor]);
                  return (
                    <td key={col.accessor}>
                      {col.type && col.type == "STATUS" ? (
                        <StatusColumn status={row[col.accessor]} />
                      ) : (
                        <span title={text}>{text}</span>
                      )}
                    </td>
                  );
                })}
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
