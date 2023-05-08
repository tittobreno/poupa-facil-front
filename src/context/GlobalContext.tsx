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
  typeModal: boolean;
  setTypeModal: Dispatch<SetStateAction<boolean>>;
  openPopUp: boolean;
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
}
const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        showRegisterModal,
        setShowRegisterModal,
        typeModal,
        setTypeModal,
        openPopUp,
        setOpenPopUp,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
