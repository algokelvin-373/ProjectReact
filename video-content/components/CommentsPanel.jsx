"use client";

import { useEffect, useMemo, useState } from "react";
import { Drawer } from "vaul";
import { addComment, getComments } from "@/lib/commentsStore";
import useIsDesktop from "@/hooks/useIsDekstop";

export default function CommentsPanel({
  open = false,
  onOpenChange = () => {},
  videoId = "",
  onAdd = () => {},
}) {
  const isDesktop = useIsDesktop();
  const [comments, setComments] = useState(() => getComments(videoId));
  const [text, setText] = useState("");

  useEffect(() => {
    if (open) {
      setComments(getComments(videoId));
    }
  }, [open, videoId]);

  const count = useMemo(() => comments.length, [comments]);

  function handleSubmit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    const updated = addComment(videoId, {
      id: String(Date.now()),
      user: "You",
      text: value,
      createdAt: new Date().toISOString(),
    });
    setComments(updated);
    setText("");
    onAdd();
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction={isDesktop ? "right" : "bottom"}
      snapPoints={isDesktop ? undefined : [0.9, 0.6, 0.3]}
      activeSnapPoint={isDesktop ? undefined : 0.9}
      dismissible
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Drawer.Content
          className={`z-50 bg-neutral-900 text-white ${
            isDesktop
              ? "fixed right-0 top-0 h-dvh w-[380px] shadow-xl"
              : "fixed left-0 right-0 bottom-0 h-[70vh] rounded-t-2xl shadow-2xl"
          }`}
        >
          {!isDesktop && (
            <div className="mx-auto my-2 h-1.5 w-12 rounded-full bg-white/20" />
          )}
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-sm font-semibold">Comments ({count})</h2>
              <button
                className="text-xs text-white/70 hover:text-white"
                onClick={() => onOpenChange(false)}
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {comments.length === 0 ? (
                <p className="text-sm text-white/60">
                  Be the first to comment.
                </p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-white/15 grid place-items-center text-xs">
                      {c.user?.slice(0, 1)?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">{c.user}</span>
                        <span className="text-white/50">
                          {new Date(c.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm leading-snug break-words mt-1">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-3 pb-4 pt-3 border-t border-white/10 bg-neutral-900"
            >
              <div className="flex items-center gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-full bg-white/10 placeholder:text-white/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white/20 hover:bg-white/30 px-3 py-2 text-sm"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
