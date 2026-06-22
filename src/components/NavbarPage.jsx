"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";

const NavbarPage = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  if(pathname.includes('dashboard')){
    return null;
  }

  const handleLogout = async () => {
    await authClient.signOut();
    toast.error("logout successful");
    router.push("/login")
  }

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "All Classes",
      href: "/classes",
    },
    {
      name: "Community",
      href: "/forum",
    },
    {
      name: "Trainers",
      href: "/trainers",
    },
  ];


  return (
    <nav className="sticky top-4 z-50 px-4">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-black/60 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <header className="flex h-20 items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <NextLink
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-lime-500/30 bg-white/5 p-1 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-lime-500/20">
              <Image
                src="/logo.png"
                alt="FitZone Logo"
                fill
                priority
                className="object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                FitZone
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em] text-lime-400">
                Train • Track • Transform
              </p>
            </div>
          </NextLink>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-2 lg:flex">
            {navLinks.map((item) => (
              <li key={item.href}>
                <NextLink
                  href={item.href}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${pathname === item.href
                    ? "bg-lime-500 text-black shadow-lg shadow-lime-500/30"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {item.name}
                </NextLink>
              </li>
            ))}
          </ul>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-100 transition hover:text-white active:scale-95"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-300 active:scale-95"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                {/* USER INFO */}
                <div className="flex items-center gap-3 rounded-full bg-white/5 px-3 py-2">
                  <Image
                    src={session.user.image || "/avatar.png"}
                    alt={session.user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full border border-lime-400/30 object-cover"
                  />

                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">
                      Hello, {session.user.name}
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-xs text-zinc-400">
                        {session.user.email}
                      </p>

                      {/* ROLE BADGE */}
                      <span className="rounded-full bg-lime-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-lime-400">
                        {session.user.role || "user"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ROLE BASED BUTTONS */}
                {session.user.role === "admin" && (
                  <Link
                    href="/dashboard/admin"
                    className="rounded-full bg-lime-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-400"
                  >
                    Dashboard
                  </Link>
                )}

                {session.user.role === "trainer" && (
                  <Link
                    href="/dashboard/trainer"
                    className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
                  >
                    Dashboard
                  </Link>
                )}

                {session.user.role === "user" && (
                  <Link
                    href="/dashboard/user"
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Dashboard
                  </Link>
                )}

                {/* LOGOUT */}
                <Button
                  variant="bordered"
                  className="border-red-500/20 active:scale-75 hover:bg-white/20 text-red-400"
                  onPress={handleLogout}
                >
                  Logout<IoIosLogOut />
                </Button>
              </>
            )}
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </header>


        {/* Mobile Menu */}
        <div
          className={`
    lg:hidden overflow-hidden
    transition-all duration-500 ease-in-out
    ${isMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
            }
  `}
        >
          <div className="border-t border-white/10 px-5 py-5">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${pathname === item.href
                    ? "bg-lime-500 text-black"
                    : "text-white hover:bg-white/5"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {!session?.user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-white transition hover:bg-white/10"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl bg-lime-400 px-4 py-3 text-center font-semibold text-black transition hover:bg-lime-300"
                  >
                    Join Now
                  </Link>
                </>
              ) : (
                <>
                  {/* USER CARD */}
                  <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                    <Image
                      src={session.user.image || "/default-avatar.png"}
                      alt={session.user.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full border border-lime-400/30 object-cover"
                    />

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {session.user.name}
                      </span>

                      <span className="text-xs text-zinc-400">
                        {session.user.email}
                      </span>

                      {/* 🔥 ROLE BADGE */}
                      <span className="mt-1 w-fit rounded-full bg-lime-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-lime-400">
                        {session.user.role || "user"}
                      </span>
                    </div>
                  </div>

                  {/* DASHBOARD (ROLE BASED) */}
                    {session.user.role === "admin" && (
                    <Link
                      href="/dashboard/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl bg-lime-500 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-lime-400"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  {session.user.role === "trainer" && (
                    <Link
                      href="/dashboard/trainer"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl bg-blue-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-400"
                    >
                      Trainer Panel
                    </Link>
                  )}

                  {session.user.role === "user" && (
                    <Link
                      href="/dashboard/user"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                      My Dashboard
                    </Link>
                  )}

                
                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-500/20 flex gap-1 justify-center items-center"
                  >
                    Logout<IoIosLogOut />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>

    </nav>
  );
};

export default NavbarPage;