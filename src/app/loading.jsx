export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="relative flex justify-center items-center">
        <div className="absolute w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
      </div>
      
      <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse tracking-widest uppercase text-sm z-10 relative">
        Loading FitZone...
      </h2>
    </div>
  );
}