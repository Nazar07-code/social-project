import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import axios from "axios";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData) => {
    const { data } = await instance.post(
      "http://127.0.0.1:8000/api/v1/posts/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
);

export const postSave = createAsyncThunk(
  "posts/postSave",
  async ({ user, saved_items }) => {
    const res = await instance.post("/saved/", { user, saved_items });
  }
);
export const postSaveDelete = createAsyncThunk(
  "posts/postSave",
  async (postId) => {
    const res = await instance.delete(`/saved/${postId}`);
  }
);

export const postLike = createAsyncThunk(
  "posts/postLike",
  async ({ user, like_items }) => {
    const res = await instance.post("/like/", { user, like_items });
  }
);
export const postLikeDelete = createAsyncThunk(
  "posts/postLike",
  async (postId) => {
    const res = await instance.delete(`/saved/${postId}`);
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await instance.get("http://127.0.0.1:8000/api/v1/posts/");
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "loading",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "error";
        state.items = [];
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const postsReducer = postsSlice.reducer;
