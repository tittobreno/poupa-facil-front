import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { getItem } from "../utils/storage";
import api from "../services/api";

type Transaction = {
  description: string;
  value: number;
  date: string;
  id: number;
  type: string;
  user_id: number;
  category_name: string;
  category_id: number;
};

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
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
  handleGetRegisters: () => void;
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
  transactions: [],
  setTransactions: () => {},
  handleGetRegisters: () => {},
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
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialGlobalValue.transactions
  );

  const handleShowToast = (message: string) => {
    setMessageToast(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleGetRegisters = async () => {
    const { data } = await api.get("/transacao/listar", {
      headers: {
        Authorization: `Bearer ${getItem("token")}`,
      },
    });
    setTransactions(data);
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
        transactions,
        setTransactions,
        handleGetRegisters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
