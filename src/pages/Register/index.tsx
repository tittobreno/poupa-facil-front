import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-w.png";
import { useGlobal } from "../../contexts/GlobalContext";
import "./styles.css";
import { FormEvent, FormEventHandler } from "react";
import { useUser } from "../../contexts/UserContext";
import api from "../../lib/api";
import { motion } from "framer-motion";

const Register = () => {
  const { handleChangeForm, form, setForm } = useUser();
  const Navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name) {
      return alert("O campo nome é obrigatório");
    }

    if (!form.email) {
      return alert("O campo email é obrigatório");
    }

    if (!form.password) {
      return alert("O campo senha é obrigatório");
    }

    if (!form.passwordConfirmation) {
      return alert("O campo confirmar senha é obrigatório");
    }

    if (form.password != form.passwordConfirmation) {
      return alert("As senhas devem ser iguais");
    }

    try {
      await api.post("/cadastrar", { ...form });
      setForm({ name: "", email: "", password: "", passwordConfirmation: "" });
      alert("Cadastro criado com sucesso!");
      Navigate("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="container__register">
      <Link to="/">
        <img className="register__logo-img" src={Logo} alt="Logo da página!" />
      </Link>
      <main className="register__main">
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="register__card"
        >
          <h1 className="register__title">Crie sua conta</h1>
          <form onSubmit={handleRegister} className="register__form">
            <div className="form__box-field">
              <label htmlFor="name" className="form__label">
                Nome
              </label>
              <input
                className="form__input"
                name="name"
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="box__password">
              <div className="form__box-field">
                <label htmlFor="password" className="form__label">
                  Senha
                </label>
                <input
                  className="form__input"
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
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
                  value={form.passwordConfirmation}
                  onChange={(e) =>
                    setForm({ ...form, passwordConfirmation: e.target.value })
                  }
                />
              </div>
            </div>

            <button className="form__btn" type="submit">
              Cadastrar
            </button>
          </form>
          <div className="register__redirect-login">
            <span>Já tem cadastro? </span>
            <Link className="redirect__link" to="/">
              Fazer login!
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Register;
