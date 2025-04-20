import "./ReadUser.css";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

const ReadUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/v1/users/${id}`),
          axios.get(`http://127.0.0.1:8000/api/v1/posts/?user=${id}`),
        ]);
        setUser(userRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Ошибка при получении данных пользователя:", err);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (!user) return <div>Загрузка...</div>;

  return (
    <>
      <div className="info flex justify-center items-center gap-5 px-1">
        <div className="avatar">
          <img
            className="w-[120px] h-[120px] mr-1 bg-gray-300 rounded-full object-cover"
            src={user.avatar || "/images/avatar-default.svg"}
            alt="avatar"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="nickname font-bold">@{user.username}</div>
              {/* Здесь можно добавить кнопку подписки/отписки при необходимости */}
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
        <Link to={`/user/${user.id}/posts`}>Posts</Link>
        <Link to={`/user/${user.id}/favorites`}>Favorites</Link>
        <Link to={`/user/${user.id}/saved`}>Saved</Link>
      </div>

      {/* Список постов можно сразу отрисовать здесь, если нужно */}
      <div className="user-posts grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden">
            <img
              src={post.file || "/img.jpg"}
              alt="Post"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReadUser;
