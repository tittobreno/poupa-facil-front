import "./styles.css";
import Logo from "../../assets/logo-pf.png";

function Login() {
  return (
    <div className="container__login">
      <img className="login__logo" src={Logo} alt="Logo da página!" />
    </div>
  );
}

export default Login;
