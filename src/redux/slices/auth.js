import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios"; // Импортируем созданный инстанс axios

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await instance.post("login/", params); // Здесь теперь только путь
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await instance.post("register/", params, {
      // Тут тоже
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "auth/fetchUpdateUser",
  async ({ id, formData }) => {
    const token = window.localStorage.getItem("token");

    const { data } = await instance.patch(
      `users/${id}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }
);



export const selectIsAuth = (state) => Boolean(state.auth.data);

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    return null;
  }
};




const initialState = {
  data: localStorage.getItem("token")
    ? {
        token: localStorage.getItem("token"),
        user: getUserFromLocalStorage(),
      }
    : null,
  status: "loaded",
};

// export const updateUserMass = createAsyncThunk(
//   "auth/updateUserMass",
//   async ({ userId, postId, type }, { getState, rejectWithValue }) => {
//     try {
//       const { auth } = getState();
//       const userMass = { ...auth.data.user.mass };

//       if (!userMass[`${type}_posts`]) {
//         userMass[`${type}_posts`] = [];
//       }

//       const alreadyExists = userMass[`${type}_posts`].includes(postId);
//       const updatedArray = alreadyExists
//         ? userMass[`${type}_posts`].filter((id) => id !== postId)
//         : [...userMass[`${type}_posts`], postId];

//       const updatedUser = {
//         ...auth.data.user,
//         mass: {
//           ...userMass,
//           [`${type}_posts`]: updatedArray,
//         },
//       };

//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       return updatedUser;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      // .addCase(updateUserMass.fulfilled, (state, action) => {
      //   if (state.data) {
      //     state.data.user = action.payload;
      //   }
      // })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        if (state.data) {
          state.data.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
