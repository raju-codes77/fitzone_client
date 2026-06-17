"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";

const NavbarPage = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Replace with your auth session
  const user = null;

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

              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
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
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
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
          <div className="hidden items-center gap-3 lg:flex">
            {!user ? (
              <>
                <Button
                  as={NextLink}
                  href="/login"
                  variant="bordered"
                  radius="full"
                  className="border-white/15 bg-white/5 text-white backdrop-blur-xl"
                >
                  Login
                </Button>

                <Button
                  as={NextLink}
                  href="/register"
                  radius="full"
                  className="bg-gradient-to-r from-lime-400 to-lime-500 font-bold text-black shadow-lg shadow-lime-500/30"
                >
                  Join Now
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden text-right xl:block">
                  <h4 className="text-sm font-semibold text-white">
                    John Doe
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Premium Member
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-lime-500/30 bg-lime-500 font-semibold text-black">
                  J
                </div>
              </div>
            )}

            {/* Mobile Toggle */}
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
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-white/10 px-5 py-5">
            <ul className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "bg-lime-500 text-black"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </NextLink>
                </li>
              ))}
            </ul>

            {!user && (
              <div className="mt-5 flex flex-col gap-3">
                <Button
                  as={NextLink}
                  href="/login"
                  variant="bordered"
                  className="border-white/15 bg-white/5 text-white"
                >
                  Login
                </Button>

                <Button
                  as={NextLink}
                  href="/register"
                  className="bg-gradient-to-r from-lime-400 to-lime-500 font-bold text-black"
                >
                  Join Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPage;