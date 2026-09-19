"use client";

import Link from "next/link";
import { FaDumbbell, FaAppleAlt, FaRobot, FaCheckCircle, FaBolt } from "react-icons/fa";

export default function AIFeatureSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-950/50 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-emerald-900/50 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <FaBolt className="text-yellow-400" /> Introducing FitZone AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Train Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">FitZone AI</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            FitZone AI turns your fitness goals into personalized plans and guidance designed around your lifestyle. Train smarter, eat better, and stay consistent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* AI Workout */}
          <Link href="/ai/workout" className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors group block">
            <div className="w-14 h-14 bg-emerald-950/80 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl mb-6 shadow-inner border border-emerald-900/50 group-hover:scale-110 transition-transform">
              <FaDumbbell />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">AI Workout Planner</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Personalized workout routines based on your goals and equipment.
            </p>
          </Link>

          {/* AI Nutrition */}
          <Link href="/ai/nutrition" className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:border-teal-500/50 transition-colors group block">
            <div className="w-14 h-14 bg-teal-950/80 rounded-2xl flex items-center justify-center text-teal-400 text-2xl mb-6 shadow-inner border border-teal-900/50 group-hover:scale-110 transition-transform">
              <FaAppleAlt />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">AI Nutrition Planner</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Smart nutrition and macro goals tailored for you.
            </p>
          </Link>

          {/* AI Meal Planner */}
          <Link href="/ai/meal-planner" className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 transition-colors group block">
            <div className="w-14 h-14 bg-blue-950/80 rounded-2xl flex items-center justify-center text-blue-400 text-2xl mb-6 shadow-inner border border-blue-900/50 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">AI Meal Planner</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Country-specific meal plans that fit your budget and diet.
            </p>
          </Link>

          {/* AI Coach */}
          <Link href="/ai/coach" className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-colors group relative overflow-hidden block">
            <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-500 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl border-l border-b border-amber-500/20">PREMIUM</div>
            <div className="w-14 h-14 bg-indigo-950/80 rounded-2xl flex items-center justify-center text-indigo-400 text-2xl mb-6 shadow-inner border border-indigo-900/50 group-hover:scale-110 transition-transform">
              <FaRobot />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">AI Fitness Coach</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Your 24/7 AI assistant. Ask questions and get advice.
            </p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <Link href="/ai" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transform hover:-translate-y-1">
            Explore FitZone AI →
          </Link>
        </div>
      </div>
    </section>
  );
}
