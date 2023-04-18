import "./styles.css";
import Logo from "../../assets/logo-pf.png";

function Login() {
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
          <button className="login__btn--register">Cadastre-se</button>
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
                <input
                  className="login__input"
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                />
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
