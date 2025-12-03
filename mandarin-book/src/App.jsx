import { Sun, Moon } from "lucide-react";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div data-theme={theme} className="min-h-screen app-bg flex items-center justify-center transition-colors">
      <div className="w-full max-w-md p-6">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Tailwind Demo</h2>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-md card-bg shadow-sm transition-colors"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        <main className="card-bg text-primary p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold accent-text">✅ Tailwind Berhasil!</h1>
          <p className="mt-2 text-muted">
            Jika kamu melihat ini, Tailwind bekerja dan tema sedang aktif: <strong className="text-primary">{theme}</strong>
          </p>
        </main>
      </div>
    </div>
  );
}
