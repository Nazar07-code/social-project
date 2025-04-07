import React from "react";
import "./Header.css";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <div className="header">
      <Link to="/" className="logo cursor-pointer">
        <img className="w-[50px]" src="/images/logo.svg" alt="" />
      </Link>
      {isAuth ? (
        <Link to="/" className="rounded-full w-[50px] bg-gray-500 p-1">
          <img src="/images/avatar-default.svg" alt="" />
        </Link>
      ) : (
        <Link
          to="/auth/login"
          className="log-in flex items-center rounded-xl gap-1 py-2 px-4"
        >
          <button>Log in</button>
          <img className="w-[30px]" src="/images/log-in.svg" alt="" />
        </Link>
      )}
    </div>
  );
};

export default Header;