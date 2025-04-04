import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

function Register() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fileName, setFilename] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFilename("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="register">
      <form action="">
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
                <img className=" w-[35px]" src="/images/photo.svg" alt="" />
              </div>
            )}
          </label>
        </div>

        <div className="input">
          <input type="text" placeholder="Name" required />
        </div>
        <div className="input">
          <input type="email" placeholder="Email" required />
          <img src="/images/mail.svg" alt="Email icon" />
        </div>

        <div className="input">
          <input
            type={isPasswordShown ? "text" : "password"}
            placeholder="Password"
            required
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
        <div className="input">
          <input
            type={isPasswordShown ? "text" : "password"}
            placeholder="Confirm password"
            required
          />
        </div>

        <button type="submit">Create new account</button>
      </form>
      <Link to="/auth/login">
        <button className="green">Login</button>
      </Link>
    </div>
  );
}

export default Register;
