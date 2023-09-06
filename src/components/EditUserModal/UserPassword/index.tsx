import { HiOutlinePencilSquare } from "react-icons/hi2";

const UserPassword = () => {
  return (
    <>
      <section className="edit-user-modal__form-section">
        <label htmlFor="current-password" className="edit-user-modal__label">
          Senha atual
        </label>
        <input
          type="text"
          id="current-password"
          className="edit-user-modal__input"
        />
      </section>

      <section className="edit-user-modal__form-section">
        <label htmlFor="password" className="edit-user-modal__label">
          Nova senha
        </label>
        <input type="text" id="password" className="edit-user-modal__input" />
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
        />
      </section>
    </>
  );
};

export default UserPassword;
