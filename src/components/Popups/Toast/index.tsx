import { useEffect } from "react";
import "./styles.css";
import { HiOutlineX } from "react-icons/hi";
import { useGlobal } from "../../../contexts/GlobalContext";

const Toast = () => {
  const { handleCloseToast, messageToast } = useGlobal();

  useEffect(() => {
    const progress = document.querySelector(
      ".toast__progress-bar"
    ) as HTMLElement;

    let width = 100;
    const intervalId = setInterval(() => {
      width--;
      progress.style.width = `${width}%`;
      if (width === 0) {
        clearInterval(intervalId);
      }
    }, 28);

    const timeoutId = setTimeout(() => {
      handleCloseToast();
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="toast__container">
      <button onClick={() => handleCloseToast()} className="toast__close">
        <HiOutlineX size={20} />
      </button>
      <h4 className="toast__title">{messageToast}</h4>
      <div className="toast__progress-bar"></div>
    </div>
  );
};

export default Toast;
