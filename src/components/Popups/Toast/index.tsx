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
    if (!progress) return;

    let start: number | null = null;
    const duration = 3000;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const width = Math.max(0, 100 - (elapsed / duration) * 100);
      progress.style.width = `${width}%`;

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        handleCloseToast();
      }
    };

    requestAnimationFrame(step);

    return () => {
      progress.style.width = "100%";
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
