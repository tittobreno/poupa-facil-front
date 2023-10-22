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
      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Nome</strong>
        <span>{form.name}</span>
      </section>

      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Email</strong>
        <span>{form.email}</span>
      </section>

      <section className="edit-user-modal__user-container-btn">
        <button
          onClick={(event) => handleEdit(event)}
          className="edit-user-model__user-data-btn"
        >
          Alterar dados
          <HiOutlinePencilSquare size={18} />
        </button>
      </section>
    </div>
  );
};

export default UserData;
