import { ChangeEvent, FormEvent, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useGlobal } from "../../contexts/GlobalContext";
import { useTransaction } from "../../services/query";
import { convertToCents } from "../../utils/utilities";
import "./styles.css";
const RegisterModal = () => {
  const queryKey = ["transacao/listar"];
  const { create, edit } = useTransaction();

  const { mutate: editMutate } = edit<any>({
    url: "/transacao/editar/",
    queryKey,
  });

  const { mutate } = create<any>({
    url: "/transacao/cadastrar",
    queryKey,
  });

  const {
    setIsOpenRegisterModal,
    typeRegisterModal,
    formRegister,
    setFormRegister,
    getCategories,
    categories,
    handleClear,
    typeTransaction,
  } = useGlobal();

  const handleSubmitRegister = async (event: FormEvent) => {
    event.preventDefault();
    setIsOpenRegisterModal(false);

    const valueInCents = convertToCents(String(formRegister.value));

    try {
      const commonData = {
        ...formRegister,
        value: valueInCents,
        category_id: Number(formRegister.category_id),
      };

      if (typeRegisterModal === "Editar") {
        editMutate({ data: commonData, id: formRegister.id });
      } else if (typeRegisterModal === "Adicionar") {
        mutate(commonData);
      }

      handleClear();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeMask = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/\D/g, "");

    const numericValue = parseInt(inputValue) / 100;
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);

    setFormRegister({ ...formRegister, value: formattedValue });
  };

  useEffect(() => {
    getCategories();
    setFormRegister({ ...formRegister, category_id: "" });
  }, []);

  return (
    <div className="overlay">
      <div className="register__container">
        <button
          className="register__close"
          onClick={() => {
            setIsOpenRegisterModal(false);
            handleClear();
          }}
        >
          <HiOutlineX size={20} />
        </button>

        <h1 className="register-modal__title">
          {`Adicionar nova ${typeTransaction}`}
        </h1>

        <form onSubmit={handleSubmitRegister} className="register__form">
          <section className="form__section">
            <label className="register__form-label" htmlFor="value">
              Valor
            </label>
            <input
              name="value"
              className="register-modal__input"
              id="value"
              type="text"
              value={formRegister.value}
              placeholder="R$ 0,00"
              onChange={(event) => handleChangeMask(event)}
            />
          </section>

          <section className="form__section-content-wrapper">
            <section className="form__section">
              <label className="register__form-label">Categoria</label>
              <select
                name="category_id"
                className="register-modal__input register-modal__input-select"
                value={formRegister.category_id}
                onChange={(event) =>
                  setFormRegister({
                    ...formRegister,
                    category_id: Number(event.target.value),
                  })
                }
              >
                <option value="" disabled hidden>
                  Selecionar categoria
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </section>

            <section className="form__section">
              <label className="register__form-label" htmlFor="date">
                Data
              </label>
              <input
                name="data"
                className="register-modal__input register-modal__input-date"
                id="date"
                type="date"
                value={formRegister.date}
                onChange={(event) =>
                  setFormRegister({ ...formRegister, date: event.target.value })
                }
              />
            </section>
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
