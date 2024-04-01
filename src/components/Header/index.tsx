import { useEffect, useState } from "react";
import Logo from "../../assets/logo-x.png";
import { useGlobal } from "../../contexts/GlobalContext";
import api from "../../lib/api";
import { clearLocalStorage, getItem, setItem } from "../../utils/storage";
import "./styles.css";
import { HiUserCircle, HiOutlineLogout } from "react-icons/hi";
import { useUser } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const { setIsOpenUserModal, imageUser, setImageUser } = useGlobal();
  const { setForm } = useUser();
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/usuario/detalhar", {
          headers: { Authorization: `Bearer ${getItem("token")}` },
        });

        const binaryData = atob(data.avatar);

        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const view = new Uint8Array(arrayBuffer);

        for (var i = 0; i < binaryData.length; i++) {
          view[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: "image/png" });

        const imageUrl = URL.createObjectURL(blob);

        setUserName(data.name);
        setImageUser(imageUrl);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleLogOut = () => {
    clearLocalStorage();
    setForm({ email: "", currentPassword: "" });
    Navigate("/");
  };

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="" />
      <nav className="header__nav">
        <div className="header__profile">
          <span className="header__nav-username">{userName}</span>

          <img
            className=" profile "
            aria-label="Perfil de usuário"
            onClick={() => setIsOpenUserModal(true)}
            src={imageUser ?? <HiUserCircle size={44} />}
          />
        </div>

        <button
          onClick={() => handleLogOut()}
          className="header__nav-icon"
          aria-label="Sair da aplicação"
        >
          <HiOutlineLogout size={30} className="logout-icon" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
