import { HiUserCircle } from "react-icons/hi";
import "./styles.css";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUser } from "../../../contexts/UserContext";
import { MouseEvent, useEffect, useState } from "react";
import api from "../../../lib/axios";
import { getItem } from "../../../utils/storage";
import { useGlobal } from "../../../contexts/GlobalContext";

interface UserDataProps {
  setEditData: (newState: boolean) => void;
  setEditPassword: (newState: boolean) => void;
}

const UserData = ({ setEditData, setEditPassword }: UserDataProps) => {
  const { imageUser, setImageUser } = useGlobal();
  const [image, setImage] = useState("");
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
  });

  const handleEdit = () => {
    setEditData(true);
    setEditPassword(false);
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const { data } = await api.get("/usuario/detalhar", {
          headers: { Authorization: `Bearer ${getItem("token")}` },
        });

        const binaryData = atob(data.avatar);

        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const view = new Uint8Array(arrayBuffer);

        for (var i = 0; i < binaryData.length; i++) {
          view[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: "image/png" });

        const imageUrl = URL.createObjectURL(blob);

        setImageUser(imageUrl);
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
      <img src={image} alt="" />
      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Nome</strong>
        <span className="edit-user-modal__value">{localUser.name}</span>
      </section>

      <section className="edit-user-modal__user-data-section">
        <strong className="edit-user-modal__user-data-label">Email</strong>
        <span className="edit-user-modal__value">{localUser.email}</span>
      </section>

      <section className="edit-user-modal__user-container-btn">
        <button
          onClick={() => handleEdit()}
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
