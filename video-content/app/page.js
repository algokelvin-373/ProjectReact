import VideoFeed from "@/components/VideoFeed";
import { videos } from "@/lib/videos";

export const metadata = {
  title: "Video Feed - TikTok/Douyin Style",
  description:
    "Vertical short-video feed with snap scrolling and auto play/pause.",
};

export default function Home() {
  return (
    <main className="bg-black">
      <VideoFeed initialVideos={videos} />
    </main>
  );
}
