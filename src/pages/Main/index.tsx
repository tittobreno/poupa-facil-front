import "./styles.css";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Summary from "../../components/Summary";
import Dashboard from "../../components/Dashboard";
import RegisterModal from "../../components/RegisterModal";
import { useGlobal } from "../../contexts/GlobalContext";
import EditUserModal from "../../components/EditUserModal";
import { useEffect } from "react";
import { getItem, removeItem } from "../../utils/storage";
import { isTokenExpired } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Popups/Toast";
import { HiOutlinePlus, HiOutlinePlusSmall } from "react-icons/hi2";
import { HiMinus } from "react-icons/hi";
const Main = () => {
  const { isOpenRegisterModal, showToast, isOpenUserModal } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        removeItem("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="main__container">
      <Header />
      <main className="main">
        <section className="main__filter">
          <div className="wrapper-summary">
            <Summary />
          </div>
        </section>
        <Dashboard />
        {isOpenRegisterModal && <RegisterModal />}
        {isOpenUserModal && <EditUserModal />}
      </main>
      {showToast && <Toast />}
    </div>
  );
};

export default Main;
