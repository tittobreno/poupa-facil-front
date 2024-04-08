import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../../../contexts/GlobalContext";
import "./styles.css";
import api from "../../../lib/api";
import { getItem } from "../../../utils/storage";
import { IoCaretUp } from "react-icons/io5";
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
  const { handleShowToast } = useGlobal();
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="delete-register-indicate">
      <div ref={refDeleteRegister} className="delete-register__container">
        <span className="delete-register__title">Apagar item?</span>

        <section className="delete-register__buttons">
          <button
            className="delete-register__buttons-btn delete-register__buttons-not"
            onClick={() => setShowPopUp(false)}
          >
            Não
          </button>

          <button
            className="delete-register__buttons-btn delete-register__buttons-yes"
            onClick={() => handleDelete(registerId)}
          >
            Sim
          </button>
        </section>
        <IoCaretUp size={18} className="caret-down-indicate" />
      </div>
    </div>
  );
};

export default DeleteRegister;
