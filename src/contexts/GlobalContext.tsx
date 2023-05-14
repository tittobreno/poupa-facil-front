import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

type GlobalContextType = {
  showRegisterModal: boolean;
  setShowRegisterModal: (newState: boolean) => void;
  showEditUserModal: boolean;
  setShowEditUserModal: (newState: boolean) => void;
  typeModal: string;
  setTypeModal: (newstate: string) => void;
  openPopUpDeleteRegister: boolean;
  setOpenPopUpDeleteRegister: (newstate: boolean) => void;
  openPopUpNewRegister: boolean;
  setOpenPopUpNewRegister: (newstate: boolean) => void;
  titlePopup: string;
  setTitlePopup: (newState: string) => void;
};

const initialGlobalValue = {
  showRegisterModal: false,
  setShowRegisterModal: () => {},
  showEditUserModal: false,
  setShowEditUserModal: () => {},
  typeModal: "Editar",
  setTypeModal: () => {},
  openPopUpDeleteRegister: false,
  setOpenPopUpDeleteRegister: () => {},
  openPopUpNewRegister: false,
  setOpenPopUpNewRegister: () => {},
  titlePopup: "null",
  setTitlePopup: () => {},
};
const GlobalContext = createContext<GlobalContextType>(initialGlobalValue);

export const GlobalProvider = ({ children }: any) => {
  const [showRegisterModal, setShowRegisterModal] = useState(
    initialGlobalValue.showRegisterModal
  );
  const [showEditUserModal, setShowEditUserModal] = useState(
    initialGlobalValue.showEditUserModal
  );
  const [typeModal, setTypeModal] = useState(initialGlobalValue.typeModal);
  const [openPopUpDeleteRegister, setOpenPopUpDeleteRegister] = useState(
    initialGlobalValue.openPopUpDeleteRegister
  );
  const [openPopUpNewRegister, setOpenPopUpNewRegister] = useState(
    initialGlobalValue.openPopUpNewRegister
  );
  const [titlePopup, setTitlePopup] = useState(initialGlobalValue.titlePopup);

  return (
    <GlobalContext.Provider
      value={{
        showRegisterModal,
        setShowRegisterModal,
        showEditUserModal,
        setShowEditUserModal,
        typeModal,
        setTypeModal,
        openPopUpDeleteRegister,
        setOpenPopUpDeleteRegister,
        openPopUpNewRegister,
        setOpenPopUpNewRegister,
        titlePopup,
        setTitlePopup,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
