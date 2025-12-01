"use client";

import usePage from "@/hooks/usePage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Heart,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CommentsPanel from "./CommentsPanel";

export default function VideoCard({ item }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState(item.comments);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [showHeart, setShowHeart] = useState(false);
  const lastTapRef = useRef(0);
  const singleTapTimeout = useRef(null);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const { inView, setNode } = usePage({ root: null, threshold: 0.75 });

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setPaused(false))
        .catch(() => setPaused(true));
    } else {
      el.pause();
      setPaused(true);
    }
  }, []);

  // Double-tap behaviour: on double-tap like (always like, like TikTok),
  // on single tap toggle play. This handles touch & mouse double click.
  const handleTap = useCallback(() => {
    const now = Date.now();
    const delta = now - lastTapRef.current;
    const DOUBLE_TAP_MS = 300;

    if (delta < DOUBLE_TAP_MS) {
      // double tap
      clearTimeout(singleTapTimeout.current);
      lastTapRef.current = 0;
      // animate heart and ensure liked
      if (!liked) {
        setLiked(true);
        setLikes((l) => l + 1);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    } else {
      // possible single tap -> wait to confirm not a double tap
      lastTapRef.current = now;
      singleTapTimeout.current = setTimeout(() => {
        togglePlay();
        lastTapRef.current = 0;
      }, DOUBLE_TAP_MS);
    }
  }, [liked, togglePlay]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }, []);

  const handleLike = useCallback(() => {
    setLiked((prev) => {
      const next = !prev;
      setLikes((l) => (next ? l + 1 : l - 1));
      return next;
    });
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Check this video",
      text: item.caption,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // ignored
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        // optional: toast could be added
      } catch {
        // ignored
      }
    }
  }, [item.caption]);

  useEffect(() => {
    setNode(containerRef.current);
  }, [setNode]);

  // Auto play/pause when card enters/leaves viewport
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    if (inView && !prefersReducedMotion) {
      const playPromise = el.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(() => setPaused(false)).catch(() => setPaused(true));
      } else {
        setPaused(el.paused);
      }
    } else {
      el.pause();
      setPaused(true);
    }
  }, [inView, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full grid place-items-center bg-black"
      aria-label={`Video by ${item.author}`}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-full w-full max-w-[min(92vw,430px)]">
            <div className="absolute inset-0 rounded-xl overflow-hidden bg-black/80">
              <video
                ref={videoRef}
                src={item.src}
                className="h-full w-full object-cover aspect-[9/16]"
                muted={muted}
                loop
                playsInline
                preload="metadata"
                aria-label={`Video content: ${item.caption}`}
                onClick={handleTap}
                onDoubleClick={(e) => {
                  // ensure desktop double click also triggers like animation
                  e.preventDefault();
                  if (!liked) {
                    setLiked(true);
                    setLikes((l) => l + 1);
                  }
                  setShowHeart(true);
                  setTimeout(() => setShowHeart(false), 800);
                }}
              />
              {/* Play overlay indicator */}
              {paused && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="bg-black/40 rounded-full p-4">
                    <Play className="h-10 w-10 text-white" />
                    <span className="sr-only">Tap to play</span>
                  </div>
                </div>
              )}

              {/* Double-tap heart animation */}
              {showHeart && (
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <div className="heart-pop">
                    <Heart className="h-24 w-24 text-white drop-shadow-lg" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom-left caption and music */}
            <div className="pointer-events-none absolute left-2 right-16 bottom-20 text-white space-y-2">
              <div className="font-semibold">{item.author}</div>
              <p className="text-sm opacity-90">{item.caption}</p>
              <div className="text-xs opacity-75">{`🎵 ${item.music}`}</div>
            </div>

            {/* Right action rail */}
            <div className="absolute right-2 bottom-24 flex flex-col items-center gap-4 text-white">
              <button
                onClick={handleLike}
                className={cn(
                  "grid place-items-center rounded-full p-3 transition-colors",
                  liked ? "bg-white/10" : "bg-white/10 hover:bg-white/20"
                )}
                aria-pressed={liked}
                aria-label="Like"
              >
                <Heart
                  className={cn(
                    "h-7 w-7",
                    liked ? "text-red-500 fill-red-500" : "text-white"
                  )}
                />
              </button>
              <div className="text-center text-xs opacity-90">{likes}</div>

              <button
                onClick={() => setIsCommentsOpen(true)}
                className="grid place-items-center rounded-full p-3 bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Comments"
              >
                <MessageCircle className="h-7 w-7 text-white" />
              </button>
              <CommentsPanel
                open={isCommentsOpen}
                onOpenChange={setIsCommentsOpen}
                videoId={item.id}
                onAdd={() => setCommentsCount((c) => c + 1)}
              />
              <div className="text-center text-xs opacity-90">
                {commentsCount}
              </div>

              <button
                onClick={handleShare}
                className="grid place-items-center rounded-full p-3 bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-7 w-7 text-white" />
              </button>
              <div className="text-center text-xs opacity-90">
                {item.shares}
              </div>

              <button
                onClick={toggleMute}
                className="grid place-items-center rounded-full p-3 bg-white/10 hover:bg-white/20 transition-colors mt-3"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <VolumeX className="h-7 w-7 text-white" />
                ) : (
                  <Volume2 className="h-7 w-7 text-white" />
                )}
              </button>
            </div>

            {/* Bottom gradient and safe zone */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent rounded-t-xl" />

            {/* Tap hint on mobile */}
            <div className="absolute bottom-6 left-4 text-white/80 text-xs">
              {"Swipe/scroll to navigate • Tap video to play/pause"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
