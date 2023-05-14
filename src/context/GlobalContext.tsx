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
  typeModal: string;
  setTypeModal: Dispatch<SetStateAction<string>>;
  openPopUpDeleteRegister: boolean;
  setOpenPopUpDeleteRegister: Dispatch<SetStateAction<boolean>>;
  openPopUpNewRegister: boolean;
  setOpenPopUpNewRegister: Dispatch<SetStateAction<boolean>>;
  titlePopup: string;
  setTitlePopup: Dispatch<SetStateAction<string>>;
}
const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [openPopUpDeleteRegister, setOpenPopUpDeleteRegister] = useState(false);
  const [openPopUpNewRegister, setOpenPopUpNewRegister] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
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
