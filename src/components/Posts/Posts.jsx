import React, { useEffect, useState } from "react";
import "./Post.css";
import { Link, useLocation, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

const Posts = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.data?.user);
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/posts/`);
        setPosts(res.data);
      } catch (err) {
        console.error("Ошибка при получении постов:", err);
      }
    };

    if (user?.username) {
      fetchUserPosts();
    }
  }, [user]);

  useEffect(() => {
    if (location.state?.newPost && location.state.newPost.user.id === user.id) {
      setPosts((prev) => [location.state.newPost, ...prev]);
    }
  }, [location.state?.newPost]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <div className="post">
            <img className="img" src={post.file} alt="Post" />
            <div className="overlay w-[25px] rounded-full p-1">
              <img src="/images/more.svg" alt="more" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
