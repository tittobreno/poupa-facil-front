import { useEffect, useState } from "react";
import "./styles.css";
import { HiChevronDoubleDown } from "react-icons/hi";
import Register from "../Register";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
type Transaction = {
  description: string;
  value: number;
  date: string;
  id: number;
  type: string;
  user_id: number;
  category_name: string;
  category_id: number;
};

const Dashboard = () => {
  const [order, setOrder] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const handleGetRegisters = async () => {
      const { data } = await api.get("/transacao/listar", {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });
      setTransactions(data);
    };
    handleGetRegisters();
  }, []);
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

      <ul className="dashboard__registers">
        <Register transactions={transactions} />
      </ul>
    </div>
  );
};

export default Dashboard;
