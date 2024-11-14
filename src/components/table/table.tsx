import React, { useState } from "react";
import Image from "next/image";
import "../../styles/table/table.css";

interface TableProps {
  data: any[];
  columns: { header: string; accessor: string }[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
  translations?: { [key: string]: { [key: string]: string } };
  perPage?: number;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  onView,
  onDelete,
  onEdit,
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
              {columns.map((col) => (
                <th key={col.accessor} scope="col">
                  <span title={col.header}>{col.header}</span>
                </th>
              ))}
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row: any, index) => (
              <tr key={row.id}>
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
                      <span title={text}>{text}</span>
                    </td>
                  );
                })}

                <td className="actions-col">
                  {onView && (
                    <Image
                      src={"/eye.svg"}
                      alt="visualizar"
                      width={24}
                      height={24}
                      onClick={() => onView(row.id)}
                      title="Visualizar"
                    />
                  )}
                  {onEdit && (
                    <Image
                      src={"/pencil.svg"}
                      alt="editar"
                      width={20}
                      height={20}
                      onClick={() => onEdit(row.id)}
                      title="Editar"
                    />
                  )}
                  <Image
                    src={"/delete.svg"}
                    alt="excluir"
                    width={24}
                    height={24}
                    onClick={() => onDelete(row.id)}
                    className="pointer-cursor"
                    title="Excluir"
                  />
                </td>
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
