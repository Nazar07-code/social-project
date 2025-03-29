import React from "react";
import { Link } from "react-router";
import { useState } from "react";
import Header from "../Header/Header";
const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <form className="login">
      <h1 className="text-[50px] font-medium">L O G I N</h1>
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
            isPasswordShown ? "/images/eye-show.svg" : "/images/eye-dashed.svg"
          }
          className="cursor-pointer"
          alt="Toggle visibility"
          onClick={() => setIsPasswordShown((prev) => !prev)}
        />
      </div>

      <button type="submit">Login</button>
      <Link to="/auth/register">
        <button className="green">Create new account</button>
      </Link>
    </form>
  );
};

export default Login;
