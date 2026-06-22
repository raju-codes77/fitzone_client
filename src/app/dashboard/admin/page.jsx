// src/app/dashboard/admin/page.jsx

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

import {
  FaUsers,
  FaBookOpen,
  FaClipboardList,
  FaUserShield,
} from "react-icons/fa";

export default async function AdminOverviewPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // dummy stats
  const stats = {
    totalUsers: 1240,
    totalClasses: 86,
    totalBookedClasses: 532,
  };

  return (
    <div className="min-h-screen bg-black p-4">

      {/* Header */}
      <div className="mb-5">

        <h1 className="text-2xl font-bold text-white">
          Admin Overview
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Monitor your platform activities and statistics
        </p>

      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {/* Total Users */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-cyan-500/30">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-400">
                Total Users
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                {stats.totalUsers}
              </h2>

            </div>

            <div className="rounded-lg bg-cyan-500/10 p-3">

              <FaUsers className="text-xl text-cyan-400" />

            </div>

          </div>

        </div>

        {/* Total Classes */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-purple-500/30">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-400">
                Total Classes
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                {stats.totalClasses}
              </h2>

            </div>

            <div className="rounded-lg bg-purple-500/10 p-3">

              <FaBookOpen className="text-xl text-purple-400" />

            </div>

          </div>

        </div>

        {/* Total Booked Classes */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-emerald-500/30">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-400">
                Total Booked Classes
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                {stats.totalBookedClasses}
              </h2>

            </div>

            <div className="rounded-lg bg-emerald-500/10 p-3">

              <FaClipboardList className="text-xl text-emerald-400" />

            </div>

          </div>

        </div>

      </div>

      {/* Analytics */}
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">

        <h2 className="mb-4 text-lg font-semibold text-white">
          Platform Analytics
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-lg bg-zinc-800 p-4 text-center">

            <h3 className="text-2xl font-bold text-cyan-400">
              {stats.totalUsers}
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              Users
            </p>

          </div>

          <div className="rounded-lg bg-zinc-800 p-4 text-center">

            <h3 className="text-2xl font-bold text-purple-400">
              {stats.totalClasses}
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              Classes
            </p>

          </div>

          <div className="rounded-lg bg-zinc-800 p-4 text-center">

            <h3 className="text-2xl font-bold text-emerald-400">
              {stats.totalBookedClasses}
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              Bookings
            </p>

          </div>

        </div>

      </div>

      {/* Admin Profile */}
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">

        <h2 className="mb-4 text-lg font-semibold text-white">
          Admin Profile
        </h2>

        <div className="flex flex-col gap-5 md:flex-row md:items-center">

          {/* Profile Image */}
          <div className="overflow-hidden rounded-xl border border-zinc-800">

            <Image
              src={user?.image || "/user.png"}
              alt="profile"
              width={90}
              height={90}
              className="h-[90px] w-[90px] object-cover"
            />

          </div>

          {/* Profile Info */}
          <div className="flex-1">

            <div className="mb-3 flex items-center gap-3">

              <h3 className="text-xl font-bold text-white">
                {user?.name}
              </h3>

              <span className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">

                <FaUserShield />

                Admin

              </span>

            </div>

            <p className="text-sm text-zinc-400">
              {user?.email}
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              You have full platform access and control over users,
              trainers, classes, bookings and forum moderation.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}