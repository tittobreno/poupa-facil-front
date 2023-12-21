import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import "./styles.css";
import { useGlobal } from "../../contexts/GlobalContext";
import DeleteRegister from "../Popups/DeleteRegister";
import { useEffect } from "react";
import api from "../../services/api";

type PropsRegister = {
  transactions: {
    description: string;
    value: number;
    date: string;
    id: number;
    type: string;
    user_id: number;
    category_name: string;
    category_id: number;
  }[];
};
const Register = ({ transactions }: PropsRegister) => {
  const {
    setIsOpenRegisterModal,
    setTypeRegisterModal,
    isOpenDeleteRegister,
    setIsOpenDeleteRegister,
    handleShowToast,
  } = useGlobal();

  const handleOpenEditModal = () => {
    setTypeRegisterModal("Editar");
    setIsOpenRegisterModal(true);
  };

  return (
    <>
      {transactions.map((transaction, index) => (
        <li key={index} className="register-component__container">
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
            {transaction.value}
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
              onClick={() => setIsOpenDeleteRegister(true)}
            />
            {isOpenDeleteRegister && <div className="popup-arrow"></div>}
          </div>
          {isOpenDeleteRegister && <DeleteRegister />}
        </li>
      ))}
    </>
  );
};

export default Register;
