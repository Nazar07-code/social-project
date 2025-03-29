import React from "react";
import "./Favorite.css";
import { Link } from "react-router";
const Favorites = () => {
  return (
    <div className="favorite-posts">
      <Link>
        <div className="favorite-post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="favorite-post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
      <Link>
        <div className="favorite-post">
          <img className="img" src="" alt="" />
          <div className="overlay w-[25px] rounded-full p-1">
            <img src="/images/more.svg" alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Favorites;
