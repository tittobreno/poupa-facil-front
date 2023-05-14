import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import "./styles.css";
import { useGlobal } from "../../contexts/GlobalContext";
import DeleteRegister from "../Popups/DeleteRegister";
const Register = () => {
  const {
    setShowRegisterModal,
    setTypeModal,
    openPopUpDeleteRegister,
    setOpenPopUpDeleteRegister,
    setTitlePopup,
  } = useGlobal();

  const handleOpenEditModal = () => {
    setTitlePopup("Registro editado com sucesso!");
    setTypeModal("Editar");
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
          className="register-component__icons-item icons__pencil"
          size={22}
          onClick={() => handleOpenEditModal()}
        />
        <HiOutlineTrash
          className="register-component__icons-item icons__trash"
          size={22}
          onClick={() => setOpenPopUpDeleteRegister(true)}
        />
        {openPopUpDeleteRegister && <div className="popup-arrow"></div>}
      </div>
      {openPopUpDeleteRegister && <DeleteRegister />}
    </li>
  );
};

export default Register;
