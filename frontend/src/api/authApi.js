import ApiClient from "./apiClient";

export const signup = async (data) => {
  const response = await ApiClient.post("/auth/signup", data);
  return response.data.data;
};

export const login = async (data) => {
  const response = await ApiClient.post("/auth/login", data);
  return response.data.data;
};

export const logout = async () => {
  const response = await ApiClient.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await ApiClient.get("/auth/me");
  return response.data.data;
};

export const refreshSession = async () => {
  const response = await ApiClient.get("/auth/refresh");
  return response.data;
};
