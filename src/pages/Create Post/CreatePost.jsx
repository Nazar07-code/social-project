import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const [mediaPreview, setMediaPreview] = useState("");

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
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

  return (
    <form action="">
      <div className="create-post w-[600px] flex flex-col overflow-hidden">
        <div
          className="import-file mb-4 flex items-center justify-center "
          onChange={handleMediaUpload}
        >
          <label className="custom-file-upload cursor-pointer">
            <input className="hidden" type="file" accept="image/*,video/*" />
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
          <div className="title-input">
            <input type="text" placeholder="Title" required />
          </div>
          <div className="tags-input">
            <input type="text" placeholder="Tags (optional)" />
          </div>
          <textarea
            className="description-input p-5"
            placeholder="Description (optional)"
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
