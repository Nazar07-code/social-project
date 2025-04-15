import React from "react";
import "./Saved.css";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Saved = () => {
  const savedIds = useSelector(
    (state) => state.auth.data?.user?.mass?.saved_posts || []
  );
  const posts = useSelector((state) => state.posts.items || []);

  const savedPosts = posts.filter((post) => savedIds.includes(post.id));

  return (
    <div className="saved-posts">
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <div className="saved-post">
              <img className="img" src={post.file} alt={post.title} />
              <div className="overlay w-[25px] rounded-full p-1">
                <img src="/images/more.svg" alt="" />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Нет сохранённых постов</p>
      )}
    </div>
  );
};

export default Saved;
