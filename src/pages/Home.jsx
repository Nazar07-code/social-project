import React, { useState } from "react";
import "./Home.css";
import { Comments } from "../components/Comments/Comment";

function Home() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [isLiked, setIsLiked] = useState(false);
  const liked = () => {
    setIsLiked(!isLiked);
  };

  const [isSaved, setIsSaved] = useState(false);
  const saved = () => {
    setIsSaved(!isSaved);
  };

  const [commentsChangeModal, setCommentsChangeModal] = useState(false);
  const changeComments = () => {
    setCommentsChangeModal((prev) => !prev);
  };

  return (
    <div className="main-posts flex flex-col justify-center items-center gap-[100px]">
      {/* {posts.map((post) => (
        <div
          key={post.id}
          className="main-post w-[600px] flex flex-col gap-5 overflow-hidden"
        >
          <img className="h-[400px]" src={post.image} alt="" />
          <div className="p-4 flex flex-col gap-4">
            <div className="user flex gap-4 items-center">
              <img
                className="rounded-none w-8 h-8"
                src="/images/avatar-default.svg"
                alt=""
              />
              <h1>vherifdjknvdf</h1>
            </div>
            <b className="tags">
              {post.tags.map((tag, index) => (
                <span key={index}>#{tag} </span>
              ))}
            </b>
            <p>{post.description}</p>
            <div className="btns flex items-center justify-end gap-5">
              <img
                className=""
                src={isLiked ? "/images/heart-active.svg" : "/images/heart.svg"}
                onClick={liked}
                alt=""
              />
              <img
                className=""
                src={isSaved ? "/images/saved-active.svg" : "/images/saved.svg"}
                onClick={saved}
                alt=""
              />
              <button onClick={changeComments}>
                <img className="" src="/images/comment.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      ))} */}
      <div className="main-post w-[600px] flex flex-col gap-5 overflow-hidden">
        <img className="h-[400px]" src="/img.jpg" alt="" />
        <div className="p-4 flex flex-col gap-4">
          <div className="user flex gap-4 items-center">
            <img
              className="rounded-none w-8 h-8"
              src="/images/avatar-default.svg"
              alt=""
            />
            <h1>vherifdjknvdf</h1>
          </div>
          <b className="tags">#bgfb, #gfdd</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, magnam
            voluptates minus debitis assumenda dolorem voluptatibus laboriosam
            aperiam iste consectetur! Architecto ab voluptas iusto accusantium
            cupiditate itaque dolores veritatis laborum! Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Id, magnam voluptates minus
            debitis assumenda dolorem voluptatibus laboriosam aperiam iste
            consectetur! Architecto ab voluptas iusto accusantium cupiditate
            itaque dolores veritatis laborum! Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Id, magnam voluptates minus debitis
            assumenda dolorem voluptatibus laboriosam aperiam iste consectetur!
            Architecto ab voluptas iusto accusantium cupiditate itaque dolores
            veritatis laborum! Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Id, magnam voluptates minus debitis assumenda
            dolorem voluptatibus laboriosam aperiam iste consectetur! Architecto
            ab voluptas iusto accusantium cupiditate itaque dolores veritatis
            laborum!
          </p>
          <div className="btns flex items-center justify-end gap-5">
            <img
              className=""
              src={isLiked ? "/images/heart-active.svg" : "/images/heart.svg"}
              onClick={liked}
              alt=""
            />
            <img
              className=""
              src={isSaved ? "/images/saved-active.svg" : "/images/saved.svg"}
              onClick={saved}
              alt=""
            />
            <button onClick={changeComments}>
              <img className="" src="/images/comment.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <Comments
        changeComments={changeComments}
        commentsChangeModal={commentsChangeModal}
      />
    </div>
  );
}

export default Home;
