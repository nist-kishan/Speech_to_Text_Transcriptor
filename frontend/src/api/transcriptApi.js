import ApiClient from "./apiClient";

export const uploadAudio = async (file) => {
  const formData = new FormData();
  formData.append("audio", file);

  const response = await ApiClient.post("/transcripts/local-audio", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await ApiClient.get("/transcripts/history");
  return response.data;
};

export const deleteHistoryById = async (id) => {
  const response = await ApiClient.delete(`/transcripts/history/id/${id}`);
  return response.data;
};

export const clearHistory = async () => {
  const response = await ApiClient.delete("/transcripts/history/clear_history");
  return response.data;
};
