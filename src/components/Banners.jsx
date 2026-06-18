"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";

import {
  Flame,
  ArrowRight,
  Play,
  Dumbbell,
  CheckCircle,
  Users,
  Activity,
  Trophy,
  Smile,
} from "lucide-react";

export default function Banners() {
  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden flex flex-col justify-between pt-24 pb-10 px-6 md:px-12 lg:px-24">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bannerbg.png"
          alt="Fitness Background"
          fill
          priority
          className="object-cover object-center scale-105"
        />

        {/* DARK + GLOW LAYERS */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black/30" />

        {/* GLOW EFFECT */}
        <div className="absolute -top-40 left-[-100px] w-[500px] h-[500px] bg-lime-400/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-lime-500/10 blur-[160px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto w-full">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col space-y-6 max-w-2xl">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full backdrop-blur-xl shadow-[0_0_25px_rgba(163,230,53,0.15)] hover:scale-105 transition">
            <Flame className="w-4 h-4" />
            Transform Your Body & Life
          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none drop-shadow-[0_0_20px_rgba(163,230,53,0.15)]">
            <span className="block">Stronger</span>
            <span className="block text-lime-400 drop-shadow-[0_0_30px_rgba(163,230,53,0.35)]">
              Every Day
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-zinc-300 text-sm md:text-base max-w-md leading-relaxed">
            Join FitZone and get access to world-class workouts, expert trainers,
            and a supportive fitness community built to push your limits.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              className="bg-lime-400 text-black font-bold px-8 py-6 rounded-xl hover:bg-lime-300 transition shadow-[0_0_25px_rgba(163,230,53,0.25)] hover:shadow-[0_0_40px_rgba(163,230,53,0.35)] hover:scale-[1.03]"
              endContent={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Journey
            </Button>

            <Button
              variant="bordered"
              className="border-zinc-500 text-white px-8 py-6 rounded-xl bg-white/5 backdrop-blur-xl hover:bg-white/10 transition hover:scale-[1.03]"
              startContent={<Play className="w-4 h-4" />}
            >
              Watch Intro
            </Button>
          </div>

          {/* MINI STATS */}
          <div className="grid grid-cols-3 gap-4 bg-black/40 border border-white/10 rounded-2xl p-5 mt-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.4)]">

            <div className="flex items-center gap-3 hover:scale-105 transition">
              <Dumbbell className="w-5 h-5 text-lime-400 drop-shadow" />
              <div>
                <div className="text-xl font-bold">1000+</div>
                <div className="text-xs text-zinc-400">Workouts</div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-zinc-800 pl-4 hover:scale-105 transition">
              <CheckCircle className="w-5 h-5 text-lime-400" />
              <div>
                <div className="text-xl font-bold">200+</div>
                <div className="text-xs text-zinc-400">Trainers</div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-zinc-800 pl-4 hover:scale-105 transition">
              <Users className="w-5 h-5 text-lime-400" />
              <div>
                <div className="text-xl font-bold">50K+</div>
                <div className="text-xs text-zinc-400">Members</div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SPACER */}
        <div className="lg:col-span-5 hidden lg:block" />
      </div>

      {/* BOTTOM STATS */}
      <div className="relative z-10 w-full bg-black/40 border border-white/10 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 p-6 mt-12 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">

        <div className="flex items-center gap-4 hover:scale-105 transition">
          <Flame className="w-6 h-6 text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
          <div>
            <div className="text-xl font-bold text-lime-400">2.5M+</div>
            <div className="text-xs text-zinc-400">Calories Burned</div>
          </div>
        </div>

        <div className="flex items-center gap-4 hover:scale-105 transition">
          <Activity className="w-6 h-6 text-lime-400" />
          <div>
            <div className="text-xl font-bold text-lime-400">1.2M+</div>
            <div className="text-xs text-zinc-400">Workouts</div>
          </div>
        </div>

        <div className="flex items-center gap-4 hover:scale-105 transition">
          <Trophy className="w-6 h-6 text-lime-400" />
          <div>
            <div className="text-xl font-bold text-lime-400">98K+</div>
            <div className="text-xs text-zinc-400">Goals</div>
          </div>
        </div>

        <div className="flex items-center gap-4 hover:scale-105 transition">
          <Smile className="w-6 h-6 text-lime-400" />
          <div>
            <div className="text-xl font-bold text-lime-400">45K+</div>
            <div className="text-xs text-zinc-400">Success Stories</div>
          </div>
        </div>

      </div>
    </section>
  );
}