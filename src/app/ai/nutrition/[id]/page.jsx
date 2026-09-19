"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAIPlan, archiveAIPlan } from "@/lib/api/ai";
import { FaAppleAlt, FaSpinner, FaArrowLeft, FaArchive, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";

export default function NutritionPlanDetail() {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="p-10 text-center text-red-400">
        <FaExclamationCircle className="mx-auto text-4xl mb-4" />
        <p>{error || "Plan not found"}</p>
        <Link href="/ai/nutrition" className="mt-4 inline-block px-4 py-2 bg-slate-800 rounded-lg">Go Back</Link>
      </div>
    );
  }

  const pData = plan.planData || {};

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-slate-100 min-h-[calc(100vh-100px)]">
      <Link href="/ai/nutrition" className="text-slate-400 hover:text-teal-400 flex items-center gap-2 mb-6 font-medium transition-colors w-max">
        <FaArrowLeft /> Back to Generator
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">Daily Nutrition Target</h1>
            {plan.status === 'archived' && (
              <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-1 rounded">Archived</span>
            )}
            {plan.status === 'active' && (
              <span className="bg-teal-500/20 text-teal-400 text-xs font-bold px-2 py-1 rounded">Active</span>
            )}
          </div>
          <p className="text-slate-400 text-sm">Created on {new Date(plan.createdAt).toLocaleDateString()}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-slate-950 border-2 border-teal-500/30 px-6 py-3 rounded-2xl text-center shadow-[0_0_15px_rgba(20,184,166,0.1)]">
              <span className="block text-[10px] text-teal-400 font-bold uppercase tracking-widest mb-1">Calories</span>
              <span className="text-3xl font-black text-white">{pData.dailyTarget?.calories}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Protein</span>
              <span className="text-2xl font-bold text-slate-200">{pData.dailyTarget?.protein}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Carbs</span>
              <span className="text-2xl font-bold text-slate-200">{pData.dailyTarget?.carbs}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Fat</span>
              <span className="text-2xl font-bold text-slate-200">{pData.dailyTarget?.fat}</span>
            </div>
          </div>
        </div>

        {plan.status === 'active' && (
          <button 
            onClick={handleArchive}
            disabled={archiving}
            className="mt-6 md:mt-0 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold transition-colors text-slate-200 flex items-center gap-2 disabled:opacity-50"
          >
            {archiving ? <FaSpinner className="animate-spin" /> : <FaArchive />} Archive Plan
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {pData.meals?.map((meal, idx) => (
          <div key={idx} className="flex flex-col md:flex-row bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-teal-500/40 transition-colors shadow-lg group">
            <div className="bg-slate-800/40 p-6 md:w-1/4 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-teal-500/5 blur-[20px] rounded-full group-hover:bg-teal-500/10 transition-all pointer-events-none"></div>
              <h3 className="font-black text-xl text-white relative z-10">{meal.mealName}</h3>
              <div className="mt-3 text-sm text-slate-400 flex flex-col gap-2 relative z-10 font-medium">
                <span className="flex items-center gap-2"><span className="text-teal-400 text-lg">🔥</span> {meal.calories} kcal</span>
                <span className="flex items-center gap-2"><span className="text-teal-400 text-lg">⏱</span> {meal.prepTime} prep</span>
              </div>
            </div>
            <div className="p-6 md:w-3/4 flex flex-col justify-center space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Ingredients</h4>
                <p className="text-slate-200 text-sm leading-relaxed">{meal.ingredients}</p>
              </div>
              
              <div className="flex flex-wrap gap-3 text-xs border-t border-slate-800/50 pt-4">
                <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400">Protein: <strong className="text-white">{meal.protein}</strong></span>
                <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400">Carbs: <strong className="text-white">{meal.carbs}</strong></span>
                <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400">Fat: <strong className="text-white">{meal.fat}</strong></span>
              </div>

              {meal.instructions && (
                <div className="bg-slate-950/50 rounded-xl p-4 mt-2 border-l-2 border-teal-500/30 text-sm text-slate-400">
                  <span className="font-bold text-slate-300 block mb-1 text-[10px] uppercase tracking-widest">Instructions</span> 
                  {meal.instructions}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
