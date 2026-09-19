"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAIPlan, archiveAIPlan } from "@/lib/api/ai";
import { FaDumbbell, FaSpinner, FaArrowLeft, FaArchive, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";

export default function WorkoutPlanDetail() {
  const params = useParams();
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [archiving, setArchiving] = useState(false);

  useEffect(() => {
    if (params.id) {
      getAIPlan(params.id)
        .then(data => {
          if (data.success) {
            setPlan(data.plan);
          } else {
            setError(data.message || "Failed to load plan");
          }
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  const handleArchive = async () => {
    setArchiving(true);
    try {
      await archiveAIPlan(params.id);
      router.push("/ai/history");
    } catch (err) {
      console.error("Failed to archive:", err);
      setArchiving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="p-10 text-center text-red-400">
        <FaExclamationCircle className="mx-auto text-4xl mb-4" />
        <p>{error || "Plan not found"}</p>
        <Link href="/ai/workout" className="mt-4 inline-block px-4 py-2 bg-slate-800 rounded-lg">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-slate-100 min-h-[calc(100vh-100px)]">
      <Link href="/ai/workout" className="text-slate-400 hover:text-emerald-400 flex items-center gap-2 mb-6 font-medium transition-colors w-max">
        <FaArrowLeft /> Back to Generator
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">Weekly AI Workout Plan</h1>
            {plan.status === 'archived' && (
              <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-1 rounded">Archived</span>
            )}
            {plan.status === 'active' && (
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">Active</span>
            )}
          </div>
          <p className="text-slate-400 text-sm">
            Goal: <strong className="text-emerald-400">{plan.planData?.goal}</strong> • Created on {new Date(plan.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        {plan.status === 'active' && (
          <button 
            onClick={handleArchive}
            disabled={archiving}
            className="mt-4 md:mt-0 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold transition-colors text-slate-200 flex items-center gap-2 disabled:opacity-50"
          >
            {archiving ? <FaSpinner className="animate-spin" /> : <FaArchive />} Archive Plan
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.planData?.weeklyPlan?.map((dayPlan, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-emerald-500/40 transition-colors group">
            <div className="bg-slate-800/40 p-5 border-b border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[20px] rounded-full group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
              <div className="flex justify-between items-center mb-2 relative z-10">
                <span className="text-emerald-400 font-black uppercase tracking-widest text-[10px] bg-emerald-950/50 px-2 py-1 rounded-md border border-emerald-900/30">{dayPlan.day}</span>
                <span className="text-slate-400 text-xs font-medium flex items-center gap-1"><FaDumbbell className="text-[10px]"/> {dayPlan.duration}</span>
              </div>
              <h3 className="font-bold text-lg text-white relative z-10 mt-3">{dayPlan.workoutName}</h3>
              <p className="text-slate-400 text-xs mt-1 relative z-10">Target: <span className="text-slate-300">{dayPlan.targetMuscle}</span></p>
            </div>
            <div className="p-5 space-y-5 bg-slate-900/80">
              {dayPlan.exercises?.map((ex, exIdx) => (
                <div key={exIdx} className="border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-bold text-sm text-slate-200 mb-2">{ex.name}</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-950 rounded-lg p-2 text-center border border-slate-800/50">
                      <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Sets</span>
                      <span className="text-white text-sm font-semibold">{ex.sets}</span>
                    </div>
                    <div className="bg-slate-950 rounded-lg p-2 text-center border border-slate-800/50">
                      <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Reps</span>
                      <span className="text-white text-sm font-semibold">{ex.reps}</span>
                    </div>
                    <div className="bg-slate-950 rounded-lg p-2 text-center border border-slate-800/50">
                      <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Rest</span>
                      <span className="text-emerald-400 text-sm font-semibold">{ex.restTime}</span>
                    </div>
                  </div>
                  {ex.instructions && (
                    <p className="text-xs text-slate-500 mt-3 bg-slate-950/50 p-2.5 rounded-lg border-l-2 border-emerald-500/30">{ex.instructions}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
