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
}
const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  return (
    <GlobalContext.Provider value={{ showRegisterModal, setShowRegisterModal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
