import { useEffect } from "react";
import "./styles.css";
import { HiOutlineX } from "react-icons/hi";
import { useGlobal } from "../../../contexts/GlobalContext";

interface NewRegisterPopUpProps {
  title: string;
}
const NewRegisterPopUp = ({ title }: NewRegisterPopUpProps) => {
  const { setOpenPopUpNewRegister, typeModal, titlePopup } = useGlobal();

  useEffect(() => {
    showPopup();
  }, []);

  const showPopup = (): void => {
    const progress = document.querySelector(
      ".new-register__progress-bar"
    ) as HTMLElement;

    let width = 100;
    const intervalId = setInterval(() => {
      width--;
      progress.style.width = `${width}%`;
      if (width === 0) {
        clearInterval(intervalId);
      }
    }, 28);

    setTimeout(() => {
      setOpenPopUpNewRegister(false);
    }, 3000);
  };

  return (
    <div className="new-register__popup">
      <button
        onClick={() => setOpenPopUpNewRegister(false)}
        className="new-register__popup--close"
      >
        <HiOutlineX size={20} />
      </button>
      <h4 className="new-register__popup-title">{titlePopup}</h4>
      <div className="new-register__progress-bar"></div>
    </div>
  );
};

export default NewRegisterPopUp;
