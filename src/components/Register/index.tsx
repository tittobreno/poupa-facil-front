import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import "./styles.css";
import { useGlobal } from "../../context/GlobalContext";
import DeleteRegister from "../Popups/DeleteRegister";
const Register = () => {
  const { setShowRegisterModal, setTypeModal, openPopUp, setOpenPopUp } =
    useGlobal();

  const handleOpenEditModal = () => {
    setTypeModal(false);
    setShowRegisterModal(true);
  };

  return (
    <li className="register-component__container">
      <span className="register-component__item register-component__item--date">
        10-10-2023
      </span>
      <span className="register-component__item register-component__item--day">
        Quarta-feira
      </span>
      <span className="register-component__item register-component__item--description">
        Mercado
      </span>
      <span className="register-component__item register-component__item--category">
        Compras
      </span>
      <span className="register-component__item register-component__item--cash">
        R$100,00
      </span>
      <div className="register-component__item register-component__icons-container">
        <HiOutlinePencilSquare
          className="register-component__icons-item"
          size={22}
          onClick={() => handleOpenEditModal()}
        />
        <HiOutlineTrash
          className="register-component__icons-item"
          size={22}
          onClick={() => setOpenPopUp(true)}
        />
      </div>
      {openPopUp && <DeleteRegister />}
    </li>
  );
};

export default Register;
