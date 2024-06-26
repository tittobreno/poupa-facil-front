import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUser } from "../../../contexts/UserContext";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { User } from "../../../models";
import "./styles.css";
interface UserPasswordProps {
  setEditPassword: (newState: boolean) => void;
  handleEditUser: (user: User) => void;
}

const UserPassword = ({
  setEditPassword,
  handleEditUser,
}: UserPasswordProps) => {
  const { form, setForm } = useUser();
  return (
    <main className="edit-password__container">
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

      <section className="edit-user-modal__form-compare-password">
        <section>
          <label htmlFor="password" className="edit-user-modal__label">
            Nova senha
          </label>
          <input
            type="text"
            id="password"
            className="edit-user-modal__input"
            value={form.newPassword}
            onChange={(event) =>
              setForm({ ...form, newPassword: event.target.value })
            }
          />
        </section>

        <section>
          <label
            htmlFor="password-confirmation"
            className="edit-user-modal__label"
          >
            Confirmar senha
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
      </section>

      <div className="password-box">
        <button
          onClick={(event) => {
            setEditPassword(false);
            setForm({
              name: "",
              email: "",
              currentPassword: "",
              newPassword: "",
              passwordConfirmation: "",
            });
          }}
          className="edit-user-modal__back"
        >
          Voltar
        </button>
        <button
          onClick={() => handleEditUser(form)}
          type="button"
          className="edit-user-modal__btn"
        >
          Confirmar
        </button>
      </div>
    </main>
  );
};

export default UserPassword;
