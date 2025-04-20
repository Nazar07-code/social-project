import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/posts";
import "./CreatePost.css";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (!file) {
      setMediaPreview("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("description", description);

    const result = await dispatch(createPost(formData));

    if (result.payload) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      let userPosts = [];

      try {
        const rawUserPosts = storedUser?.mass?.user_posts;

        if (typeof rawUserPosts === "string") {
          userPosts = JSON.parse(rawUserPosts);
        } else if (Array.isArray(rawUserPosts)) {
          userPosts = rawUserPosts.filter((el) => typeof el === "number");
        }
      } catch (err) {
        console.error("Parsing error in user_posts:", err);
        userPosts = [];
      }

      userPosts.push(result.payload.id);
      storedUser.mass.user_posts = userPosts;
      localStorage.setItem("user", JSON.stringify(storedUser));
      navigate(-1, { state: { newPost: result.payload } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-post w-[600px] flex flex-col overflow-hidden">
        <div className="import-file mb-4 flex items-center justify-center">
          <label className="custom-file-upload cursor-pointer">
            <input
              className="hidden"
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              required
            />
            {mediaPreview ? (
              <img
                className="imported h-[400px] rounded-[20px]"
                src={mediaPreview}
                alt=""
              />
            ) : (
              <img
                className="import-img h-[150px] w-[150px]"
                src="/images/folder-add.svg"
                alt=""
              />
            )}
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags (optional)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <textarea
            className="description-input p-5"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="create flex justify-center" type="submit">
            Create post
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
