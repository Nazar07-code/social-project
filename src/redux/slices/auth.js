import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchAuth = createAsyncThunk("http://127.0.0.1:8000/api/v1/login/", async (params) => {
  const { data } = await instance.post(
    "http://127.0.0.1:8000/api/v1/login/",
    params
  );
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await instance.post("/auth/register", params);
    return data;
  }
);

export const selectIsAuth = (state) => Boolean(state.auth.data);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "loading",
  },
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })

      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
