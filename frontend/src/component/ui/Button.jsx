import React from "react";

export default function Button({ type, loading, loadingValue, actualValue }) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? loadingValue : actualValue}
    </button>
  );
}
