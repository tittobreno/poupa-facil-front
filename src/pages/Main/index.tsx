import "./styles.css";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Summary from "../../components/Summary";
import Dashboard from "../../components/Dashboard";
import { useState } from "react";
import RegisterModal from "../../components/RegisterModal";
import { useGlobal } from "../../context/GlobalContext";
import NewRegisterPopUp from "../../components/Popups/NewRegister";
const Main = () => {
  const { showRegisterModal, openPopUpNewRegister } = useGlobal();

  return (
    <div className="main__container">
      <Header />
      <main className="main">
        <section className="main__filter">
          <Filter />
          <Summary />
        </section>
        <Dashboard />
        {showRegisterModal && <RegisterModal />}
      </main>
      {openPopUpNewRegister && <NewRegisterPopUp />}
    </div>
  );
};
export default Main;
