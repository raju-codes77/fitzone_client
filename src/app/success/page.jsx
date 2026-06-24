"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Dumbbell } from "lucide-react"; // install via: npm i lucide-react

// Main page component wrapped in Suspense for Next.js App Router compliance
export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  );
}

// Separate component to handle search params safely
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 font-sans selection:bg-emerald-500 selection:text-slate-900  ">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none mt-5" />

      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative z-10">
        
        {/* Brand Logo / Icon Area */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="bg-emerald-500 p-2 rounded-xl text-slate-950">
            <Dumbbell className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xl font-black tracking-wider uppercase italic">
            FIT<span className="text-emerald-400">ZONE</span>
          </span>
        </div>

        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full mb-6 ring-8 ring-emerald-500/5">
          <CheckCircle className="w-10 h-10" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Welcome to the zone. Your subscription has been verified successfully. Let's crush those goals!
        </p>

        {/* Order/Session Info Box - Rendered only if sessionId exists */}
        {sessionId && (
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 mb-8 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Session ID
            </span>
            <code className="text-xs font-mono text-emerald-400/90 break-all select-all block bg-slate-900 px-2 py-1.5 rounded border border-slate-800">
              {sessionId}
            </code>
          </div>
        )}

        {/* Call to Actions using Next.js Link component */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center text-sm font-medium text-slate-400 hover:text-white py-3 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>

      </div>

      {/* Footer Note */}
     
    </div>
  );
}

// Fallback Loading Skeleton state for Suspense
function SuccessLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}