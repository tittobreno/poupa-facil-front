import { useGlobal } from "../../../contexts/GlobalContext";
import "./styles.css";

const DeleteRegister = () => {
  const {
    setIsOpenDeleteRegister,
    setMessageNotification,
    setIsOpenNotification,
  } = useGlobal();

  const handleDeleteRegister = () => {
    setMessageNotification("Registro deletado com sucesso!");
    setIsOpenDeleteRegister(false);
    setIsOpenNotification(true);
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
          onClick={() => setIsOpenDeleteRegister(false)}
        >
          Não
        </button>
      </section>
    </div>
  );
};

export default DeleteRegister;
