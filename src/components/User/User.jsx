import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import "./User.css";
const User = () => {
  const [isActive, setIsActive] = useState("posts");
  const handleActive = (overlined) => {
    setIsActive(overlined);
    localStorage.setItem("activeLink", overlined);
  };
  const isActiveLink = (overlined) => {
    return isActive === overlined ? "overline" : "";
  };
  useEffect(() => {
    const activeLink = localStorage.getItem("activeLink");
    if (activeLink) setIsActive(activeLink);
  });

  return (
    <div className="my-[20px]">
      <div className="flex justify-center gap-5">
        <div className="">
          <img
            className="w-[120px] h-[120px] bg-gray-300 rounded-full"
            src="/images/avatar-default.svg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="title flex gap-20 items-center">
            <div className="name text-[20px] w-[100px]">Nazar</div>
            <div className="edit">
              <button>Edit profile</button>
            </div>
            <div className="log-out">
              <button>Log out</button>
            </div>
          </div>
          <div className="counts flex items-center">
            <p className="w-[200px]">Subscribes 222</p>
            <p className="w-[200px]">Subscribers 111</p>
            <p className="w-[200px]">Posts 11</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="nickname font-bold">@BOBER</div>
            <Link to="/me/createPost" className="add-post">
              <button>Add new post</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="links flex justify-center gap-20 mt-[40px]">
        <Link
          to="/me/posts"
          className={isActiveLink("posts")}
          onClick={() => handleActive("posts")}
        >
          Posts
        </Link>
        <Link
          to="/me/favorites"
          className={isActiveLink("favorite")}
          onClick={() => handleActive("favorite")}
        >
          Favorites
        </Link>
        <Link
          to="/me/saved"
          className={isActiveLink("saved")}
          onClick={() => handleActive("saved")}
        >
          Saved
        </Link>
      </div>
    </div>
  );
};

export default User;
