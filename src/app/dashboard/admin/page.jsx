// src/app/dashboard/admin/page.jsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { FaUsers, FaBookOpen, FaClipboardList, FaUserShield, FaArrowUp, FaChartLine } from "react-icons/fa";
// Import client-side charts dynamically or assume they handle client boundary internally
import { AdminCharts } from "./components/AdminCharts"; 
import { getClasses } from "@/lib/api/classes";
import { getUsers } from "@/lib/api/users";

export default async function AdminOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const usersData=await getUsers();
  const allClasses=await getClasses();

  const allUsers=usersData.filter(user=>user.role==="user");

  // Modern structured analytics data
  const stats = {
    totalUsers: { value: allUsers.length, change: "+12% this month", icon: FaUsers, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "hover:border-cyan-500/30" },
    totalClasses: { value: allClasses.length, change: "+4% this month", icon: FaBookOpen, color: "text-purple-400", bg: "bg-purple-500/10", border: "hover:border-purple-500/30" },
    totalBookedClasses: { value: "532", change: "+18% this month", icon: FaClipboardList, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "hover:border-emerald-500/30" },
  };

  return (
    <div className="min-h-screen bg-[#09090b] p-6 lg:p-10 text-zinc-100">
      
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-800/80 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Admin Overview
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Real-time platform metrics, user growth, and operational analytics.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Platform Feed
        </div>
      </div>

      {/* Grid for Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {Object.entries(stats).map(([key, item]) => {
          const Icon = item.icon;
          return (
            <div key={key} className={`group rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300 ${item.border}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                    {item.value}
                  </h2>
                </div>
                <div className={`rounded-xl ${item.bg} p-3.5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`text-xl ${item.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400">
                <FaArrowUp className="text-emerald-400" />
                <span className="text-emerald-400 font-medium">{item.change.split(' ')[0]}</span>
                <span>{item.change.replace(/^\+\d+%\s/, '')}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Component (Modular Client Component) */}
      <div className="mb-8">
        <AdminCharts users={allUsers} />
      </div>

      {/* Admin Profile & Overview Details */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          
          {/* Elegant Profile Avatar Container */}
          <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl border-2 border-zinc-700/50 bg-zinc-800 p-0.5 shadow-xl ring-4 ring-zinc-950">
            <Image
              src={user?.image || "/user.png"}
              alt="profile"
              fill
              className="rounded-2xl object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {user?.name || "System Administrator"}
              </h3>
              <span className="flex items-center gap-1.5 rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <FaUserShield className="text-[10px]" />
                Root Admin
              </span>
            </div>
            
            <p className="text-sm text-zinc-400 mt-1">
              {user?.email || "admin@platform.com"}
            </p>
            
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 max-w-3xl">
              Account authorized with sweeping cross-platform clearance. You maintain execution privileges across core modules including user registries, scheduled fitness matrices, transaction records, and localized community indexes.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}