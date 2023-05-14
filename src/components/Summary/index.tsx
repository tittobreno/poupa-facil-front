import { useGlobal } from "../../context/GlobalContext";
import "./styles.css";

const Summary = () => {
  const { setShowRegisterModal, setTypeModal, setTitlePopup } = useGlobal();

  const handleAddRegister = () => {
    setTitlePopup("Registro adicionado com sucesso!");
    setShowRegisterModal(true);
    setTypeModal("Adicionar");
  };
  return (
    <aside className="summary__main">
      <h3 className="summary__title">Resumo</h3>
      <section className="summary__deposit summary__section">
        <span className="deposit__title">Entradas</span>
        <span className="deposit__value">R$ 500,00</span>
      </section>

      <section className="summary__cash-out summary__section">
        <span className="cash-out__title">Saídas</span>
        <span className="cash-out__value">R$ 100,00</span>
      </section>

      <section className="summary__balance summary__section">
        <span className="balance__title">Saldo</span>
        <span className="balance__value">R$ 100,00</span>
      </section>

      <button onClick={() => handleAddRegister()} className="summary__button">
        Adicionar Registro
      </button>
    </aside>
  );
};

export default Summary;
