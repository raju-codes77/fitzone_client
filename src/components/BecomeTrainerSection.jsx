// app/page.jsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Users, Trophy } from "lucide-react"; // npm i lucide-react

export default function BecomeTrainerSection() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-20 lg:py-24 text-zinc-100">
      <section className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Card 1: Become Trainer */}
          <div className="group relative overflow-hidden rounded-[32px] border border-zinc-800/80 bg-zinc-900/30 p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md transition-all duration-500 hover:border-lime-500/30 hover:shadow-2xl hover:shadow-lime-500/[0.02]">
            
            {/* Ambient Backlight */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-500/10 blur-3xl pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100" />

            {/* Content Left */}
            <div className="relative z-10 max-w-xs flex-1 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-lime-500/20 bg-lime-500/10 text-[11px] font-semibold uppercase tracking-wider text-lime-400 mb-5">
                  <Trophy className="w-3 h-3" />
                  FitZone Elite
                </div>
                
                <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">
                  Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">Trainer</span>
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Share your expertise, curate personalized training modules, and lead athletes to success across our global network.
                </p>
              </div>

              <Link 
                href="/apply/trainer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-300 hover:to-lime-200 text-zinc-950 font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-lime-500/10 active:scale-[0.98]"
              >
                Apply Credentials
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Image Right Canvas */}
            <div className="relative w-56 h-56 flex-shrink-0 mt-4 sm:mt-0">
              <div className="absolute inset-0 bg-zinc-950/40 rounded-2xl border border-zinc-800/60 scale-95 group-hover:scale-100 transition-transform duration-500" />
              <Image
                src="/trainer.png"
                alt="FitZone Coach Profile"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Card 2: Join Community */}
          <div className="group relative overflow-hidden rounded-[32px] border border-zinc-800/80 bg-zinc-900/30 p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl">
            
            {/* Ambient Backlight */}
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-zinc-800/20 blur-3xl pointer-events-none" />

            {/* Content Left */}
            <div className="relative z-10 max-w-xs flex-1 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-5">
                  <Users className="w-3 h-3" />
                  Global Network
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">
                  Join Our <span className="text-zinc-400 font-medium">Collective</span>
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Connect, share system configurations, discuss performance, and scale alongside fitness professionals globally.
                </p>
              </div>

              <Link 
                href="/community"
                className="inline-flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700/50 font-bold px-6 py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98]"
              >
                Launch Community
              </Link>
            </div>

            {/* Image Right Canvas */}
            <div className="relative w-56 h-56 flex-shrink-0 mt-4 sm:mt-0">
              <div className="absolute inset-0 bg-zinc-950/40 rounded-2xl border border-zinc-800/60 scale-95 group-hover:scale-100 transition-transform duration-500" />
              <Image
                src="/community.png"
                alt="FitZone Ecosystem Dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}