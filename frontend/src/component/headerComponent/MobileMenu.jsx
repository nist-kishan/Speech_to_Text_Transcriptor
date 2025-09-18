import React from "react";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import NavLinks from "./NavLinks";
import AuthActions from "./AuthActions";

export default function MobileMenu({ menuOpen, setMenuOpen, navLinks }) {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return;

    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-700 shadow-xl p-6 flex flex-col gap-6 md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <NavLinks navLinks={navLinks} onClick={() => setMenuOpen(false)} />

        <div className="mt-auto flex flex-col gap-4">
          <AuthActions isMobile={true} onClose={() => setMenuOpen(false)} />
        </div>
      </div>
    </>
  );
}
