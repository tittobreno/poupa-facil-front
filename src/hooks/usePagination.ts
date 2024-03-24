import { useState, useEffect } from "react";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface PaginationResult extends PaginationState {
  setTotalItems: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  paginate: <T>(items: T[], currentPage: number) => T[];
}

const usePagination = (
  initialPage = 1,
  itemsPerPage = 10
): PaginationResult => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPagesCount);
  }, [totalItems, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const paginate = <T>(items: T[], currentPage: number): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    setTotalItems,
    nextPage,
    prevPage,
    goToPage,
    paginate,
  };
};

export default usePagination;
