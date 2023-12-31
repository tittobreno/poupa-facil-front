import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../../../contexts/GlobalContext";
import "./styles.css";
import api from "../../../services/api";
import { getItem } from "../../../utils/storage";

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
  const { handleShowToast, handleGetRegisters } = useGlobal();
  const [isPopupOpened, setIsPopupOpened] = useState(false);

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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/transacao/deletar/${id}`, {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });

      handleShowToast("Registro deletado com sucesso!");
      setShowPopUp(false);
      handleGetRegisters();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={refDeleteRegister} className="delete-register__container">
      <span className="delete-register__title">Apagar item?</span>
      <section className="delete-register__buttons">
        <button
          className="delete-register__buttons-btn delete-register__buttons-yes"
          onClick={() => handleDelete(registerId)}
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
