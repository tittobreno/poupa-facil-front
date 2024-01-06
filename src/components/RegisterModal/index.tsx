import { HiOutlineX } from "react-icons/hi";
import { useGlobal } from "../../contexts/GlobalContext";
import "./styles.css";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Category, Transaction } from "../../types";

const RegisterModal = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    setIsOpenRegisterModal,
    typeRegisterModal,
    handleShowToast,
    handleGetRegisters,
    formRegister,
    setFormRegister,
  } = useGlobal();

  const handleSubmitRegister = async (event: FormEvent) => {
    event.preventDefault();
    setIsOpenRegisterModal(false);

    try {
      if (typeRegisterModal === "Editar") {
        await api.put(
          `/transacao/editar/${formRegister.id}`,
          {
            ...formRegister,
            value: Number(formRegister.value) * 100,
            category_id: Number(formRegister.category_id),
          },
          {
            headers: {
              Authorization: `Bearer ${getItem("token")}`,
            },
          }
        );
        handleShowToast("Registro editado com sucesso!");
        handleGetRegisters();
        return;
      }

      if (typeRegisterModal === "Adicionar") {
        await api.post(
          "/transacao/cadastrar",
          {
            ...formRegister,
            value: Number(formRegister.value) * 100,
            category_id: Number(formRegister.category_id),
          },
          {
            headers: {
              Authorization: `Bearer ${getItem("token")}`,
            },
          }
        );
        handleShowToast("Registro adicionado com sucesso!");
        handleGetRegisters();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeType = (type: string): void => {
    setFormRegister({
      ...formRegister,
      type: type === "input" ? "entry" : "output",
    });
  };

  const handleChangeColor = (): void => {
    const input = document.querySelector(".types__input") as HTMLButtonElement;
    const output = document.querySelector(
      ".types__output"
    ) as HTMLButtonElement;

    if (formRegister.type === "entry") {
      input.style.backgroundColor = "#6d28d9";
      output.style.backgroundColor = "#9ca3af";
    } else if (formRegister.type === "output") {
      input.style.backgroundColor = "#9ca3af";
      output.style.backgroundColor = "#fa8c10";
    }
  };

  useEffect(() => {
    handleChangeColor();
  }, [formRegister.type]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await api.get("/categorias", {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });

      setCategories(response.data);
    };
    getCategories();
    setFormRegister({ ...formRegister, category_id: "" });
  }, []);

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
              value={formRegister.value}
              onChange={(event) =>
                setFormRegister({
                  ...formRegister,
                  value: event.target.value,
                })
              }
            />
          </section>

          <section className="form__section">
            <label className="register__form-label">Categoria</label>
            <select
              name="category_id"
              className="register-modal__input"
              value={formRegister.category_id}
              onChange={(event) =>
                setFormRegister({
                  ...formRegister,
                  category_id: Number(event.target.value),
                })
              }
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
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
              value={formRegister.date}
              onChange={(event) =>
                setFormRegister({ ...formRegister, date: event.target.value })
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
              value={formRegister.description}
              onChange={(event) =>
                setFormRegister({
                  ...formRegister,
                  description: event.target.value,
                })
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
