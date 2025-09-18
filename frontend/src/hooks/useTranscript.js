import { useDispatch, useSelector } from "react-redux";
import {
  uploadAudioThunk,
  fetchHistoryThunk,
  deleteHistoryThunk,
  clearHistoryThunk,
} from "../store/slice/transcriptSlice";
import { useEffect } from "react";

export const useTranscript = () => {
  const dispatch = useDispatch();
  const { history, loading, error, lastUploadedTranscript } = useSelector(
    (state) => state.transcript
  );

  useEffect(() => {
    dispatch(fetchHistoryThunk());
  }, [dispatch]);

  const uploadAudio = (file) => dispatch(uploadAudioThunk(file));
  const deleteHistory = (id) => dispatch(deleteHistoryThunk(id));
  const clearHistory = () => dispatch(clearHistoryThunk());
  const refreshHistory = () => dispatch(fetchHistoryThunk());

  return {
    history,
    loading,
    error,
    lastUploadedTranscript,
    uploadAudio,
    deleteHistory,
    clearHistory,
    refreshHistory,
  };
};
