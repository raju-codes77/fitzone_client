"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaDumbbell, FaCarrot, FaUtensils, FaRobot } from "react-icons/fa";

export default function AINav() {
  const pathname = usePathname();

  const navItems = [
    { name: "AI Home", href: "/ai", exact: true, icon: FaHome },
    { name: "Workout Planner", href: "/ai/workout", icon: FaDumbbell },
    { name: "Nutrition Planner", href: "/ai/nutrition", icon: FaCarrot },
    { name: "Meal Planner", href: "/ai/meal-planner", icon: FaUtensils },
    { name: "AI Coach", href: "/ai/coach", icon: FaRobot },
  ];

  return (
    <div className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
        <nav className="flex items-center gap-8 py-4 whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-semibold transition-all duration-200 border-b-2 pb-1 ${
                  isActive 
                    ? "text-emerald-400 border-emerald-400 shadow-[0_4px_15px_-3px_rgba(52,211,153,0.2)]" 
                    : "text-slate-400 border-transparent hover:text-slate-200"
                }`}
              >
                <Icon className={isActive ? "text-emerald-400" : "text-slate-600"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
