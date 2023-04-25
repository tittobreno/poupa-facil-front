import "./styles.css";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import Summary from "../../components/Summary";
import Dashboard from "../../components/Dashboard";
const Main = () => {
  return (
    <div className="main__container">
      <Header />
      <main className="main">
        <section className="main__filter">
          <Filter />
          <Summary />
        </section>
        <Dashboard />
      </main>
    </div>
  );
};
export default Main;
