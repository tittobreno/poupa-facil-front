import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface GlobalContextData {
  showRegisterModal: boolean;
  setShowRegisterModal: Dispatch<SetStateAction<boolean>>;
  showEditUserModal: boolean;
  setShowEditUserModal: Dispatch<SetStateAction<boolean>>;
  typeModal: boolean;
  setTypeModal: Dispatch<SetStateAction<boolean>>;
  openPopUp: boolean;
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
  openPopUpNewRegister: boolean;
  setOpenPopUpNewRegister: Dispatch<SetStateAction<boolean>>;
}
const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPopUpNewRegister, setOpenPopUpNewRegister] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        showRegisterModal,
        setShowRegisterModal,
        showEditUserModal,
        setShowEditUserModal,
        typeModal,
        setTypeModal,
        openPopUp,
        setOpenPopUp,
        openPopUpNewRegister,
        setOpenPopUpNewRegister,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
