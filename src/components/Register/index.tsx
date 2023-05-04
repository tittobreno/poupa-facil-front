import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import "./styles.css";
import { useGlobal } from "../../context/GlobalContext";
const Register = () => {
  const { setShowRegisterModal } = useGlobal();

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
          size={22}
          className="register-component__icons-item"
          onClick={() => setShowRegisterModal(true)}
        />
        <HiOutlineTrash size={22} className="register-component__icons-item" />
      </div>
    </li>
  );
};

export default Register;
