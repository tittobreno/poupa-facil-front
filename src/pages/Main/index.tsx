import "./styles.css";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Summary from "../../components/Summary";
import Dashboard from "../../components/Dashboard";
import RegisterModal from "../../components/RegisterModal";
import { useGlobal } from "../../contexts/GlobalContext";
import EditUserModal from "../../components/EditUserModal";
import Notification from "../../components/Popups/Notification";
const Main = () => {
  const { isOpenRegisterModal, isOpenNotification, isOpenUserModal } =
    useGlobal();

  return (
    <div className="main__container">
      <Header />
      <main className="main">
        <section className="main__filter">
          <Filter />
          <Summary />
        </section>
        <Dashboard />
        {isOpenRegisterModal && <RegisterModal />}
        {isOpenUserModal && <EditUserModal />}
      </main>
      {isOpenNotification && <Notification />}
    </div>
  );
};
export default Main;
