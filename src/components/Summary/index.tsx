import { useEffect, useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import api from "../../lib/api";
import { getItem } from "../../utils/storage";
import "./styles.css";
import { SummaryValues } from "../../types";
import { convertToCurrency } from "../../utils/utilities";
import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Summary = () => {
  const [isValueVisible, setValueIsVisible] = useState(false);
  const [summary, setSummary] = useState<SummaryValues>({
    balance: 0,
    earnings: 0,
    expenses: 0,
  });
  const {
    setIsOpenRegisterModal,
    setTypeRegisterModal,
    transactions,
    setFormRegister,
    setTypeTransaction,
  } = useGlobal();

  const handleAddRegister = (type: string) => {
    if (type === "entry") {
      setTypeTransaction("receita");
    } else {
      setTypeTransaction("despesa");
    }

    setFormRegister((prevState) => ({ ...prevState, type: type }));

    setIsOpenRegisterModal(true);
    setTypeRegisterModal("Adicionar");
  };

  const handleGetSummary = async () => {
    try {
      const response = await api.get("/resumo", {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });

      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetSummary();
  }, [transactions]);

  const toggleVisibleValue = () => {
    setValueIsVisible(!isValueVisible);
  };

  return (
    <div className="financial__summary">
      <section className="financial__summary-card">
        <h3 className="financial__summary-title">Receitas</h3>
        <p className="revenue-value">
          {isValueVisible ? convertToCurrency(summary.earnings) : "R$ ******"}
        </p>
      </section>
      <section className="financial__summary-card ">
        <h3 className="financial__summary-title">Despesas</h3>
        <p className="expense-value">
          {isValueVisible ? convertToCurrency(summary.expenses) : "R$ ******"}
        </p>
      </section>
      <section className="summary-balance-value">
        <div className="summary-balance-value-text">
          <h3 className="financial__summary-title">Saldo</h3>
          <p className="balance-value">
            {isValueVisible ? convertToCurrency(summary.balance) : "R$ ******"}
          </p>
        </div>
        {isValueVisible ? (
          <BsEye
            size={25}
            className="summary-balance-eye-icon"
            onClick={() => toggleVisibleValue()}
          />
        ) : (
          <BsEyeSlash
            size={25}
            className="summary-balance-eye-icon"
            onClick={() => toggleVisibleValue()}
          />
        )}
      </section>
      <button
        onClick={() => handleAddRegister("entry")}
        className="financial__summary-btn-revenue"
      >
        <HiOutlinePlus size={30} />
      </button>
      <button
        onClick={() => handleAddRegister("output")}
        className="financial__summary-btn-expense"
      >
        <HiMinus size={30} />
      </button>
    </div>
  );
};

export default Summary;
