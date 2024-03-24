import { ChangeEvent, createContext, useContext, useState } from "react";
import api from "../lib/api";
import { getItem } from "../utils/storage";
import { useGlobal } from "./GlobalContext";
import { User } from "../types";

interface DataUser {
  name: string;
  email: string;
}

type UserContextType = {
  form: User;
  setForm: (newState: User) => void;
  handleChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  dataUser: DataUser;
  setDataUser: (newState: DataUser) => void;
  handleChangeFormEditUser: (event: ChangeEvent<HTMLInputElement>) => void;
};

const userInitialValue = {
  form: {
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
    avatar: "",
  },
  setForm: () => {},
  handleChangeForm: () => {},
  dataUser: {
    name: "",
    email: "",
  },
  setDataUser: () => {},
  handleChangeFormEditUser: () => {},
};

const UserContext = createContext<UserContextType>(userInitialValue);

export const UserProvider = ({ children }: any) => {
  const [form, setForm] = useState<User>(userInitialValue.form);
  const [dataUser, setDataUser] = useState<DataUser>(userInitialValue.dataUser);

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm((prevForm: User) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangeFormEditUser = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setDataUser((prevForm: DataUser) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        form,
        setForm,
        handleChangeForm,
        dataUser,
        setDataUser,
        handleChangeFormEditUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
