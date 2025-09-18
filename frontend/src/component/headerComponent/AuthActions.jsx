import React from "react";

import { Link } from "react-router-dom";
import { LogIn, LogOut, UserPlus, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slice/authSlice";

export default function AuthActions({ isMobile = false, onClose }) {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    if (isMobile) onClose?.();
  };

  const buttonBaseClasses =
    "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition";

  if (!isAuthenticated) {
    return (
      <div
        className={`flex ${
          isMobile ? "flex-col gap-3 mt-4" : "flex-row gap-4 items-center"
        }`}
      >
        <Link
          to="/login"
          onClick={() => isMobile && onClose?.()}
          className={`${buttonBaseClasses} bg-indigo-900 hover:bg-indigo-800 text-white cursor-pointer`}
        >
          <LogIn className="h-4 w-4" /> Login
        </Link>
        <Link
          to="/signup"
          onClick={() => isMobile && onClose?.()}
          className={`${buttonBaseClasses} bg-gray-800 hover:bg-gray-700 text-gray-200 cursor-pointer`}
        >
          <UserPlus className="h-4 w-4" /> Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-3 mt-4" : "flex-row gap-4 items-center"
      }`}
    >
      <Link
        to="#"
        onClick={() => isMobile && onClose?.()}
        className="flex items-center gap-2 text-gray-300 hover:text-indigo-300 transition"
      >
        <User className="h-5 w-5 text-indigo-400" />
        <span className="truncate max-w-xs">
          {user?.name ?? user?.email ?? "Profile"}
        </span>
      </Link>
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`${buttonBaseClasses} bg-indigo-900 hover:bg-indigo-800 text-white disabled:opacity-50 cursor-pointer`}
      >
        <LogOut className="h-4 w-4" />
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
