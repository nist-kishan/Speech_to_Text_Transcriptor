import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 text-gray-400 text-center py-4 mt-10">
      <p>© {new Date().getFullYear()} Transcriptor. All rights reserved.</p>
    </footer>
  );
}
