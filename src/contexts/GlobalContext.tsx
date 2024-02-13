import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { getItem } from "../utils/storage";
import api from "../services/api";
import { Category, Transaction } from "../types";

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
  formRegister: Transaction;
  setFormRegister: Dispatch<SetStateAction<Transaction>>;
  handleClear: () => void;
  getCategories: () => void;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  typeTransaction: string;
  setTypeTransaction: Dispatch<SetStateAction<string>>;
  imageUser: string;
  setImageUser: Dispatch<SetStateAction<string>>;
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
  formRegister: {
    description: "",
    value: "",
    date: "",
    id: undefined,
    type: "",
    user_id: undefined,
    category_name: "",
    category_id: undefined,
  },
  setFormRegister: () => {},
  handleClear: () => {},
  getCategories: () => {},
  setCategories: () => {},
  categories: [],
  typeTransaction: "",
  setTypeTransaction: () => {},
  imageUser: "",
  setImageUser: () => {},
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

  const [formRegister, setFormRegister] = useState<Transaction>(
    initialGlobalValue.formRegister
  );

  const [categories, setCategories] = useState<Category[]>(
    initialGlobalValue.categories
  );

  const [typeTransaction, setTypeTransaction] = useState(
    initialGlobalValue.typeTransaction
  );

  const [imageUser, setImageUser] = useState(initialGlobalValue.imageUser);

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
  const handleClear = () => {
    setFormRegister({
      description: "",
      value: "",
      date: "",
      id: undefined,
      type: "",
      user_id: undefined,
      category_name: "",
      category_id: undefined,
    });
  };

  const getCategories = async () => {
    const response = await api.get("/categorias", {
      headers: {
        Authorization: `Bearer ${getItem("token")}`,
      },
    });

    setCategories(response.data);
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
        formRegister,
        setFormRegister,
        handleClear,
        getCategories,
        categories,
        setCategories,
        typeTransaction,
        setTypeTransaction,
        imageUser,
        setImageUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
