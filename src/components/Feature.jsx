import React from "react";
import {
  PersonWorker,
  Layers,
  Clock,
  ChartLine,
} from "@gravity-ui/icons";

const featuresData = [
  {
    id: 1,
    title: "Expert Trainers",
    description: "Learn from certified professionals.",
    icon: PersonWorker,
  },
  {
    id: 2,
    title: "Diverse Classes",
    description: "From yoga to HIIT, we have it all.",
    icon: Layers,
  },
  {
    id: 3,
    title: "Flexible Schedule",
    description: "Book classes that fit your time.",
    icon: Clock,
  },
  {
    id: 4,
    title: "Track Progress",
    description: "Monitor your fitness journey easily.",
    icon: ChartLine,
  },
];

function FeatureCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="group relative rounded-2xl border border-zinc-800/60 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] p-6 transition-all duration-300 hover:border-lime-400/30 hover:shadow-[0_0_30px_-10px_rgba(163,230,53,0.25)]">
      
      {/* subtle glow accent */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.08),transparent_60%)]" />

      <div className="relative flex items-start gap-4">
        
        {/* ICON */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-inner group-hover:border-lime-400/40 transition">
          <Icon className="h-5 w-5 text-lime-400" />
        </div>

        {/* TEXT */}
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white tracking-tight">
            {item.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Feature() {
  return (
    <section className="w-full bg-black py-20 px-6 md:px-12 lg:px-24">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <p className="text-lime-400 text-sm font-medium tracking-wide uppercase">
          Why FitZone
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-2">
          Built for performance, designed for growth
        </h2>

        <p className="text-zinc-400 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
          Everything you need to train smarter, track progress, and stay consistent in your fitness journey.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {featuresData.map((item) => (
          <FeatureCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}