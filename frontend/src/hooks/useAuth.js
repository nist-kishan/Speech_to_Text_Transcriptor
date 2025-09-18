import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  signupUser,
  logoutUser,
  fetchCurrentUser,
} from "../store/slice/authSlice";
import { useEffect, useRef } from "react";

export const useAuth = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!user && !initialized.current) {
      initialized.current = true;
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: (data) => dispatch(loginUser(data)),
    signup: (data) => dispatch(signupUser(data)),
    logout: () => dispatch(logoutUser()),
  };
};
