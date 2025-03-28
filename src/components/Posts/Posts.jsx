import React from "react";
import "./Post.css";
import { Link } from "react-router";
const Posts = () => {
  return (
    <div className="posts">
      <Link>
        <div className="post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Posts;
