import { useEffect, useState } from "react";
import "./styles.css";
import { HiChevronDoubleDown, HiPlus } from "react-icons/hi";
import Register from "../Register";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { useGlobal } from "../../contexts/GlobalContext";
import { HiOutlinePlus } from "react-icons/hi2";
import Summary from "../Summary";
import Filter from "../Filter";

const Dashboard = () => {
  const [order, setOrder] = useState(false);
  const { handleGetRegisters, transactions } = useGlobal();

  useEffect(() => {
    handleGetRegisters();
  }, []);

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
        {transactions.map((transaction) => (
          <Register key={transaction.id} transaction={transaction} />
        ))}
        {transactions.length === 0 ? (
          <div className="register__not-found">
            <strong>Ops! Ainda não há registros aqui.</strong>
          </div>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
