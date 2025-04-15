import React from "react";
import "./Favorite.css";
import { Link } from "react-router"; // 🛠 Исправлено с "react-router"
import { useSelector } from "react-redux";

const Favorites = () => {
  const favoriteIds = useSelector(
    (state) => state.auth.data?.user?.mass?.favorite_posts || []
  );
  const posts = useSelector((state) => state.posts.items || []);

  const favoritePosts = posts.filter((post) => favoriteIds.includes(post.id));

  return (
    <div className="favorite-posts">
      {favoritePosts.length > 0 ? (
        favoritePosts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <div className="favorite-post">
              <img className="img" src={post.file} alt={post.title} />
              <div className="overlay w-[25px] rounded-full p-1">
                <img src="/images/more.svg" alt="" />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Нет понравившихся постов</p>
      )}
    </div>
  );
};

export default Favorites;
