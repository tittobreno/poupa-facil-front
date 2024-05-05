import { useEffect, useState } from "react";
import Search from "../../assets/search-file.svg";
import { useGlobal } from "../../contexts/GlobalContext";
import usePagination from "../../hooks/usePagination";
import { TransactionsList } from "../../models";
import { useTransaction } from "../../services/query";
import Filter from "../Filter";
import Pagination from "../Pagination";
import Register from "../Register";
import "./styles.css";
import { useToast } from "../../hooks/useToast";
export interface ParamsType {
  skip: number;
  take: number;
  categories: number[];
}
const Dashboard = () => {
  const [order, setOrder] = useState(false);
  const { setTransactions } = useGlobal();
  const toast = useToast();
  const {
    currentPage,
    totalPages,
    setTotalItems,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination();

  const { getAll } = useTransaction;

  const [params, setParams] = useState<ParamsType>({
    skip: 0,
    take: 10,
    categories: [],
  });

  const { data, refetch } = getAll<TransactionsList>({
    url: "transacao/listar",
    params,
  });

  useEffect(() => {
    if (data) {
      setTransactions(data);
      setTotalItems(data?.total);
    }
    refetch();
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
          refetch={refetch}
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
        {data && data?.total > 0 ? (
          data.listUserTransactions.map((transaction) => (
            <Register key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="register__not-found">
            <img src={Search} alt="Imagem" className="not-found-img" />
            <span>Nenhum registro encontrado!</span>
          </div>
        )}
      </ul>
      {data && data?.total > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={handleNextPage}
          prevPage={handlePrevPage}
          goToPage={goToPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
