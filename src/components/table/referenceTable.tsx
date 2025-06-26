import React, { useState, useMemo } from "react";
import ReferenceDropdown from "../cultivars/referenceDropdown";
import "@/styles/table/table.css";

interface ReferenceItem {
  id: string;
  title: string;
  comment: string;
  environments: any[]; 
}

interface ReferenceTablePaginationProps {
  data: ReferenceItem[];
  cultivarId: string;
  perPage?: number;
}

export const ReferenceTablePagination: React.FC<ReferenceTablePaginationProps> = ({
  data,
  cultivarId,
  perPage = 4,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return data.slice(startIndex, startIndex + perPage);
  }, [data, currentPage, perPage]);

  const pages = Math.ceil(data.length / perPage);

  const handlePaginate = (page: number) => {
    if (page >= 1 && page <= pages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {paginatedData.length === 0 ? (
        <p>Nenhuma referência encontrada</p>
      ) : (
        paginatedData.map((item) => (
          <ReferenceDropdown
            title={item.title}
            comment={item.comment}
            environmentData={item.environments}
            id={item.id}
            cultivarId={cultivarId}
            key={`referenceDropDown-${item.id}`} // Key única baseada no ID
          />
        ))
      )}
      {pages > 1 && (
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