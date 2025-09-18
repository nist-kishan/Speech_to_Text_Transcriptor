import React from "react";

import { Link, useLocation } from "react-router-dom";

export default function NavLinks({ navLinks, onClick }) {
  const location = useLocation();

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-300 font-medium">
      {navLinks.map(({ to, label, icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onClick}
          className={`flex items-center gap-2 transition ${
            location.pathname === to
              ? "text-indigo-400 font-semibold"
              : "hover:text-indigo-400"
          }`}
        >
          {icon}
          {label}
        </Link>
      ))}
    </nav>
  );
}
