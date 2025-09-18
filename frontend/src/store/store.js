import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import transcriptReducer from "./slice/transcriptSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transcript: transcriptReducer,
  },
});

export default store;
