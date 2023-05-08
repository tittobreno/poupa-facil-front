import { useGlobal } from "../../../context/GlobalContext";
import "./styles.css";

const DeleteRegister = () => {
  const { openPopUp, setOpenPopUp } = useGlobal();

  return (
    <div className="delete-register__container">
      <span className="delete-register__title">Apagar item?</span>
      <section className="delete-register__buttons">
        <button className="delete-register__buttons-btn delete-register__buttons-yes">
          Sim
        </button>
        <button
          className="delete-register__buttons-btn delete-register__buttons-not"
          onClick={() => setOpenPopUp(false)}
        >
          Não
        </button>
      </section>
    </div>
  );
};

export default DeleteRegister;
