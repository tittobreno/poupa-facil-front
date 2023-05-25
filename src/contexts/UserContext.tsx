import { ChangeEvent, createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

type UserContextType = {
  form: User;
  setForm: (newState: User) => void;
  handleChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
};

const userInitialValue = {
  form: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  setForm: () => {},
  handleChangeForm: () => {},
};
const UserContext = createContext<UserContextType>(userInitialValue);

export const UserProvider = ({ children }: any) => {
  const [form, setForm] = useState<User>(userInitialValue.form);

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm((prevForm: User) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <UserContext.Provider value={{ form, setForm, handleChangeForm }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
