import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./styles.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}: PaginationProps) => {
  const pageItems: JSX.Element[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(
      <span
        key={i}
        className={`pagination-item ${
          currentPage === i ? "selected-item" : ""
        }`}
        onClick={() => goToPage(i)}
      >
        {i}
      </span>
    );
  }

  return (
    <div className="pagination">
      <div className="pagination__previous" onClick={() => prevPage()}>
        <IoIosArrowBack />
        Anterior
      </div>
      {pageItems}
      <div className="pagination__next" onClick={() => nextPage()}>
        Próximo
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default Pagination;
