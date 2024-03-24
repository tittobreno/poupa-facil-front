import { useEffect, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { useGlobal } from "../../contexts/GlobalContext";
import Register from "../Register";
import "./styles.css";

import usePagination from "../../hooks/usePagination";
import transactionsService from "../../services/transactions";
import Filter from "../Filter";
import Pagination from "../Pagination";

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

  useEffect(() => {
    const skip = (currentPage - 1) * 10;
    const take = 10;

    const fetchData = async () => {
      const data = await transactionsService.getAll({ skip, take });
      setTransactions(data);
      setTotalItems(data.total);
    };

    fetchData();
  }, [currentPage, setTotalItems]);

  return (
    <div className="dashboard__container">
      <div className="dashboard__align">
        <Filter />

        <section className="dashboard__columns">
          <div className="columns__item item__date">
            <span className="item__date-title" onClick={() => setOrder(!order)}>
              Data
            </span>
            <HiChevronDoubleDown
              size={14}
              className={`item__date-icon ${order ? "rotate" : ""}`}
            />
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
        {transactions.total === 0 ? (
          <div className="register__not-found">
            <strong>Ops! Ainda não há registros aqui.</strong>
          </div>
        ) : (
          ""
        )}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default Dashboard;
