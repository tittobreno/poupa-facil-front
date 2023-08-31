import { HiUserCircle } from "react-icons/hi";
import "./styles.css";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUser } from "../../../contexts/UserContext";

interface UserDataProps {
  setEditData: (newState: boolean) => void;
}

const UserData = ({ setEditData }: UserDataProps) => {
  const { dataUser } = useUser();

  return (
    <div className="edit-user-modal__user-data-container">
      <section className="edit-user-modal__section-avatar">
        <HiUserCircle size={80} className="section-avatar__img" />
        <button
          onClick={() => setEditData(true)}
          className="section-avatar__btn"
        >
          Editar
          <HiOutlinePencilSquare size={18} />
        </button>
      </section>

      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Nome</strong>
        <span>{dataUser.name}</span>
      </section>

      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Email</strong>
        <span>{dataUser.email}</span>
      </section>
    </div>
  );
};

export default UserData;
