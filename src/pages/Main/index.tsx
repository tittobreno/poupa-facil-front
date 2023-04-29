import "./styles.css";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Summary from "../../components/Summary";
import Dashboard from "../../components/Dashboard";
import { useState } from "react";
import RegisterModal from "../../components/RegisterModal";
const Main = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="main__container">
      <Header />
      <main className="main">
        <section className="main__filter">
          <Filter />
          <Summary setShowRegisterModal={setShowRegisterModal} />
        </section>
        <Dashboard />
        {showRegisterModal && (
          <RegisterModal setShowRegisterModal={setShowRegisterModal} />
        )}
      </main>
    </div>
  );
};
export default Main;
