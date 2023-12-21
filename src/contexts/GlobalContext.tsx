import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

type GlobalContextType = {
  isOpenRegisterModal: boolean;
  setIsOpenRegisterModal: (newState: boolean) => void;
  isOpenUserModal: boolean;
  setIsOpenUserModal: (newState: boolean) => void;
  typeRegisterModal: string;
  setTypeRegisterModal: (newstate: string) => void;
  isOpenDeleteRegister: boolean;
  setIsOpenDeleteRegister: (newstate: boolean) => void;
  showToast: boolean;
  setShowToast: (newstate: boolean) => void;
  messageToast: string;
  setMessageToast: (newState: string) => void;
  handleShowToast: (message: string) => void;
  handleCloseToast: () => void;
  handleSubmitRegister: () => void;
};

const initialGlobalValue = {
  isOpenRegisterModal: false,
  setIsOpenRegisterModal: () => {},
  isOpenUserModal: false,
  setIsOpenUserModal: () => {},
  typeRegisterModal: "Editar",
  setTypeRegisterModal: () => {},
  isOpenDeleteRegister: false,
  setIsOpenDeleteRegister: () => {},
  showToast: false,
  setShowToast: () => {},
  messageToast: "",
  setMessageToast: () => {},
  handleShowToast: () => {},
  handleCloseToast: () => {},
  handleSubmitRegister: () => {},
};
const GlobalContext = createContext<GlobalContextType>(initialGlobalValue);

export const GlobalProvider = ({ children }: any) => {
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(
    initialGlobalValue.isOpenRegisterModal
  );
  const [isOpenUserModal, setIsOpenUserModal] = useState(
    initialGlobalValue.isOpenUserModal
  );
  const [typeRegisterModal, setTypeRegisterModal] = useState(
    initialGlobalValue.typeRegisterModal
  );
  const [isOpenDeleteRegister, setIsOpenDeleteRegister] = useState(
    initialGlobalValue.isOpenDeleteRegister
  );
  const [showToast, setShowToast] = useState(initialGlobalValue.showToast);
  const [messageToast, setMessageToast] = useState(
    initialGlobalValue.messageToast
  );

  const handleShowToast = (message: string) => {
    setMessageToast(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleSubmitRegister = () => {
    setIsOpenRegisterModal(false);

    if (typeRegisterModal === "Editar") {
      handleShowToast("Registro editado com sucesso!");
    } else {
      handleShowToast("Registro adicionado com sucesso!");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isOpenRegisterModal,
        setIsOpenRegisterModal,
        isOpenUserModal,
        setIsOpenUserModal,
        typeRegisterModal,
        setTypeRegisterModal,
        isOpenDeleteRegister,
        setIsOpenDeleteRegister,
        showToast,
        setShowToast,
        messageToast,
        setMessageToast,
        handleShowToast,
        handleCloseToast,
        handleSubmitRegister,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
