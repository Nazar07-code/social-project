import React from "react";
import "./Header.css";
import { Link } from "react-router";
const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo cursor-pointer">
        <img className="w-[50px]" src="/images/logo.svg" alt="" />
      </Link>
      <Link
        to="/auth/login"
        className="log-in flex items-center rounded-xl gap-1 py-2 px-4"
      >
        <button>Log in</button>
        <img className="w-[30px]" src="/images/log-in.svg" alt="" />
      </Link>
      <div className="avatar-login hidden w-[50px] h-[50px] flex p-[4px] items-centerpx-4 rounded-full">
        <Link to="/auth/login">
          <button>
            <img src="/images/avatar-default.svg" alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
