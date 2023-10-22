import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUser } from "../../../contexts/UserContext";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

interface UserPasswordProps {
  setEditPassword: (newState: boolean) => void;
}

const UserPassword = ({ setEditPassword }: UserPasswordProps) => {
  const { form, setForm } = useUser();
  return (
    <>
      <button
        onClick={(event) => {
          setEditPassword(false);
          setForm({
            ...form,
            currentPassword: "",
            password: "",
            passwordConfirmation: "",
          });
        }}
        className="edit-user-modal__back"
      >
        <HiOutlineArrowSmLeft size={30} />
        Voltar
      </button>
      <section className="edit-user-modal__form-section">
        <label htmlFor="current-password" className="edit-user-modal__label">
          Senha atual
        </label>
        <input
          type="password"
          id="current-password"
          className="edit-user-modal__input"
          value={form.currentPassword}
          onChange={(event) =>
            setForm({ ...form, currentPassword: event.target.value })
          }
        />
      </section>

      <section className="edit-user-modal__form-section">
        <label htmlFor="password" className="edit-user-modal__label">
          Nova senha
        </label>
        <input
          type="text"
          id="password"
          className="edit-user-modal__input"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
        />
      </section>

      <section className="edit-user-modal__form-section">
        <label
          htmlFor="password-confirmation"
          className="edit-user-modal__label"
        >
          Confirme sua senha
        </label>
        <input
          type="text"
          id="password-confirmation"
          className="edit-user-modal__input"
          value={form.passwordConfirmation}
          onChange={(event) =>
            setForm({ ...form, passwordConfirmation: event.target.value })
          }
        />
      </section>
      <button className="edit-user-modal__btn">Confirmar</button>
    </>
  );
};

export default UserPassword;
