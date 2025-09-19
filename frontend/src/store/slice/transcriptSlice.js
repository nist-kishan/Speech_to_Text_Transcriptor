import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  uploadAudio,
  getHistory,
  deleteHistoryById,
  clearHistory,
} from "../../api/transcriptApi";

export const uploadAudioThunk = createAsyncThunk(
  "transcript/uploadAudio",
  async (file, thunkAPI) => {
    try {
      const res = await uploadAudio(file);
      console.log(res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Upload failed"
      );
    }
  }
);

export const fetchHistoryThunk = createAsyncThunk(
  "transcript/fetchHistory",
  async (_, thunkAPI) => {
    try {
      const res = await getHistory();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Fetch history failed"
      );
    }
  }
);

export const deleteHistoryThunk = createAsyncThunk(
  "transcript/deleteHistory",
  async (id, thunkAPI) => {
    try {
      const res = await deleteHistoryById(id);
      return { id, message: res.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Delete failed"
      );
    }
  }
);

export const clearHistoryThunk = createAsyncThunk(
  "transcript/clearHistory",
  async (_, thunkAPI) => {
    try {
      const res = await clearHistory();
      return res.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Clear history failed"
      );
    }
  }
);

const transcriptSlice = createSlice({
  name: "transcript",
  initialState: {
    history: [],
    loading: false,
    error: null,
    lastUploadedTranscript: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload Audio
      .addCase(uploadAudioThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAudioThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUploadedTranscript = action.payload;
        state.history.unshift(action.payload);
      })
      .addCase(uploadAudioThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch History
      .addCase(fetchHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete History
      .addCase(deleteHistoryThunk.fulfilled, (state, action) => {
        state.history = state.history.filter(
          (h) => h._id !== action.payload.id
        );
      })

      // Clear History
      .addCase(clearHistoryThunk.fulfilled, (state) => {
        state.history = [];
      });
  },
});

export default transcriptSlice.reducer;
