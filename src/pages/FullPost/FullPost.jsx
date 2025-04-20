import React, { useState, useEffect } from "react";
import { Comments } from "../../components/Comments/Comment";
import { useDispatch, useSelector } from "react-redux";
import { postLike, postSave } from "../../redux/slices/posts";
import { useParams } from "react-router";
import "./FullPost.css";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentsChangeModal, setCommentsChangeModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data?.user);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Ошибка при получении данных поста:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetails();
    }
  }, [id]);

  const liked = () => {
    dispatch(
      postLike({
        user: user.id,
        like_items: [{ post: { id: post.id } }],
      })
    );
  };

  const saved = () => {
    dispatch(
      postSave({
        user: user.id,
        saved_items: [{ post: { id: post.id } }],
      })
    );
  };

  const changeComments = () => {
    setCommentsChangeModal((prev) => !prev);
  };

  if (loading || !post) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="full-post w-[600px] flex flex-col gap-5 overflow-hidden mx-auto mt-10">
      <img className="photo" src={post.file || "/img.jpg"} alt="" />
      <div className="p-4 flex flex-col gap-4">
        <div className="user flex gap-4 items-center">
          <img
            className="rounded-full w-10 h-10"
            src={post.avatar || "/images/avatar-default.svg"}
            alt="avatar"
          />
          <h1 className="cursor-pointer text-[20px] font-semibold">
            {post.user.username}
          </h1>
        </div>
        <b className="tags">{post.tags}</b>
        <p className="description">{post.description}</p>
        <div className="btns flex items-center justify-end gap-5">
          <button onClick={liked} className="like-btn">
            <img
              src={
                user?.mass?.favorite_posts?.includes(post.id)
                  ? "/images/heart-active.svg"
                  : "/images/heart.svg"
              }
              alt="Like"
            />
          </button>
          <button onClick={saved} className="save-btn">
            <img
              src={
                user?.mass?.saved_posts?.includes(post.id)
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
      <Comments
        changeComments={changeComments}
        commentsChangeModal={commentsChangeModal}
      />
    </div>
  );
};

export default PostDetails;
