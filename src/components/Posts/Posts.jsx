import React from "react";
import "./Post.css";
import { Link } from "react-router";
const Posts = () => {
  return (
    <div className="posts">
      <Link>
        <div className="post">
          <img className="" src="" alt="" />
          <div className="overlay">
            <img src="" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="post">
          <img className="" src="" alt="" />
          <div className="overlay">
            <img src="" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="post">
          <img className="" src="" alt="" />
          <div className="overlay">
            <img src="" alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Posts;
