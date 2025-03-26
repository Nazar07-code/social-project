import React from "react";
import "./Header.css";
import { Link } from "react-router";
const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo cursor-pointer">
        <img className="w-[40px]" src="/images/logo.svg" alt="" />
      </Link>
      <Link
        to="/auth/login"
        className="log-in flex items-center gap-1 py-2 px-4"
      >
        <button>Log in</button>
        <img className="w-[30px]" src="/images/log-in.svg" alt="" />
      </Link>
    </div>
  );
};

export default Header;
