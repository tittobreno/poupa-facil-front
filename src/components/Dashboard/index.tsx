import { useEffect, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { useGlobal } from "../../contexts/GlobalContext";
import Register from "../Register";
import "./styles.css";

import usePagination from "../../hooks/usePagination";
import transactionsService from "../../services/transactions";
import Filter from "../Filter";
import Pagination from "../Pagination";
export interface ParamsType {
  skip: number;
  take: number;
  categories: number[];
}
const Dashboard = () => {
  const [order, setOrder] = useState(false);
  const { transactions, setTransactions } = useGlobal();
  const {
    currentPage,
    totalPages,
    setTotalItems,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination();

  const [params, setParams] = useState<ParamsType>({
    skip: 0,
    take: 10,
    categories: [],
  });

  const fetchData = async () => {
    const data = await transactionsService.getAll(params);
    setTransactions(data);
    setTotalItems(data.total);
  };

  useEffect(() => {
    fetchData();
  }, [setTotalItems, params.skip, params.take]);

  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      skip: (currentPage - 1) * prevParams.take,
    }));
  }, [currentPage]);

  const handleNextPage = () => {
    setParams({ ...params, categories: [] });
    nextPage();
  };

  const handlePrevPage = () => {
    setParams({ ...params, categories: [] });
    prevPage();
  };

  return (
    <div className="dashboard__container">
      <div className="dashboard__align">
        <Filter
          params={params}
          setParams={setParams}
          fetchData={fetchData}
          setTotalItems={setTotalItems}
          currentPage={currentPage}
        />

        <section className="dashboard__columns">
          <div className="columns__item item__date">
            <span className="item__date-title">Data</span>
          </div>
          <span className="columns__item">Dia da semana</span>
          <span className="columns__item">Descrição</span>
          <span className="columns__item">Categoria</span>
          <span className="columns__item">Tipo</span>
          <span className="columns__item">Valor</span>
          <div className="columns__item"></div>
        </section>
      </div>
      <ul className="dashboard__registers">
        {transactions.listUserTransactions.map((transaction) => (
          <Register key={transaction.id} transaction={transaction} />
        ))}
        {transactions.total === 0 && (
          <div className="register__not-found">
            <strong>Ops! Nenhum registro encontrado.</strong>
          </div>
        )}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={handleNextPage}
        prevPage={handlePrevPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default Dashboard;
