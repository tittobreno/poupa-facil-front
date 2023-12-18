import { ChangeEvent, createContext, useContext, useState } from "react";
import api from "../services/api";
import { getItem } from "../utils/storage";

interface User {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  passwordConfirmation?: string;
  avatar?: string;
}

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
  handleEditUser: (user: User) => void;
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
  handleEditUser: () => {},
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

  const handleEditUser = async (user: User) => {
    const filteredUser = Object.fromEntries(
      Object.entries(user).filter(([key, value]) => value !== "")
    );

    try {
      await api.patch(
        "/usuario/editar",
        { ...filteredUser },
        {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
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
        handleEditUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
