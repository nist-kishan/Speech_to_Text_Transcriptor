import React from "react";

import { useEffect, useRef, useState } from "react";
import { Waves } from "lucide-react";
import gsap from "gsap";
import { useTranscript } from "../../hooks/useTranscript";

export default function TranscriptViewer() {
  const { lastUploadedTranscript,clearTranscript } = useTranscript();
  const [animatedText, setAnimatedText] = useState("");
  const [finishedTranscripts, setFinishedTranscripts] = useState(new Set());
  const audioref = useRef(null);

  useEffect(() => {
    clearTranscript();
    setAnimatedText("");
    setFinishedTranscripts(new Set());
  }, []);

  useEffect(() => {
    if (!lastUploadedTranscript?.transcriptText) return;

    const transcriptId = lastUploadedTranscript.id;

    if (finishedTranscripts.has(transcriptId)) {
      setAnimatedText(lastUploadedTranscript.transcriptText);
      return;
    }

    const text = lastUploadedTranscript.transcriptText;
    setAnimatedText("");
    let index = 0;

    const step = () => {
      if (index < text.length) {
        setAnimatedText((prev) => prev + text[index]);
        index++;
        requestAnimationFrame(step);
      } else if (audioref.current) {
        gsap.fromTo(
          audioref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
        setFinishedTranscripts((prev) => new Set(prev).add(transcriptId));
      }
    };

    requestAnimationFrame(step);
  }, [lastUploadedTranscript, finishedTranscripts]);

  if (!animatedText) return null;

  return (
    <div
      ref={audioref}
      className="bg-gray-800/70 border border-gray-700/50 rounded-xl p-6 text-gray-200 text-base max-h-72 overflow-y-auto shadow-inner scrollbar-navy"
    >
      <div className="flex items-center gap-2 mb-3">
        <Waves className="h-5 w-5 text-indigo-400" />
        <strong className="text-indigo-400">Transcript:</strong>
      </div>
      <p className="whitespace-pre-wrap leading-relaxed">{animatedText}</p>
    </div>
  );
}
