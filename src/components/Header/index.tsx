import Logo from "../../assets/logo-pf.png";
import { useGlobal } from "../../contexts/GlobalContext";
import "./styles.css";
import { HiUserCircle, HiOutlineLogout } from "react-icons/hi";
const Header = () => {
  const { setShowEditUserModal } = useGlobal();

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="" />
      <nav className="header__nav">
        <div className="header__profile">
          <button
            className="header__nav-icon profile"
            aria-label="Perfil de usuário"
            onClick={() => setShowEditUserModal(true)}
          >
            <HiUserCircle size={44} />
          </button>
          <span className="header__nav-username">Breno</span>
        </div>

        <button className="header__nav-icon" aria-label="Sair da aplicação">
          <HiOutlineLogout size={38} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
