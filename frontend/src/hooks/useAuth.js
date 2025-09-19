import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useCallback } from "react";
import {
  loginUser,
  signupUser,
  logoutUser,
  fetchCurrentUser,
  refreshUserSession,
} from "../store/slice/authSlice";

export const useAuth = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const initialized = useRef(false);

  // Fetch current user once on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // Function to refresh session (optional)
  const refresh = useCallback(async () => {
    try {
      await dispatch(refreshUserSession()).unwrap();
    } catch (err) {
      console.error("Failed to refresh session:", err);
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: useCallback((data) => dispatch(loginUser(data)), [dispatch]),
    signup: useCallback((data) => dispatch(signupUser(data)), [dispatch]),
    logout: useCallback(() => dispatch(logoutUser()), [dispatch]),
    fetchCurrentUser: useCallback(
      () => dispatch(fetchCurrentUser()),
      [dispatch]
    ),
    refresh,
  };
};
