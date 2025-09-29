"use client";

import { useEffect, useMemo } from "react";
import VideoCard from "./VideoCard";

const defaultVideos = [
  {
    id: "default-1",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    author: "@default",
    caption: "Welcome to your short-video feed",
    likes: 128,
    comments: 7,
    shares: 2,
    music: "Default Track - v0",
  },
];

export default function VideoFeed({ initialVideos }) {
  const items = useMemo(() => initialVideos, [initialVideos]);

  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, []);

  return (
    <section
      aria-label="Short video feed"
      className="h-dvh w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black"
    >
      {items.map((item) => (
        <article key={item.id} className="snap-start h-dvh w-full">
          <VideoCard item={item} />
        </article>
      ))}
    </section>
  );
}
