import { useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useGlobal } from "../../contexts/GlobalContext";
import api from "../../lib/axios";
import { Category, Transaction } from "../../types";
import { getItem } from "../../utils/storage";
import { convertToBrl, convertToCurrency } from "../../utils/utilities";
import DeleteRegister from "../Popups/DeleteRegister";
import "./styles.css";

type PropsRegister = {
  transaction: Transaction;
};
const Register = ({ transaction }: PropsRegister) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const weekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  const {
    setIsOpenRegisterModal,
    setTypeRegisterModal,
    formRegister,
    setFormRegister,
    handleClear,
    setTypeTransaction,
  } = useGlobal();

  const handleOpenEditModal = async () => {
    try {
      handleClear();
      setTypeRegisterModal("Editar");
      setIsOpenRegisterModal(true);

      const token = getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const { data: register } = await api.get(
        `transacao/detalhar/${transaction.id}`,
        { headers }
      );
      if (register.type === "entry") {
        setTypeTransaction("receita");
      }

      if (register.type === "output") {
        setTypeTransaction("despesa");
      }

      if (register.category_id) {
        const { data: categories } = await api.get(`categorias`, { headers });
        const category = categories.find(
          (item: Category) => item.id === register.category_id
        );
        setFormRegister((prevForm) => ({
          ...prevForm,
          category_name: category.title,
        }));
      }

      const formattedValue = convertToBrl(register.value);

      const formattedDateString = register.date.substring(0, 10);

      const updatedForm = {
        description: register.description,
        value: formattedValue,
        category_id: register.category_id,
        date: formattedDateString,
        type: register.type,
        user_id: register.user_id,
        id: register.id,
      };

      setFormRegister((prevForm) => ({ ...prevForm, ...updatedForm }));
    } catch (error) {
      console.error(error);
    }
  };

  const setClass = (type: string) => {
    return type === "entry"
      ? "input-class"
      : type === "output"
      ? "output-class"
      : "";
  };

  const setTypeTitle = (type: string) => {
    if (type === "entry") {
      return "Receita";
    }

    if (type === "output") {
      return "Despesa";
    }
  };

  return (
    <>
      <li className="register-component__container">
        <span className="register-component__item register-component__item--date">
          {new Date(transaction.date).toLocaleDateString()}
        </span>
        <span className="register-component__item register-component__item--day">
          {weekDays[new Date(transaction.date).getDay()]}
        </span>
        <span className="register-component__item register-component__item--description">
          {transaction.description}
        </span>
        <span className="register-component__item register-component__item--category">
          {transaction.category_name}
        </span>
        <span className="register-component__item register-component__item--category">
          {setTypeTitle(transaction.type)}
        </span>
        <span
          className={`register-component__item register-component__item--cash ${setClass(
            transaction.type
          )}`}
        >
          {convertToCurrency(Number(transaction.value))}
        </span>
        <div className="register-component__item register-component__icons-container">
          <HiOutlinePencilSquare
            className="register-component__icons-item icons__pencil"
            size={22}
            onClick={() => handleOpenEditModal()}
          />
          <HiOutlineTrash
            className="register-component__icons-item icons__trash"
            size={22}
            onClick={() => setShowPopUp(true)}
          />
        </div>
        {/* {showPopUp && <div className="popup-arrow"></div>} */}
        {showPopUp && (
          <DeleteRegister
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
            registerId={Number(transaction.id)}
          />
        )}
      </li>
    </>
  );
};

export default Register;
