import "./User.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.auth.data?.user);

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/v1/posts/user/${user?.id}`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Ошибка при получении постов:", err);
      }
    };

    if (user?.id) {
      fetchUserPosts();
    }
  }, [user?.id]);

  return (
    <>
      <div className="info flex justify-center items-center gap-5 px-1">
        <div className="avatar">
          <img
            className="w-[120px] h-[120px] mr-1 bg-gray-300 rounded-full object-cover"
            src={user?.avatar || "/images/avatar-default.svg"}
            alt="avatar"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="nickname font-bold">@{user.username}</div>
              <Link to={`/${user.id}/editMe`}>
                <button className="editMe">Edit profile</button>
              </Link>
              <div className="flex gap-2">
                <Link to={`/${user.id}/createPost`} className="add-post">
                  Add new post
                </Link>
                <Link to={`/${user.id}/createPost`} className="add-post plus">
                  <img src="/images/add-post.svg" alt="plus" />
                </Link>
              </div>
            </div>
          </div>
          <div className="counts text-center flex items-center gap-10">
            <p>Subscribes {user.mass?.subscribes.length}</p>
            <p>Subscribers {user.mass?.subscribers.length}</p>
            <p>Posts {posts.length}</p>
          </div>
        </div>
      </div>

      <div className="links flex justify-center gap-20 mt-[40px] text-[20px]">
        <Link to={`/${user.id}/posts`}>Posts</Link>
        <Link to={`/${user.id}/favorites`}>Favorites</Link>
        <Link to={`/${user.id}/saved`}>Saved</Link>
      </div>
    </>
  );
};

export default User;
