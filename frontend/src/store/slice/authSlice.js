import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signup,
  login,
  logout,
  getCurrentUser,
  refreshSession,
} from "../../api/authApi";

// Thunks
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await signup(data);
      return res.user;
    } catch (err) {
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
      return res.user;
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
      const res=await logout();
      return res;
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
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const refreshUserSession = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await refreshSession();
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Slice
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
      // signup
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
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // refresh session
      .addCase(refreshUserSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUserSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(refreshUserSession.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
