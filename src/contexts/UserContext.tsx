import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

type UserContextType = {
  form: User;
  setForm: (newState: User) => void;
};

const initialValueUser = {
  form: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  setForm: () => {},
};
const UserContext = createContext<UserContextType>(initialValueUser);

export const GlobalProvider = ({ children }: any) => {
  const [form, setForm] = useState(initialValueUser.form);

  return (
    <UserContext.Provider value={{ form, setForm }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
