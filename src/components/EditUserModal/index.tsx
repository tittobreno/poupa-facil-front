import "./styles.css";
import { HiOutlineArrowSmLeft, HiOutlineX, HiUserCircle } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useGlobal } from "../../contexts/GlobalContext";
import api from "../../services/api";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { getItem } from "../../utils/storage";
import UserData from "./UserData";
import UserPassword from "./UserPassword";
import UserFormUpdate from "./UserFormUpdate";
const EditUserModal = () => {
  const [editData, setEditData] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  const { setIsOpenUserModal, setMessageNotification, setIsOpenNotification } =
    useGlobal();

  const {
    setDataUser,
    dataUser,
    handleChangeForm,
    handleChangeFormEditUser,
    form,
    setForm,
  } = useUser();

  const handleEditUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setMessageNotification("Usuário editado com sucesso!");
      setIsOpenUserModal(false);
      setIsOpenNotification(true);
      setForm({
        name: "",
        email: "",
        currentPassword: "",
        password: "",
        passwordConfirmation: "",
        avatar: "",
      });
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/detalhar", {
          headers: { Authorization: `Bearer ${getItem("token")}` },
        });
        setForm({ name: data.name, email: data.email });
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const [image, setImage] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string | null;
        if (result) {
          setImage(result);
          setForm({ ...form, avatar: result });
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="overlay">
      <div className="edit-user-modal__container">
        <HiOutlineX
          size={25}
          className="edit-user-modal__close"
          onClick={() => {
            setIsOpenUserModal(false);
            setForm({
              name: "",
              email: "",
              currentPassword: "",
              password: "",
              passwordConfirmation: "",
              avatar: "",
            });
          }}
        />
        <h1 className="edit-user-modal__title">Dados do usuário</h1>

        <form onSubmit={handleEditUser} className="edit-user-modal__form">
          {editData || editPassword ? (
            ""
          ) : (
            <section>
              <section className="edit-user-modal__section-avatar">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="custom-img-preview"
                  />
                ) : (
                  <HiUserCircle size={130} className="section-avatar__img" />
                )}

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange(e)}
                    className="section-avatar__input"
                  />
                  <label htmlFor="fileInput" className="custom-file-button">
                    Alterar
                    <HiOutlinePencilSquare size={18} />
                  </label>
                </div>
              </section>

              <section>
                <UserData
                  setEditPassword={setEditPassword}
                  setEditData={setEditData}
                />

                <div className="edit-user-modal-question-password">
                  <strong className="question-password-button-label">
                    Senha de acesso
                  </strong>
                  <button
                    onClick={() => setEditPassword(!editPassword)}
                    className="question-password-button"
                  >
                    Alterar senha
                    <HiOutlinePencilSquare size={18} />
                  </button>
                </div>
              </section>
            </section>
          )}

          {editPassword && <UserPassword setEditPassword={setEditPassword} />}

          {editData && <UserFormUpdate setEditData={setEditData} />}
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
