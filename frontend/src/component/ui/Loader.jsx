import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    </div>
  );
}
