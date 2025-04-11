import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/posts";
import './CreatePost.css'

const CreatePost = () => {
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setMedia(file);
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
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("description", description);
    if (media) formData.append("media", media);

    await dispatch(createPost(formData));
    setTitle("");
    setTags("");
    setDescription("");
    setMedia(null);
    setMediaPreview("");
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
            placeholder="Description (optional)"
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
