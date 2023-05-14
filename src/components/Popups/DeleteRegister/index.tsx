import { useGlobal } from "../../../context/GlobalContext";
import "./styles.css";

const DeleteRegister = () => {
  const { setOpenPopUpDeleteRegister, setTitlePopup, setOpenPopUpNewRegister } =
    useGlobal();

  const handleDeleteRegister = () => {
    setTitlePopup("Registro deletado com sucesso!");
    setOpenPopUpDeleteRegister(false);
    setOpenPopUpNewRegister(true);
  };

  return (
    <div className="delete-register__container">
      <span className="delete-register__title">Apagar item?</span>
      <section className="delete-register__buttons">
        <button
          className="delete-register__buttons-btn delete-register__buttons-yes"
          onClick={() => handleDeleteRegister()}
        >
          Sim
        </button>
        <button
          className="delete-register__buttons-btn delete-register__buttons-not"
          onClick={() => setOpenPopUpDeleteRegister(false)}
        >
          Não
        </button>
      </section>
    </div>
  );
};

export default DeleteRegister;
