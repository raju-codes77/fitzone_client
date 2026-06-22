import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardNavbar() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="flex  items-center justify-between border-b border-zinc-800 bg-black px-6 py-4">

      {/* Left Side */}
      <div>
        <h2 className="text-2xl font-bold capitalize text-white">
          {user?.role} Dashboard
        </h2>

        <p className="mt-1 text-sm text-lime-400">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Right Side */}
      <Link
        href="/"
        className="
          flex items-center gap-2
          rounded-xl border border-zinc-700
          bg-zinc-900 px-4 py-2
          text-sm font-medium text-zinc-300
          transition-all duration-200

          hover:border-cyan-500/40
          hover:bg-zinc-800
          hover:text-cyan-400
        "
      >
        <FaArrowLeft />
        Back to Site
      </Link>
    </div>
  );
}