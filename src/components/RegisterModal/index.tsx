import { useGlobal } from "../../context/GlobalContext";
import "./styles.css";
import { HiOutlineX } from "react-icons/hi";

const RegisterModal = () => {
  const { setShowRegisterModal, typeModal, setOpenPopUpNewRegister } =
    useGlobal();

  const handleChangeType = (type: string): void => {
    const input = document.querySelector(".types__input") as HTMLButtonElement;
    const output = document.querySelector(
      ".types__output"
    ) as HTMLButtonElement;

    if (type === "input") {
      input.style.backgroundColor = "#6d28d9";
      output.style.backgroundColor = "#9ca3af";
    } else {
      input.style.backgroundColor = "#9ca3af";
      output.style.backgroundColor = "#fa8c10";
    }
  };

  const handleConfirm = () => {
    setOpenPopUpNewRegister(true);
    setShowRegisterModal(false);
  };

  return (
    <div className="overlay">
      <div className="register__container">
        <button
          className="register__close"
          onClick={() => setShowRegisterModal(false)}
        >
          <HiOutlineX size={30} />
        </button>

        <h1 className="register-modal__title">
          {typeModal ? "Adicionar Registro" : "Editar Registro"}
        </h1>

        <section className="register__types">
          <button
            className="types__input"
            onClick={() => handleChangeType("input")}
          >
            Entrada
          </button>

          <button
            className="types__output"
            onClick={() => handleChangeType("output")}
          >
            Saída
          </button>
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

          <button
            onClick={() => handleConfirm()}
            type="button"
            className="form__btn"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
