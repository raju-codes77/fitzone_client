"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, icon: Icon, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        group flex items-center gap-3
        rounded-xl px-4 py-3
        text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-zinc-800 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            : "text-zinc-300 hover:bg-zinc-900 hover:text-cyan-400"
        }
      `}
    >
      <Icon
        className={`text-lg ${
          isActive
            ? "text-cyan-400"
            : "text-zinc-500 group-hover:text-cyan-400"
        }`}
      />
      {label}
    </Link>
  );
}