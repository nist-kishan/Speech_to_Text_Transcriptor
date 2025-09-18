import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mic, Home, FileAudio, History } from "lucide-react";
import NavLinks from "./headerComponent/NavLinks";
import AuthActions from "./headerComponent/AuthActions";
import MobileMenu from "./headerComponent/MobileMenu"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      to: "/audio",
      label: "Audio",
      icon: <FileAudio className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      to: "/live",
      label: "Speech",
      icon: <Mic className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      to: "/history",
      label: "History",
      icon: <History className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
  ];

  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-lg z-50 fixed top-0 left-0 right-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-indigo-500 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold flex items-center gap-2"
        >
          <Mic className="h-5 sm:h-6 md:h-7 lg:h-8 w-5 sm:w-6 md:w-7 lg:w-8 text-indigo-400" />
          <span className="truncate">Transcriptor</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavLinks
            navLinks={navLinks}
            fontSize="text-xs sm:text-sm md:text-base lg:text-lg"
          />
        </div>

        {/* Auth + Mobile menu toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex">
            <AuthActions fontSize="text-xs sm:text-sm md:text-base lg:text-lg" />
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden text-gray-300 hover:text-indigo-400 transition z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7" />
            ) : (
              <Menu className="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navLinks={navLinks}
        fontSize="text-sm sm:text-base"
      />
    </header>
  );
}
