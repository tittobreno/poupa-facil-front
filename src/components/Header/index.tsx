import { useEffect, useState } from "react";
import Logo from "../../assets/logo-pf.png";
import { useGlobal } from "../../contexts/GlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./styles.css";
import { HiUserCircle, HiOutlineLogout } from "react-icons/hi";
import { useUser } from "../../contexts/UserContext";
const Header = () => {
  const { setIsOpenUserModal } = useGlobal();
  const { dataUser, setDataUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/detalhar", {
          headers: { Authorization: `Bearer ${getItem("token")}` },
        });
        setDataUser({ name: data.name, email: data.email });
        console.log(dataUser);
        console.log(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="" />
      <nav className="header__nav">
        <div className="header__profile">
          <button
            className="header__nav-icon profile"
            aria-label="Perfil de usuário"
            onClick={() => setIsOpenUserModal(true)}
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
