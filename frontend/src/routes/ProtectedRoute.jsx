import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../component/ui/Loader";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loadingUser } = useAuth();

  if (loadingUser) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
