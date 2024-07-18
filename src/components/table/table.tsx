import React from "react";
import Image from "next/image";
import "../../styles/table/table.css"

interface TableProps {
  data: any[], 
  columns: { header: string, accessor: string }[],
  onDelete: (id: string) => void,
  onEdit?: (id: string) => void,
  translations?: { [key: string]: any }
}

const Table: React.FC<TableProps> = ({ data, columns, onDelete, onEdit, translations }) => {
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
              {translations?.[col.accessor]?.[row[col.accessor]] || row[col.accessor] || 'Não informado'}
            </div>
          ))}

          <div className="result-col-actions">
            <Image src={"/eye.svg"} alt="visualizar" width={24} height={24} />
            {onEdit && (
              <Image src={"/pencil.svg"} alt="editar" width={20} height={20} onClick={() => onEdit(row.id)} />
            )}
          
            <Image src={"/delete.svg"} alt="excluir" width={24} height={24} onClick={() => onDelete(row.id)} className="pointer-cursor" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Table;
