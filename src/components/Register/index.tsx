import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import "./styles.css";
import { useGlobal } from "../../contexts/GlobalContext";
import DeleteRegister from "../Popups/DeleteRegister";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Category, Transaction } from "../../types";
import { convertToCurrency } from "../../utils/utilities";
import { getItem } from "../../utils/storage";

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

      const updatedForm = {
        description: register.description,
        value: register.value,
        category_id: register.category_id,
        date: register.date,
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
          {transaction.type}
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
