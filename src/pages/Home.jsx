import React, { useState, useEffect } from "react";
import "./Home.css";
import { Comments } from "../components/Comments/Comment";
import instance from "../axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState({});
  const [isSaved, setIsSaved] = useState({});
  const [commentsChangeModal, setCommentsChangeModal] = useState(false);

  useEffect(() => {
    instance
      .get("/posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.warn(err));
  }, []);

  const liked = (postId) => {
    setIsLiked((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const saved = (postId) => {
    setIsSaved((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const changeComments = () => {
    setCommentsChangeModal((prev) => !prev);
  };

  return (
    <div className="main-posts flex flex-col justify-center items-center gap-[100px]">
      {posts.map((post) => (
        <div
          key={post.id}
          className="main-post w-[600px] flex flex-col gap-5 overflow-hidden"
        >
          <img
            className="photo"
            src={post.file || "/img.jpg"}
            alt=""
          />
          <div className="p-4 flex flex-col gap-4">
            <div className="user flex gap-4 items-center">
              <img
                className="rounded-full w-8 h-8"
                src={post.avatar || "/images/avatar-default.svg"}
              />
              <h1 className="text-[20px] font-semibold">
                {post.user.username}
              </h1>
            </div>
            <b className="tags">{post.tags || "Без тегов"}</b>
            <p className="description">{post.description}</p>
            <div className="btns flex items-center justify-end gap-5">
              <button onClick={() => liked(post.id)} className="like-btn">
                <img
                  src={
                    isLiked[post.id]
                      ? "/images/heart-active.svg"
                      : "/images/heart.svg"
                  }
                  alt="Like"
                />
              </button>
              <button onClick={() => saved(post.id)} className="save-btn">
                <img
                  src={
                    isSaved[post.id]
                      ? "/images/saved-active.svg"
                      : "/images/saved.svg"
                  }
                  alt="Save"
                />
              </button>
              <button onClick={changeComments} className="comment-btn">
                <img src="/images/comment.svg" alt="Comment" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <Comments
        changeComments={changeComments}
        commentsChangeModal={commentsChangeModal}
      />
    </div>
  );
}

export default Home;
