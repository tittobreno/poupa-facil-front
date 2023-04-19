import Logo from "../../assets/logo-pf.png";
import "./styles.css";
import { HiUserCircle, HiOutlineLogout } from "react-icons/hi";
const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="" />
      <nav className="header__nav">
        <div className="header__profile">
          <button
            className="header__nav-icon profile"
            aria-label="Perfil de usuário"
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
