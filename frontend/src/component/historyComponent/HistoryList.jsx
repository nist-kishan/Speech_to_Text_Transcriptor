import React from "react";

import { useRef, useCallback, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HistoryCard from "./HistoryCard";
import { useTranscript } from "../../hooks/useTranscript";

gsap.registerPlugin(ScrollTrigger);

export default function HistoryList() {
  const { history, loading } = useTranscript();
  const containerRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: history.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 160, // slightly smaller for tighter layout
    overscan: 5,
  });

  const parentRef = useCallback((node) => {
    if (node) containerRef.current = node;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    gsap.utils.toArray(".history-card").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            scroller: containerRef.current,
          },
        }
      );
    });
  }, [history.length, rowVirtualizer]);

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 rounded-lg px-2 sm:px-4"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = history[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full p-2 sm:p-3"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <div className="history-card rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
                <HistoryCard
                  id={item._id}
                  transcript={item?.transcript?.transcriptText || ""}
                  timestamp={item.createdAt}
                />
              </div>
            </div>
          );
        })}
      </div>

      {!loading && history.length === 0 && (
        <div className="mt-6 text-gray-400 text-center text-sm italic">
          No History Available
        </div>
      )}
    </div>
  );
}
