import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6 overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Fitness Grid Line (Optional but adds premium feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Badge */}
        <span className="px-3 py-1 text-xs font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          Out of Bounds
        </span>

        {/* Massive Number */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 mt-4 select-none">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mt-2 text-zinc-100">
          You've Stray'd From The Routine
        </h2>

        {/* Description */}
        <p className="text-zinc-400 mt-4 text-base leading-relaxed max-w-sm">
          The page you are looking for has been moved, deleted, or never existed in the FitZone catalog. Let's get you back to your workout.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Link
            href="/"
            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold uppercase tracking-wider text-sm rounded-md shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.5)] transition-all duration-300 text-center"
          >
            Back to Dashboard
          </Link>
          
          <Link
            href="/classes"
            className="px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-bold uppercase tracking-wider text-sm rounded-md transition-all duration-300 text-center"
          >
            Explore Classes
          </Link>
        </div>
      </div>
    </div>
  );
}