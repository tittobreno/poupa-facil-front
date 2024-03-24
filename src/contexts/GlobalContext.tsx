import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import api from "../lib/api";
import { Category, Transaction } from "../types";
import { getItem } from "../utils/storage";

interface TransactionsType {
  total: number;
  listUserTransactions: Transaction[];
}

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
  transactions: TransactionsType;
  setTransactions: Dispatch<SetStateAction<TransactionsType>>;
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
  transactions: { total: 0, listUserTransactions: [] },
  setTransactions: () => {},
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
  const [transactions, setTransactions] = useState<TransactionsType>(
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
