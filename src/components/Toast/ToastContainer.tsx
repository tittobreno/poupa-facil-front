import { AnimatePresence } from "framer-motion";
import Toast, { ToastProps } from "./Toast";
import "./styles.css";

interface ToastContainerProps {
  toasts: ToastProps[];
}

const ToastsContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="toasts-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastsContainer;
