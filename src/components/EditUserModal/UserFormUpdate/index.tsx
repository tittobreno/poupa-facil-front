import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useUser } from "../../../contexts/UserContext";
import { User } from "../../../types";

interface UserFormUpdateProps {
  setEditData: (newState: boolean) => void;
  handleEditUser: (user: User) => void;
}

const UserFormUpdate = ({
  setEditData,
  handleEditUser,
}: UserFormUpdateProps) => {
  const { form, setForm } = useUser();

  return (
    <>
      <section className="edit-user-modal__form-section">
        <label htmlFor="name" className="edit-user-modal__label">
          Nome
        </label>
        <input
          name="name"
          value={form.name}
          type="text"
          id="name"
          className="edit-user-modal__input"
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </section>

      <section className="edit-user-modal__form-section">
        <label htmlFor="email" className="edit-user-modal__label">
          Email
        </label>
        <input
          name="email"
          value={form.email}
          type="text"
          id="email"
          className="edit-user-modal__input"
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
      </section>

      <div className="password-box">
        <button
          onClick={() => {
            setEditData(false);
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
          className="edit-user-modal__btn"
          type="button"
          onClick={() => handleEditUser(form)}
        >
          Confirmar
        </button>
      </div>
    </>
  );
};

export default UserFormUpdate;
