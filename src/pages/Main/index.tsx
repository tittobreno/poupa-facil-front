import "./styles.css";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
const Main = () => {
  return (
    <div className="container__main">
      <Header />
      <main className="main">
        <section className="main__filter">
          <Filter />
        </section>
      </main>
    </div>
  );
};
export default Main;
