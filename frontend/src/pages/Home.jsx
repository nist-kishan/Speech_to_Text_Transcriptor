import React from "react";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import HeroImage from "../assets/HomePageImage.png";
import { useSelector } from "react-redux";

export default function Home() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    tl.fromTo(containerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
      .fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2 },
        "-=0.5"
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
        "-=0.3"
      )
      .fromTo(
        imgRef.current,
        { opacity: 0, x: 80, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1 },
        "-=0.8"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col md:flex-row  md:justify-between items-center justify-evenly px-8 md:px-20 sm:mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden"
    >
      <div ref={textRef} className="max-w-xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Transcribe <span className="text-indigo-500">Live</span> &{" "}
          <span className="text-indigo-400">Audio Files</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Convert live conversations and pre-recorded audio files into accurate,
          readable transcripts instantly. Perfect for meetings, interviews, and
          research.
        </p>

        {isAuthenticated && user ? (
          <p className="text-green-400 font-semibold">
            Welcome back, {user.name}!
          </p>
        ) : null}

        <div ref={btnRef}>
          <Link
            to="/audio"
            className="inline-block px-6 py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-12 md:mt-0 flex justify-center w-full md:w-1/2">
        <img
          ref={imgRef}
          src={HeroImage}
          alt="Audio Transcription Illustration"
          className="max-w-sm md:max-w-md drop-shadow-2xl sm:scale-[0.98] md:scale-[0.98] overflow-hidden"
        />
      </div>
    </div>
  );
}
