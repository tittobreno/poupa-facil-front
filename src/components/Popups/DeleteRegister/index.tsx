import { useEffect, useRef, useState } from "react";
import { IoCaretUp } from "react-icons/io5";
import { useTransaction } from "../../../services/query";
import "./styles.css";
type DeleteRegisterProps = {
  registerId: number;
  setShowPopUp: (newValue: boolean) => void;
  showPopUp: boolean;
};

const DeleteRegister = ({ registerId, setShowPopUp }: DeleteRegisterProps) => {
  const refDeleteRegister = useRef<HTMLDivElement>(null);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const { mutate } = useTransaction.delete({
    url: "transacao/deletar/",
    queryKey: ["transacao/listar"],
  });

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
    mutate(id);
    setShowPopUp(false);
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
