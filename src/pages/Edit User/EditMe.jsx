import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser, logout } from "../../redux/slices/auth";
import "../Auth/Auth.css";
import { Link, useNavigate } from "react-router";

function EditMe() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data?.user);
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [password, setPassword] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (!file) {
      setAvatarPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);

    const res = await dispatch(fetchUpdateUser({ id: user.id, formData }));

    if (!res.payload || res.error) {
      return alert("Ошибка при обновлении профиля");
    }

    alert("Профиль успешно обновлён");
    navigate(-1);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="avatar">
          <input
            type="file"
            id="avatar"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar" className="avatar">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <img className="w-[35px]" src="/images/photo.svg" alt="" />
              </div>
            )}
          </label>
        </div>

        <div className="input">
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <img src="/images/mail.svg" alt="Email icon" />
        </div>

        <div className="input">
          <input
            type={isPasswordShown ? "text" : "password"}
            placeholder="New password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={
              isPasswordShown
                ? "/images/eye-show.svg"
                : "/images/eye-dashed.svg"
            }
            className="cursor-pointer"
            alt="Toggle visibility"
            onClick={() => setIsPasswordShown((prev) => !prev)}
          />
        </div>

        <button type="submit">Update data</button>
        <button
          type="button"
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          Log out
        </button>
      </form>
    </div>
  );
}

export default EditMe;
