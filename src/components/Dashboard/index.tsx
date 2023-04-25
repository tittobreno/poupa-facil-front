import { useState } from "react";
import "./styles.css";
import { HiChevronDoubleDown } from "react-icons/hi";

const Dashboard = () => {
  const [order, setOrder] = useState(false);
  return (
    <div className="dashboard__container">
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
        <span className="columns__item">Valor</span>
        <div className="columns__item"></div>
      </section>

      <section className="dashboard__registers"></section>
    </div>
  );
};

export default Dashboard;
