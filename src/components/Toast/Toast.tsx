import { ReactNode, useEffect, useRef } from "react";
import { HiX } from "react-icons/hi";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
  IoIosWarning,
} from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../../hooks/useToast";
import "./styles.css";

export interface ToastProps {
  message: string;
  type: string;
  id: number;
}

interface ToastType {
  icon: ReactNode;
  iconClass: string;
}

interface ToastTypes {
  [key: string]: ToastType;
  success: ToastType;
  warning: ToastType;
  info: ToastType;
  error: ToastType;
}

const toastTypes: ToastTypes = {
  success: {
    icon: <IoIosCheckmarkCircleOutline size={20} />,
    iconClass: "success-icon",
  },
  warning: {
    icon: <IoIosWarning size={20} />,
    iconClass: "warning-icon",
  },
  info: {
    icon: <IoIosInformationCircleOutline size={20} />,
    iconClass: "info-icon",
  },
  error: {
    icon: <IoIosCloseCircleOutline size={20} />,
    iconClass: "error-icon",
  },
};

const Toast = ({ message, type, id }: ToastProps) => {
  const { icon, iconClass } = toastTypes[type];
  const toast = useToast();

  const timerID = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = () => {
    toast.remove(id);
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => {
      if (timerID.current) {
        clearTimeout(timerID.current);
      }
    };
  }, []);

  const variants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring", bounce: 0.5 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="toast"
    >
      <div className={iconClass}>{icon}</div>
      <p className="toast-message">{message}</p>
      <button className="dismiss-btn" onClick={handleDismiss}>
        <HiX size={15} color="#aeb0d7" />
      </button>
    </motion.div>
  );
};

export default Toast;
