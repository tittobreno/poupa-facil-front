import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/logo-w.png";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import api from "../../lib/axios";
import { AxiosError } from "axios";
import { getItem, removeItem, setItem } from "../../utils/storage";
import { isTokenExpired } from "../../utils/auth";
import { motion } from "framer-motion";
const Login = () => {
  const { form, handleChangeForm } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.email || !form.currentPassword) {
      return alert("Todos os campos são obrigatórios");
    }

    try {
      const { data } = await api.post("/entrar", { ...form });
      setItem("token", data.token);
      navigate("/home");
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        return;
      }
      console.log(error);
    }
  };

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
    <div className="container__login">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="login__logo-img"
        src={Logo}
        alt="Logo da página!"
      />

      <main className="login__main">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="login__left-page"
        >
          <h1>Gerenciar seu dinheiro nunca foi tão fácil.</h1>
          <h2>
            Simplifique sua vida financeira e economize dinheiro de forma
            inteligente. Experimente agora mesmo o Poupa Fácil!
          </h2>
        </motion.div>

        <section className="login__right-page">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="login__card"
          >
            <h1 className="login__card-title">Acesse sua conta</h1>

            <form onSubmit={handleLogin} className="login__form">
              <div className="login__section-input">
                <label className="login__label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="login__input"
                  id="email"
                  name="email"
                  value={form.email}
                  type="text"
                  placeholder="Digite seu e-email"
                  onChange={(event) => handleChangeForm(event)}
                />
              </div>

              <div className="login__section-input">
                <div className="login__setion-input--align-forgot">
                  <label htmlFor="password" className="login__label">
                    Senha
                  </label>
                  <a href="#" className="login__section-input--forgot-password">
                    Esqueceu sua senha?
                  </a>
                </div>
                <div
                  className={`login__input box-input-password ${
                    isFocused ? "input-focused" : ""
                  }`}
                >
                  <input
                    className="input-password"
                    id="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(event) => handleChangeForm(event)}
                  />
                  <button
                    className="login__input-eye"
                    type="button"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <FaEye title="Ocultar senha" />
                    ) : (
                      <FaEyeSlash title="Mostrar senha" />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="login__btn--submit">
                Entrar
              </button>
            </form>
            <div className="register__redirect-login">
              <span>Ainda não tem conta? </span>
              <Link className="redirect__link" to="/cadastrar">
                Fazer cadastro!
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Login;
