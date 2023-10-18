import { HiUserCircle } from "react-icons/hi";
import "./styles.css";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUser } from "../../../contexts/UserContext";
import { MouseEvent } from "react";

interface UserDataProps {
  setEditData: (newState: boolean) => void;
  setEditPassword: (newState: boolean) => void;
}

const UserData = ({ setEditData, setEditPassword }: UserDataProps) => {
  const { dataUser, form } = useUser();

  const handleEdit = (event: MouseEvent) => {
    event.preventDefault();
    setEditData(true);
    setEditPassword(false);
  };

  return (
    <div className="edit-user-modal__user-data-container">
      <section className="edit-user-modal__section-avatar">
        <HiUserCircle size={100} className="section-avatar__img" />
        <button
          onClick={(event) => handleEdit(event)}
          className="section-avatar__btn"
        >
          Editar
          <HiOutlinePencilSquare size={18} />
        </button>
      </section>

      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Nome</strong>
        <span>{form.name}</span>
      </section>

      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Email</strong>
        <span>{form.email}</span>
      </section>
    </div>
  );
};

export default UserData;
