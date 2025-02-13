import styles from "@/styles/calculator/ListConstants/index.module.css";

interface PaginationProps {
  pages: number;
  currentPage: number;
  handlePaginate: (page: number) => void;
}

export default function Pagination({
  pages,
  currentPage,
  handlePaginate,
}: PaginationProps) {
  return (
    <div className={styles.paginationWrapper}>
      <div>
        {Array.from({ length: pages }, (_, index) => {
          const page = index + 1;
          const isWithinRange =
            page === 1 ||
            page === pages ||
            (page >= currentPage - 2 && page <= currentPage + 2);

          if (!isWithinRange) {
            if (page === currentPage - 3 || page === currentPage + 3) {
              return (
                <span key={index} className={styles.ellipsis}>
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={index}
              onClick={() => handlePaginate(page)}
              className={`${styles.pageButton} ${
                currentPage === page && styles.active
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}
