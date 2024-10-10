import React from "react";
import Image from "next/image";
import "../../styles/table/table.css";

interface TableProps {
  data: any[],
  columns: { header: string, accessor: string }[],
  onView?: (id: string) => void,
  onEdit?: (id: string) => void,
  onDelete: (id: string) => void,
  translations?: { [key: string]: { [key: string]: string } }
}

const Table: React.FC<TableProps> = ({ data, columns, onView, onDelete, onEdit, translations }) => {

  const getTranslation = (value: string, translationMap?: { [key: string]: string }): string => {
    return translationMap && translationMap[value] ? translationMap[value] : "Não informado"
  } 

  const displayValue = (value: any): string => {
    return value === null || value === undefined || value === "" ? "Não informado" : String(value)
  };

  return (
    <div className="table-container">
      
      <div className="header-list">

        {columns.map((col) => (
          <div key={col.accessor} className={`header-col-${col.accessor}`}>
            {col.header}
          </div>
        ))}
        
        <div className="header-col-actions">
          Ações
        </div>
      
      </div>

      {data.map((row: any) => (
      
      <div key={row.id} className="content-list">
          {columns.map((col) => (
            <div key={col.accessor} className={`result-col-${col.accessor}`}>
              {translations && translations[col.accessor]
                ? getTranslation(row[col.accessor], translations[col.accessor])
                : displayValue(row[col.accessor])}
            </div>
          ))}

          <div className="result-col-actions">
            {onView && (
              <Image src={"/eye.svg"} alt="visualizar" width={24} height={24} onClick={() => onView(row.id)} />
            )}
            {onEdit && (
              <Image src={"/pencil.svg"} alt="editar" width={20} height={20} onClick={() => onEdit(row.id)} />
            )}
            <Image src={"/delete.svg"} alt="excluir" width={24} height={24} onClick={() => onDelete(row.id)} className="pointer-cursor" />
          </div>
        </div>

      ))}
    </div>
  );
}

export default Table;
