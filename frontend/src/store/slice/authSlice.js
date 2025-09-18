import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login, logout, getCurrentUser } from "../../api/authApi";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await signup(data);
      console.log(res);
      return res.user;
    } catch (err) {
      console.log(err.response?.data?.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Signup failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await login(data);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logout();
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const res = await getCurrentUser();
      console.log(res.data.data.user);
      return res.data.user;
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // me
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
