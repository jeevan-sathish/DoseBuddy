import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        token: credential,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "login failed");
    }
  },
);

export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token_db");
      console.log(token);
      const response = await axios.get("http://localhost:8000/login/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed");
    }
  },
);

const initialState = {
  userInfo: null,
  access_token_db: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "profileHandle",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("access_token_db");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.access_token_db = action.payload.access_token_db;
        state.isAuthenticated = true;
        localStorage.setItem("access_token_db", action.payload.access_token_db);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = action.payload;
      });
  },
});
export const { handleLogout } = userSlice.actions;
export default userSlice.reducer;
