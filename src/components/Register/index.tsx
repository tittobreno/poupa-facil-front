import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import "./styles.css";
import { useGlobal } from "../../contexts/GlobalContext";
import DeleteRegister from "../Popups/DeleteRegister";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Transaction } from "../../types";

type PropsRegister = {
  transaction: Transaction;
};
const Register = ({ transaction }: PropsRegister) => {
  const [showPopUp, setShowPopUp] = useState(false);

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
      value: transaction.value,
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
  const convertToCurrency = (cents: number) => {
    const value = cents / 100;
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  return (
    <>
      <li className="register-component__container">
        <span className="register-component__item register-component__item--date">
          {transaction.date}
        </span>
        <span className="register-component__item register-component__item--day">
          {transaction.date}
        </span>
        <span className="register-component__item register-component__item--description">
          {transaction.description}
        </span>
        <span className="register-component__item register-component__item--category">
          {transaction.category_name}
        </span>
        <span className="register-component__item register-component__item--cash">
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
