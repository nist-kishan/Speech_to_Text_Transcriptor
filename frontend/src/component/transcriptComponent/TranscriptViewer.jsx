import React, { useEffect, useState, useRef } from "react";
import { Waves } from "lucide-react";
import { useTranscript } from "../../hooks/useTranscript";
import gsap from "gsap";

export default function TranscriptViewer() {
  const { lastUploadedTranscript, clearTranscript } = useTranscript();
  const [animatedText, setAnimatedText] = useState("");
  const containerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const userScrolling = useRef(false);

  useEffect(() => {
    clearTranscript();
    setAnimatedText("");
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout;

    const handleScroll = () => {
      userScrolling.current = true; 
      setAutoScroll(false); 

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        userScrolling.current = false;
        const threshold = 20;
        const bottom =
          container.scrollHeight - container.scrollTop - container.clientHeight;
        setAutoScroll(bottom < threshold);
      }, 200);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!lastUploadedTranscript?.transcriptText) return;

    const text = lastUploadedTranscript.transcriptText;
    setAnimatedText("");

    const obj = { i: 0 };
    gsap.to(obj, {
      i: text.length,
      duration: text.length * 0.03,
      ease: "none",
      onUpdate: () => {
        setAnimatedText(text.slice(0, Math.floor(obj.i)));

        if (containerRef.current && autoScroll && !userScrolling.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      },
    });
  }, [lastUploadedTranscript, autoScroll]);

  if (!animatedText) return null;

  return (
    <div
      ref={containerRef}
      className="bg-gray-800/70 border border-gray-700/50 rounded-xl p-6 text-gray-200 text-base max-h-62 overflow-y-auto shadow-inner scrollbar-navy"
    >
        <div className="flex items-center gap-2 mb-3">
          <Waves className="h-5 w-5 text-indigo-400" />
          <strong className="text-indigo-400">Transcript:</strong>
        </div>
        <p className="whitespace-pre-wrap leading-relaxed font-mono tracking-wide">
          {animatedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>
  );
}
