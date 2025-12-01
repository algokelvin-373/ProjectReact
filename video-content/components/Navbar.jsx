"use client";

import { Home, Users, Heart, User } from "lucide-react";

export default function Navbar({ activeTab, onTabChange }) {
  const items = [
    { key: "home", label: "Home", icon: <Home /> },
    { key: "teman", label: "Teman", icon: <Users /> },
    { key: "favorite", label: "Favorite", icon: <Heart /> },
    { key: "profile", label: "Profile", icon: <User /> },
  ];

  return (
    <nav>
      {/* Mobile: fixed bottom bar */}
      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-40 bg-neutral-900/70 backdrop-blur border-t border-white/10">
        <div className="mx-auto max-w-[720px] px-4 py-2 flex items-center justify-between">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onTabChange?.(it.key)}
              className={`flex flex-col items-center gap-1 px-2 py-1 text-xs text-white/80 transition-colors ${
                activeTab === it.key ? "text-white" : "hover:text-white"
              }`}
              aria-pressed={activeTab === it.key}
            >
              <span className="h-5 w-5">{it.icon}</span>
              <span className="text-[11px]">{it.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: hidden on small screens, render nothing here (DesktopWeb has its own rail) */}
    </nav>
  );
}
