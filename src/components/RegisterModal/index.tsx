import "./styles.css";

const RegisterModal = ({ setShowRegisterModal }: any) => {
  return (
    <div className="overlay">
      <div className="container-insert-register">
        <section className="header">
          <h1>"Adicionar Registro"</h1>
          <button onClick={() => setShowRegisterModal(false)}>X</button>
        </section>

        <section className="section-btn">
          <button className="btn deposit-modal">Entrada</button>

          <button className="btn cash-out-modal">Saída</button>
        </section>

        <form className="section-form">
          <label className="label" htmlFor="value">
            Valor
          </label>
          <input name="valor" className="input" id="value" type="text" />

          <label className="label">Categoria</label>
          <select name="categoria_id" className="select">
            <option>Selecione uma categoria</option>
            <option>Categoria1</option>
          </select>

          <label className="label" htmlFor="date">
            Data
          </label>
          <input name="data" className="input" id="date" type="date" />

          <label className="label" htmlFor="description">
            Descrição
          </label>
          <input
            name="descricao"
            className="input"
            id="description"
            type="text"
          />

          <button type="submit" className="btn-confirm">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
