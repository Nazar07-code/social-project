import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import "./User.css";

const User = () => {
  return (
    <>
      <div className="info flex justify-center items-center gap-5 px-1">
        <div className="avatar">
          <img
            className="w-[120px] h-[120px] mr-1 bg-gray-300 rounded-full"
            src="/images/avatar-default.svg"
            alt="avatar"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="">
            <div className="flex items-center justify-between">
              <div className="name text-[20px]">Nazar</div>
              <div className="nickname font-bold">@BOBER</div>
              <div>
                <Link to="/me/createPost" className="add-post">
                  Add new post
                </Link>
                <Link to="/me/createPost" className="add-post plus">
                  <img src="/images/add-post.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="counts text-center flex items-center gap-10">
            <p className="">Subscribes 222</p>
            <p className="">Subscribers 111</p>
            <p className="">Posts 11</p>
          </div>
        </div>
      </div>

      <div className="links flex justify-center gap-20 mt-[40px] text-[20px]">
        <Link to="/me/posts">Posts</Link>
        <Link to="/me/favorites">Favorites</Link>
        <Link to="/me/saved">Saved</Link>
      </div>
    </>
  );
};

export default User;
