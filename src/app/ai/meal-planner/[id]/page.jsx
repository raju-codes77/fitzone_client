"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAIPlan, archiveAIPlan } from "@/lib/api/ai";
import { FaUtensils, FaSpinner, FaArrowLeft, FaArchive, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function MealPlanDetail() {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="p-10 text-center text-red-400">
        <FaExclamationCircle className="mx-auto text-4xl mb-4" />
        <p>{error || "Plan not found"}</p>
        <Link href="/ai/meal-planner" className="mt-4 inline-block px-4 py-2 bg-slate-800 rounded-lg">Go Back</Link>
      </div>
    );
  }

  const pData = plan.planData || {};

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-slate-100 min-h-[calc(100vh-100px)]">
      <Link href="/ai/meal-planner" className="text-slate-400 hover:text-blue-400 flex items-center gap-2 mb-6 font-medium transition-colors w-max">
        <FaArrowLeft /> Back to Generator
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
              <FaCheckCircle className="text-blue-400"/> {pData.days?.length}-Day Meal Plan
            </h1>
            {plan.status === 'archived' && (
              <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-1 rounded">Archived</span>
            )}
            {plan.status === 'active' && (
              <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded">Active</span>
            )}
          </div>
          <p className="text-slate-400 text-sm">
            Created on {new Date(plan.createdAt).toLocaleDateString()} | ~{pData.currencySymbol}{pData.estimatedCost} {pData.currencyCode}
          </p>
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

      <div className="grid grid-cols-1 gap-6">
        {pData.days?.map((day, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 text-blue-400">Day {day.dayNumber}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {day.meals?.map((meal, mIdx) => (
                <div key={mIdx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {meal.mealCategory || "Meal"}
                    </span>
                    <span className="text-slate-400 text-sm">{meal.prepTime || "N/A"}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">{meal.mealName || "Custom Meal"}</h4>
                  
                  <div className="flex gap-3 mb-4 text-xs">
                    <span className="text-orange-300 bg-orange-500/10 px-2 py-1 rounded">{meal.calories || "--"} kcal</span>
                    <span className="text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">P: {meal.protein || "--"}</span>
                    <span className="text-purple-300 bg-purple-500/10 px-2 py-1 rounded">C: {meal.carbs || "--"}</span>
                    <span className="text-rose-300 bg-rose-500/10 px-2 py-1 rounded">F: {meal.fat || "--"}</span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-slate-300 block mb-1">Ingredients:</strong>
                      <p className="text-slate-400">{meal.ingredients || "Not specified"}</p>
                    </div>
                    <div>
                      <strong className="text-slate-300 block mb-1">Instructions:</strong>
                      <p className="text-slate-400 leading-relaxed">{meal.instructions || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
