"use client";

import {
  Home,
  Compass,
  Users,
  User,
  Smartphone,
  Search,
  Heart,
} from "lucide-react";
import { NavItem } from "./NavItem";

export default function DesktopWeb({ children, activeTab, onTabChange }) {
  return (
    <div className="min-h-dvh bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 hidden lg:block bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60 border-b border-white/10">
        <div className="mx-auto max-w-[1300px] px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="h-6 w-6 rounded bg-white grid place-items-center text-black">
              ♫
            </span>
            <span>Douyin Clone</span>
          </div>
          <div className="ml-auto w-full max-w-xl relative">
            <input
              aria-label="Search"
              placeholder="Search"
              className="w-full rounded-full bg-white/10 px-10 py-2 text-sm placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1300px] px-6">
        <div className="hidden lg:grid grid-cols-[220px_minmax(0,1fr)] gap-6 py-6">
          {/* Left rail */}
          <aside className="sticky top-[68px] h-[calc(100dvh-68px)] bg-neutral-900/50 border border-white/10 rounded-xl p-3">
            <nav className="flex flex-col gap-1">
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white/10">
                <Smartphone className="h-4 w-4" />
                <span>Get App</span>
              </div>
              <div className="h-px my-2 bg-white/10" />

              <NavItem
                icon={<Home />}
                label="Home"
                active={activeTab === "home"}
                onClick={() => onTabChange("home")}
              />
              <NavItem
                icon={<Users />}
                label="Teman"
                active={activeTab === "teman"}
                onClick={() => onTabChange("teman")}
              />
              <NavItem
                icon={<Heart />}
                label="Favorite"
                active={activeTab === "favorite"}
                onClick={() => onTabChange("favorite")}
              />
              <div className="h-px my-2 bg-white/10" />
              <NavItem
                icon={<User />}
                label="Profile"
                active={activeTab === "profile"}
                onClick={() => onTabChange("profile")}
              />
            </nav>
            <div className="mt-auto text-[11px] text-white/50 px-2 pt-6">
              {"© " + new Date().getFullYear() + " Demo"}
            </div>
          </aside>

          {/* Content */}
          <main className="min-h-[80dvh]">
            <div className="grid place-items-center">
              <div className="w-full max-w-[720px]">{children}</div>
            </div>
          </main>
        </div>

        {/* Mobile fallback renders children directly */}
        <div className="lg:hidden">{children}</div>
      </div>
    </div>
  );
}
