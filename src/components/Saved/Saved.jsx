import React from "react";
import "./Saved.css";
import { Link } from "react-router";
const Saved = () => {
  return (
    <div className="saved-posts">
      <Link>
        <div className="saved-post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="saved-post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="saved-post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Saved;
