"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

import { MapPin, Phone, Mail, Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full text-white bg-black/90 border-t border-white/10 backdrop-blur-xl">

      {/* TOP GLOW LINE */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-lime-400/30 shadow-[0_0_20px_rgba(163,230,53,0.4)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lime-400">
            <Dumbbell className="w-6 h-6" />
            <span className="text-xl font-bold">FitZone</span>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Transform your body with world-class workouts and expert trainers.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="#" className="hover:text-lime-400 transition">Home</Link></li>
            <li><Link href="#" className="hover:text-lime-400 transition">Workouts</Link></li>
            <li><Link href="#" className="hover:text-lime-400 transition">Trainers</Link></li>
            <li><Link href="#" className="hover:text-lime-400 transition">Membership</Link></li>
            <li><Link href="#" className="hover:text-lime-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm text-zinc-400">

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-lime-400" />
              <span>Dhaka, Bangladesh</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-lime-400" />
              <span>+880 1234 567890</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-lime-400" />
              <span>support@fitzone.com</span>
            </div>

          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-3">

            {/* X */}
            <a
              href="#"
              className="group p-2 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:-translate-y-1"
            >
              <svg className="w-5 h-5 transition-colors duration-300 group-hover:text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-6.8 7.8L23 22h-6.6l-5.2-6.8L5 22H2l7.3-8.4L1 2h6.7l4.7 6.2L18.9 2zm-1.2 18h1.7L6.2 4H4.4l13.3 16z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="group p-2 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:-translate-y-1"
            >
              <svg className="w-5 h-5 transition-colors duration-300 group-hover:text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.7c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12H16l-.4 3h-2.6v7A10 10 0 0022 12z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="group p-2 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:-translate-y-1"
            >
              <svg className="w-5 h-5 transition-colors duration-300 group-hover:text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zm0 2A2.5 2.5 0 1114.5 12 2.5 2.5 0 0112 9.5zM17.8 6.2a1 1 0 11-1 1 1 1 0 011-1z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="group p-2 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:-translate-y-1"
            >
              <svg className="w-5 h-5 transition-colors duration-300 group-hover:text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 12s0-3.3-.4-4.8c-.3-1.2-1.3-2.2-2.5-2.5C18.6 4 12 4 12 4s-6.6 0-8.1.7C2.7 5 1.7 6 1.4 7.2 1 8.7 1 12 1 12s0 3.3.4 4.8c.3 1.2 1.3 2.2 2.5 2.5C5.4 20 12 20 12 20s6.6 0 8.1-.7c1.2-.3 2.2-1.3 2.5-2.5.4-1.5.4-4.8.4-4.8zM10 15V9l6 3-6 3z"/>
              </svg>
            </a>

          </div>

          <div className="mt-6">
            <Button className="bg-lime-400 text-black w-full font-bold hover:bg-lime-300 transition">
              Join Now
            </Button>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} FitZone. All rights reserved.
      </div>

    </footer>
  );
}