import { HiUserCircle } from "react-icons/hi";
import "./styles.css";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUser } from "../../../contexts/UserContext";
import { MouseEvent, useEffect, useState } from "react";
import api from "../../../services/api";
import { getItem } from "../../../utils/storage";

interface UserDataProps {
  setEditData: (newState: boolean) => void;
  setEditPassword: (newState: boolean) => void;
}

const UserData = ({ setEditData, setEditPassword }: UserDataProps) => {
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
  });
  const { dataUser, form } = useUser();

  const handleEdit = (event: MouseEvent) => {
    event.preventDefault();
    setEditData(true);
    setEditPassword(false);
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const { data } = await api.get("/usuario/detalhar", {
          headers: { Authorization: `Bearer ${getItem("token")}` },
        });
        setLocalUser({
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        console.log(error);
      }
    };

    setData();
  }, []);

  return (
    <div className="edit-user-modal__user-data-container">
      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Nome</strong>
        <span>{localUser.name}</span>
      </section>

      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Email</strong>
        <span>{localUser.email}</span>
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
