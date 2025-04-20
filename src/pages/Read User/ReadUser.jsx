import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../components/Posts/Post.css"; // Подключаем ту же стилизацию, что и в UserPosts

const UserProfile = () => {
  const { id } = useParams(); // ID из URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Получение данных пользователя по ID
        const userRes = await axios.get(
          `http://127.0.0.1:8000/api/v1/users/${id}`
        );
        setUser(userRes.data);

        // Получение его постов
        const postsRes = await axios.get(
          `http://127.0.0.1:8000/api/v1/posts/user/${id}`
        );
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке профиля:", err);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) return <p className="text-center mt-10">Загрузка профиля...</p>;

  return (
    <>
      <div className="info flex justify-center items-center gap-5 px-1 mt-10">
        <div className="avatar">
          <img
            className="w-[120px] h-[120px] mr-1 bg-gray-300 rounded-full object-cover"
            src={user.avatar || "/images/avatar-default.svg"}
            alt="avatar"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-10">
            <div className="nickname font-bold text-xl">@{user.username}</div>
            <div className="subscribe-btn text-[20px] font-medium px-5 py-1 bg-red-600 rounded-xl text-white">
              <button>Subscribe</button>
            </div>
          </div>
          <div className="counts text-center flex items-center gap-10">
            <p>Subscribes {user.mass?.subscribes.length}</p>
            <p>Subscribers {user.mass?.subscribers.length}</p>
            <p>Posts {posts.length}</p>
          </div>
        </div>
      </div>

      <div className="posts mt-10">
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
          <p className="text-center mt-10">
            У этого пользователя пока нет постов
          </p>
        )}
      </div>
    </>
  );
};

export default UserProfile;
