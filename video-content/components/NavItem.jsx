export function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? "bg-white/10" : "hover:bg-white/10"
      }`}
    >
      <span className="h-4 w-4">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
