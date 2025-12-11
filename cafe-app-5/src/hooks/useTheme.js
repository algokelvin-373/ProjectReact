import { useEffect, useState } from "react";

const KEY = "twt_theme_pref_v1";

export const useTheme = (initial = null) => {
  const getInitial = () => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) return stored;
    } catch {}
    if (initial) return initial;
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState(() => getInitial());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, theme);
    } catch {}
    const el = document.documentElement;
    if (el) el.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle, setTheme };
};
