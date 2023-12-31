import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../../../contexts/GlobalContext";
import "./styles.css";

type DeleteRegisterProps = {
  registerId: number;
  setShowPopUp: (newValue: boolean) => void;
  showPopUp: boolean;
};

const DeleteRegister = ({
  registerId,
  setShowPopUp,
  showPopUp,
}: DeleteRegisterProps) => {
  const refDeleteRegister = useRef<HTMLDivElement>(null);
  const { setIsOpenDeleteRegister, handleShowToast } = useGlobal();
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const handleDeleteRegister = () => {
    handleShowToast("Registro deletado com sucesso!");
    setShowPopUp(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isPopupOpened &&
      refDeleteRegister.current &&
      !refDeleteRegister.current.contains(event.target as Node)
    ) {
      setShowPopUp(false);
      setIsPopupOpened(false);
    }
  };

  useEffect(() => {
    if (!isPopupOpened) {
      setIsPopupOpened(true);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupOpened]);

  return (
    <div ref={refDeleteRegister} className="delete-register__container">
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
          onClick={() => setShowPopUp(false)}
        >
          Não
        </button>
      </section>
    </div>
  );
};

export default DeleteRegister;
