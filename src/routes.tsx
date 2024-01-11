import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import { useEffect } from "react";
import { getItem, removeItem } from "./utils/storage";
import { isTokenExpired } from "./utils/auth";

const MainRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        removeItem("token");
      } else {
        navigate("/home");
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastrar" element={<Register />} />
      <Route path="/home" element={<Main />} />
    </Routes>
  );
};

export default MainRoutes;
