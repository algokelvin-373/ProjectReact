"use client";

import { useState } from "react";
import DesktopWeb from "@/components/DesktopWeb";
import Navbar from "@/components/Navbar";
import VideoFeed from "@/components/VideoFeed";
import {
  videos,
  topickVideos,
  followingVideos,
  profileVideos,
} from "@/lib/videos";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const getVideos = () => {
    switch (activeTab) {
      case "topick":
        return topickVideos;
      case "following":
        return followingVideos;
      case "profile":
        return profileVideos;
      case "home":
        return videos;
      case "teman":
        return followingVideos;
      case "favorite":
        // No dedicated favorites store — fall back to topick as placeholder
        return topickVideos;
      default:
        return videos;
    }
  };

  return (
    <main className="bg-black min-h-dvh">
      {/* Desktop layout */}
      <div className="hidden lg:block">
        <DesktopWeb activeTab={activeTab} onTabChange={setActiveTab}>
          <VideoFeed key={activeTab} initialVideos={getVideos()} />
        </DesktopWeb>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <VideoFeed initialVideos={getVideos()} />
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </main>
  );
}
