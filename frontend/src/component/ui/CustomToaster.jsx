import React from "react";

import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #3b82f6",
          padding: "14px 20px",
          borderRadius: "0.875rem",
          fontSize: "0.95rem",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
        },
        success: {
          style: {
            background: "linear-gradient(90deg, #0f172a, #1e3a8a)",
            border: "1px solid #3b82f6",
            color: "#f1f5f9",
          },
          iconTheme: {
            primary: "#3b82f6",
            secondary: "#f1f5f9",
          },
        },
        error: {
          style: {
            background: "linear-gradient(90deg, #1f1f2e, #7f1d1d)",
            border: "1px solid #ef4444",
            color: "#f1f5f9",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#f1f5f9",
          },
        },
        loading: {
          style: {
            background: "#1e293b",
            border: "1px solid #3b82f6",
            color: "#f1f5f9",
          },
        },
      }}
    />
  );
}
