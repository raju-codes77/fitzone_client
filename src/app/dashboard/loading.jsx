export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-slate-950 text-slate-100">
      <div className="relative flex justify-center items-center">
        <div className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin relative z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
      </div>
      <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-pulse tracking-widest uppercase text-sm">
        Loading Workspace...
      </h2>
    </div>
  );
}