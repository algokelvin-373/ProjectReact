"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import VideoCard from "./VideoCard";

export default function VideoFeed({ initialVideos }) {
  const items = useMemo(() => initialVideos, [initialVideos]);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = container.clientHeight;
      const index = Math.round(scrollTop / itemHeight);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToVideo = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const targetIndex = Math.max(0, Math.min(index, initialVideos.length - 1));
    container.scrollTo({
      top: targetIndex * container.clientHeight,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    scrollToVideo(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToVideo(currentIndex + 1);
  };

  return (
    <div className="relative">
      <section
        ref={containerRef}
        className="h-dvh w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {initialVideos.map((video) => (
          <article key={video.id} className="snap-start h-dvh w-full">
            <VideoCard item={video} />
          </article>
        ))}
      </section>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="grid place-items-center rounded-full p-3 bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Previous video"
        >
          <ChevronUp className="h-6 w-6 text-white" />
        </button>

        <div className="text-center text-white/70 text-xs font-medium">
          {currentIndex + 1}/{initialVideos.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === initialVideos.length - 1}
          className="grid place-items-center rounded-full p-3 bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Next video"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
