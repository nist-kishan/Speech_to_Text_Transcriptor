import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import TranscriptViewer from "../component/transcriptComponent/TranscriptViewer";
import ErrorMessage from "../component/transcriptComponent/ErrorMessage";
import TranscriptorHeader from "../component/transcriptComponent/TranscriptorHeader";
import AudioFileUploader from "../component/transcriptComponent/AudioFileUploader";

export default function Transcriptor() {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center p-4 sm:p-2 md:p-4 lg:p-10">
      <div
        ref={cardRef}
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-[90vh] mt-6 sm:mt-8 md:mt-10 lg:mt-12 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-700/40 p-4 sm:p-3 md:p-4 lg:p-6 space-y-4 sm:space-y-4 md:space-y-6"
      >
        <TranscriptorHeader />
        <AudioFileUploader />
        <ErrorMessage />
        <TranscriptViewer />
      </div>
    </div>
  );
}
