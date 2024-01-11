import { useEffect, useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./styles.css";
import { SummaryValues } from "../../types";
import { convertToCurrency } from "../../utils/utilities";

const Summary = () => {
  const [summary, setSummary] = useState<SummaryValues>({
    balance: 0,
    earnings: 0,
    expenses: 0,
  });
  const {
    setIsOpenRegisterModal,
    setTypeRegisterModal,
    handleClear,
    transactions,
  } = useGlobal();

  const handleAddRegister = () => {
    handleClear();
    setIsOpenRegisterModal(true);
    setTypeRegisterModal("Adicionar");
  };

  const handleGetSummary = async () => {
    try {
      const response = await api.get("/sumario", {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });

      setSummary(response.data);
      console.log(summary, "summary");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetSummary();
  }, [transactions]);
  return (
    <aside className="summary__main">
      <h3 className="summary__title">Resumo</h3>
      <section className="summary__deposit summary__section">
        <span className="deposit__title">Entradas</span>
        <span className="deposit__value">
          {convertToCurrency(summary.earnings)}
        </span>
      </section>

      <section className="summary__cash-out summary__section">
        <span className="cash-out__title">Saídas</span>
        <span className="cash-out__value">
          {convertToCurrency(summary.expenses)}
        </span>
      </section>

      <section className="summary__balance summary__section">
        <span className="balance__title">Saldo</span>
        <span className="balance__value">
          {convertToCurrency(summary.balance)}
        </span>
      </section>

      <button onClick={() => handleAddRegister()} className="summary__button">
        Adicionar Registro
      </button>
    </aside>
  );
};

export default Summary;
