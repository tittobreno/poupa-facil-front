import "./styles.css";
import { HiOutlineX, HiUserCircle } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useGlobal } from "../../context/GlobalContext";
const EditUserModal = () => {
  const { setShowEditUserModal, setTitlePopup, setOpenPopUpNewRegister } =
    useGlobal();

  const handleEditUser = () => {
    setTitlePopup("Usuário editado com sucesso!");
    setShowEditUserModal(false);
    setOpenPopUpNewRegister(true);
  };
  return (
    <div className="overlay">
      <div className="edit-user-modal__container">
        <HiOutlineX
          size={25}
          className="edit-user-modal__close"
          onClick={() => setShowEditUserModal(false)}
        />
        <h1 className="edit-user-modal__title">Editar Usuário</h1>

        <form className="edit-user-modal__form">
          <section className="edit-user-modal__section-avatar">
            <HiUserCircle size={50} className="section-avatar__img" />
            <button className="section-avatar__btn">
              Escolher imagem
              <HiOutlinePencilSquare size={18} />
            </button>
          </section>

          <section className="edit-user-modal__form-section">
            <label htmlFor="name" className="edit-user-modal__label">
              Nome
            </label>
            <input type="text" id="name" className="edit-user-modal__input" />
          </section>

          <section className="edit-user-modal__form-section">
            <label htmlFor="email" className="edit-user-modal__label">
              Email
            </label>
            <input type="text" id="email" className="edit-user-modal__input" />
          </section>

          <section className="edit-user-modal__form-section">
            <label htmlFor="password" className="edit-user-modal__label">
              Senha
            </label>
            <input
              type="text"
              id="password"
              className="edit-user-modal__input"
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
            />
          </section>

          <button
            className="edit-user-modal__btn"
            type="button"
            onClick={() => handleEditUser()}
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
