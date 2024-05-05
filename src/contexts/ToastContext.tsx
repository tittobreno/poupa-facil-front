import { ReactNode, createContext, useReducer } from "react";
import { toastReducer } from "../components/Toast/toastReducer";
import ToastsContainer from "../components/Toast/ToastContainer";

interface ToastContextProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext({
  success: (message: string) => {},
  warning: (message: string) => {},
  info: (message: string) => {},
  error: (message: string) => {},
  remove: (id: number) => {},
});
const initialState = {
  toasts: [],
};

export const ToastContextProvider = ({
  children,
}: ToastContextProviderProps) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type: string, message: string) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };
  const remove = (id: number) => {
    dispatch({ type: "DELETE_TOAST", payload: id });
  };
  const success = (message: string) => {
    addToast("success", message);
  };

  const warning = (message: string) => {
    addToast("warning", message);
  };

  const info = (message: string) => {
    addToast("info", message);
  };

  const error = (message: string) => {
    addToast("error", message);
  };

  return (
    <ToastContext.Provider value={{ success, warning, info, error, remove }}>
      <ToastsContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
};
