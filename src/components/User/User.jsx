import { Link } from "react-router";

import "./User.css";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.auth.data?.user);
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
              <Link>
                <button>Edit profile</button>
              </Link>
              <div className="flex gap-2">
                <Link to="/me/createPost" className="add-post">
                  Add new post
                </Link>
                <Link to="/me/createPost" className="add-post plus">
                  <img src="/images/add-post.svg" alt="plus" />
                </Link>
              </div>
            </div>
          </div>
          <div className="counts text-center flex items-center gap-10">
            <p>Subscribes 222</p>
            <p>Subscribers 111</p>
            <p>Posts 11</p>
          </div>
        </div>
      </div>

      <div className="links flex justify-center gap-20 mt-[40px] text-[20px]">
        <Link to="/:id/posts">Posts</Link>
        <Link to="/:id/favorites">Favorites</Link>
        <Link to="/:id/saved">Saved</Link>
      </div>
    </>
  );
};

export default User;
