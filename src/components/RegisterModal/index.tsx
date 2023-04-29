import "./styles.css";
import { HiOutlineX } from "react-icons/hi";
const RegisterModal = ({ setShowRegisterModal }: any) => {
  return (
    <div className="overlay">
      <div className="register__container">
        <section className="register__header">
          <h1 className="register-modal__title">Adicionar Registro</h1>
          <button
            className="register__close"
            onClick={() => setShowRegisterModal(false)}
          >
            <HiOutlineX size={30} />
          </button>
        </section>

        <section className="register__types">
          <button className="types__input">Entrada</button>

          <button className="types__output">Saída</button>
        </section>

        <form className="register__form">
          <section className="form__section">
            <label className="register__form-label" htmlFor="value">
              Valor
            </label>
            <input
              name="valor"
              className="register-modal__input"
              id="value"
              type="text"
            />
          </section>

          <section className="form__section">
            <label className="register__form-label">Categoria</label>
            <select name="categoria_id" className="register-modal__input">
              <option>Selecione uma categoria</option>
              <option>Categoria1</option>
            </select>
          </section>

          <section className="form__section">
            <label className="register__form-label" htmlFor="date">
              Data
            </label>
            <input
              name="data"
              className="register-modal__input"
              id="date"
              type="date"
            />
          </section>

          <section className="form__section">
            <label className="register__form-label" htmlFor="description">
              Descrição
            </label>
            <input
              name="descricao"
              className="register-modal__input"
              id="description"
              type="text"
            />
          </section>

          <button type="submit" className="btn-confirm">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
