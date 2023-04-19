import "./styles.css";
import Logo from "../../assets/logo-pf.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container__register">
      <img className="login__logo" src={Logo} alt="Logo da página!" />
      <main className="register__main">
        <section className="register__card">
          <h1 className="register__title">Crie sua conta grátis</h1>
          <form className="register__form">
            <div className="form__box-field">
              <label htmlFor="name" className="form__label">
                Nome
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                placeholder="Digite seu nome"
              />
            </div>
            <div className="form__box-field">
              <label htmlFor="email" className="form__label">
                E-mail
              </label>
              <input
                className="form__input"
                id="email"
                type="text"
                placeholder="Digite seu email"
              />
            </div>
            <div className="form__box-field">
              <label htmlFor="password" className="form__label">
                Senha
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
            <div className="form__box-field">
              <label htmlFor="password-confirmation" className="form__label">
                Confirmar senha
              </label>
              <input
                className="form__input"
                id="password-confirmation"
                type="password"
                placeholder="Confirme sua senha"
              />
            </div>

            <button className="form__btn" type="submit">
              Cadastrar
            </button>
          </form>
          <div className="register__redirect-login">
            <span>Já tem cadastro? </span>
            <Link className="redirect__link" to="/">Clique aqui!</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
