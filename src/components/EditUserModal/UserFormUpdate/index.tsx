import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useUser } from "../../../contexts/UserContext";

interface UserFormUpdateProps {
  setEditData: (newState: boolean) => void;
}

const UserFormUpdate = ({ setEditData }: UserFormUpdateProps) => {
  const { form, setForm, handleEditUser } = useUser();
  console.log(form);

  return (
    <>
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
        <HiOutlineArrowSmLeft size={30} />
        Voltar
      </button>

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
      <button
        className="edit-user-modal__btn"
        type="button"
        onClick={() => handleEditUser(form)}
      >
        Alterar
      </button>
    </>
  );
};

export default UserFormUpdate;
