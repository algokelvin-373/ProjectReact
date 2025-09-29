import DesktopWeb from "@/components/DesktopWeb";
import VideoFeed from "@/components/VideoFeed";
import { videos } from "@/lib/videos";

export const metadata = {
  title: "Video Feed - TikTok/Douyin Style",
  description:
    "Vertical short-video feed with snap scrolling and auto play/pause.",
};

export default function Home() {
  return (
    <main className="bg-black min-h-dvh">
      {/* Desktop layout */}
      <div className="hidden lg:block">
        <DesktopWeb>
          <VideoFeed initialVideos={videos} />
        </DesktopWeb>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <VideoFeed initialVideos={videos} />
      </div>
    </main>
  );
}
