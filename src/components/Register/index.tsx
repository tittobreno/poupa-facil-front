import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import "./styles.css";
import { useGlobal } from "../../contexts/GlobalContext";
import DeleteRegister from "../Popups/DeleteRegister";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Transaction } from "../../types";
import { convertToCurrency } from "../../utils/utilities";

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

  const handleOpenEditModal = () => {
    handleClear();

    setFormRegister({
      description: transaction.description,
      value: convertToCurrency(transaction.value),
      category_id: transaction.category_id,
      category_name: transaction.category_name,
      date: transaction.date,
      type: transaction.type,
      user_id: transaction.user_id,
      id: transaction.id,
    });

    setTypeRegisterModal("Editar");
    setIsOpenRegisterModal(true);
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
