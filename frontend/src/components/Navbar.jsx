import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

// Returns the current date/time (updates every 15 seconds – seconds are not shown)
function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Navbar({ onMenuClick }) {
  const now = useNow();
  const { user } = useAuth();

  const weekday = now.toLocaleDateString("en-IN", { weekday: "short" });
  const date = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const time = now
    .toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    .toUpperCase();

  const name = user?.name || "Admin Panel";
  const role = user?.role || "Administrator";
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 px-3 text-white shadow-[0_6px_20px_-8px_rgba(3,45,41,0.7)] sm:px-6 lg:left-52">
      {/* Menu button (mobile only) */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Right corner: date & time (text only) + admin */}
      <div className="ml-auto flex items-center gap-3 sm:gap-5">
        <div className="text-right leading-tight">
          <p className="text-xs font-medium text-white sm:text-sm">
            <span className="hidden sm:inline">{weekday}, </span>
            {date}
          </p>
          <p className="text-xs font-semibold text-wa sm:text-sm">{time}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-right leading-tight md:block">
            <span className="block text-sm font-medium">{name}</span>
            <span className="block text-xs text-emerald-100/80">{role}</span>
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wa to-brand-600 text-sm font-semibold text-brand-950 shadow-[0_0_14px_rgba(37,211,102,0.6)]">
            {initials}
          </span>
        </div>
      </div>
    </header>
  );
}
