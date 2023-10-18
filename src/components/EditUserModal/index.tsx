import "./styles.css";
import { HiOutlineArrowSmLeft, HiOutlineX, HiUserCircle } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useGlobal } from "../../contexts/GlobalContext";
import api from "../../services/api";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { getItem } from "../../utils/storage";
import UserData from "./UserData";
import UserPassword from "./UserPassword";
const EditUserModal = () => {
  const [editData, setEditData] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
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

  const handleEditUser = async () => {
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

  const handleFormParssord = (event: MouseEvent) => {
    event.preventDefault();
    setEditPassword(!editPassword);
  };

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

        <form className="edit-user-modal__form">
          {editData && (
            <>
              <div className="testes">
                <button
                  onClick={() => {
                    setEditData(false);
                    setImage(null);
                  }}
                  className="edit-user-modal__back teste-btn"
                >
                  <HiOutlineArrowSmLeft size={30} />
                  Voltar
                </button>
                <section className="edit-user-modal__section-avatar">
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="custom-img-preview"
                    />
                  ) : (
                    <HiUserCircle size={100} className="section-avatar__img" />
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
                      Escolher imagem
                      <HiOutlinePencilSquare size={18} />
                    </label>
                  </div>
                </section>
              </div>

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
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
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
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                />
              </section>
            </>
          )}

          {editData ? (
            ""
          ) : (
            <>
              {editPassword ? (
                ""
              ) : (
                <UserData
                  setEditPassword={setEditPassword}
                  setEditData={setEditData}
                />
              )}
              <div className="edit-user-modal-question-password">
                {editPassword ? (
                  ""
                ) : (
                  <strong className="question-password-button-label">
                    Senha de acesso
                  </strong>
                )}

                {editPassword ? (
                  <button
                    onClick={(event) => {
                      event.preventDefault();

                      setEditPassword(false);
                      setForm({
                        ...form,
                        currentPassword: "",
                        password: "",
                        passwordConfirmation: "",
                      });
                    }}
                    className="edit-user-modal__back"
                  >
                    <HiOutlineArrowSmLeft size={30} />
                    Voltar
                  </button>
                ) : (
                  <button
                    onClick={(event) => {
                      handleFormParssord(event);
                    }}
                    className="question-password-button"
                  >
                    Alterar
                    <HiOutlinePencilSquare size={18} />
                  </button>
                )}
              </div>

              {editPassword && <UserPassword />}
            </>
          )}

          {editData || editPassword ? (
            <button
              className="edit-user-modal__btn"
              type="button"
              onClick={() => handleEditUser()}
            >
              Alterar
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
