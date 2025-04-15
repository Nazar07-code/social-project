import React, { useEffect, useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import axios from "axios";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/posts/");
        const userPosts = res.data.filter(
          (post) => post.user && post.user.id === Number(userId)
        );
        setPosts(userPosts);
      } catch (err) {
        console.error("Ошибка при получении постов:", err);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="posts">
      {posts.length ? (
        posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <div className="post">
              <img className="img" src={post.file} alt="Post" />
              <div className="overlay w-[25px] rounded-full p-1">
                <img src="/images/more.svg" alt="more" />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Постов пока нет</p>
      )}
    </div>
  );
};

export default UserPosts;
