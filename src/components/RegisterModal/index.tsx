import { HiOutlineX } from "react-icons/hi";
import { useGlobal } from "../../contexts/GlobalContext";
import "./styles.css";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import { Transaction } from "../../types";

const RegisterModal = () => {
  const [form, setForm] = useState<Transaction>({
    description: "",
    value: "",
    type: "entry",
    date: "",
    category_id: "",
  });

  const { setIsOpenRegisterModal, typeRegisterModal, handleShowToast } =
    useGlobal();

  const handleChangeType = (type: string): void => {
    const input = document.querySelector(".types__input") as HTMLButtonElement;
    const output = document.querySelector(
      ".types__output"
    ) as HTMLButtonElement;

    if (type === "input") {
      setForm({ ...form, type: "entry" });
      input.style.backgroundColor = "#6d28d9";
      output.style.backgroundColor = "#9ca3af";
    } else {
      setForm({ ...form, type: "output" });

      input.style.backgroundColor = "#9ca3af";
      output.style.backgroundColor = "#fa8c10";
    }
  };
  console.log(form);

  const handleSubmitRegister = async (event: FormEvent) => {
    event.preventDefault();
    setIsOpenRegisterModal(false);

    if (typeRegisterModal === "Editar") {
      handleShowToast("Registro editado com sucesso!");
    } else {
      handleShowToast("Registro adicionado com sucesso!");
    }

    try {
      const response = await api.post(
        "/transacao/cadastrar",
        {
          ...form,
          value: Number(form.value) * 100,
          category_id: Number(form.category_id),
        },
        {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="overlay">
      <div className="register__container">
        <button
          className="register__close"
          onClick={() => setIsOpenRegisterModal(false)}
        >
          <HiOutlineX size={30} />
        </button>

        <h1 className="register-modal__title">
          {typeRegisterModal + " " + "Registro"}
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

        <form onSubmit={handleSubmitRegister} className="register__form">
          <section className="form__section">
            <label className="register__form-label" htmlFor="value">
              Valor
            </label>
            <input
              name="value"
              className="register-modal__input"
              id="value"
              type="number"
              value={form.value}
              onChange={(event) =>
                setForm({ ...form, value: event.target.value })
              }
            />
          </section>

          <section className="form__section">
            <label className="register__form-label">Categoria</label>
            <select
              name="category_id"
              className="register-modal__input"
              value={form.category_id}
              onChange={(event) =>
                setForm({
                  ...form,
                  category_id: event.target.value,
                })
              }
            >
              <option>Selecione uma categoria</option>
              <option>1</option>
              <option>2</option>
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
              value={form.date}
              onChange={(event) =>
                setForm({ ...form, date: event.target.value })
              }
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
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
          </section>

          <button type="submit" className="form__btn">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
