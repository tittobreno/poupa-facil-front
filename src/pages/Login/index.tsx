import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/logo-pf.png";
import "./styles.css";
import { Link } from "react-router-dom";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className="container__login">
      <img className="login__logo" src={Logo} alt="Logo da página!" />

      <main className="login__main">
        <div className="login__left-page">
          <h1>Gerenciar seu dinheiro nunca foi tão fácil.</h1>
          <h2>
            Simplifique sua vida financeira e economize dinheiro de forma
            inteligente. Experimente agora mesmo o Poupa Fácil!
          </h2>
          <Link to="/cadastrar" className="login__btn--register">
            Cadastre-se
          </Link>
        </div>

        <section className="login__right-page">
          <div className="login__card">
            <h1 className="login__card-title">Seja bem vindo(a)!</h1>

            <form className="login__form">
              <div className="login__section-input">
                <label className="login__label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="login__input"
                  id="email"
                  type="text"
                  placeholder="Digite seu e-email"
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <button
                    className="login__input-eye"
                    type="button"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <FaEye title="Mostrar senha" />
                    ) : (
                      <FaEyeSlash title="Ocultar senha" />
                    )}
                  </button>
                </div>
              </div>

              <button className="login__btn--submit">Entrar</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
