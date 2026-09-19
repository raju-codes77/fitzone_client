"use client";

import { useState } from "react";
import { FaDumbbell, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AIWorkoutPlanner() {
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [days, setDays] = useState("3");
  const [duration, setDuration] = useState("45");
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const generatePlan = async () => {
    if (!goal || !experience) {
      setError("Please select your primary goal and experience level.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token || localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      
      const response = await fetch(`${baseUrl}/ai/workout-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          requirements: { goal, experience, daysPerWeek: days, preferredDuration: duration + " min" }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429 || response.status === 503 || data.code === "AI_QUOTA_EXCEEDED" || data.code === "AI_SERVICE_UNAVAILABLE") {
          throw new Error("QUOTA_EXCEEDED");
        }
        throw new Error(data.message || "Failed to generate plan");
      }
      
      // Redirect to the persistent plan view
      if (data.plan?._id) {
        router.push(`/ai/workout/${data.plan._id}`);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-slate-100 min-h-[calc(100vh-100px)]">
      <div className="mb-10 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-4">
          <FaDumbbell className="text-emerald-400" /> AI Workout Planner
        </h1>
        <p className="text-slate-400 text-lg">Get a personalized weekly workout plan built around your goals, experience, schedule and equipment.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none"></div>
        {error === "QUOTA_EXCEEDED" ? (
          <div className="mb-6 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
            <div className="text-amber-400 font-bold flex items-center gap-2 text-lg">
              ✨ AI temporarily unavailable
            </div>
            <p className="text-amber-200/80 text-sm">
              FitZone AI is currently at its generation limit. Please try again shortly.
            </p>
            <button 
              onClick={generatePlan}
              className="mt-2 px-6 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-semibold rounded-lg transition-colors border border-amber-500/30 text-sm"
            >
              Try Again
            </button>
          </div>
        ) : error ? (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2">
            <FaExclamationCircle className="shrink-0" /> <span className="text-sm">{error}</span>
          </div>
        ) : null}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Primary Goal</label>
            <select 
              value={goal} onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-200"
            >
              <option value="">Select a goal...</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Strength">Strength & Power</option>
              <option value="Endurance">Endurance</option>
              <option value="General Fitness">General Fitness</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Experience Level</label>
            <select 
              value={experience} onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-200"
            >
              <option value="">Select level...</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Days per Week</label>
              <select 
                value={days} onChange={(e) => setDays(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-slate-200"
              >
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
                <option value="6">6 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Duration (min)</label>
              <select 
                value={duration} onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-slate-200"
              >
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
              </select>
            </div>
          </div>

          <button 
            onClick={generatePlan}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
            {loading ? "Building Your Plan..." : "Generate My Workout Plan →"}
          </button>
        </div>
      </div>
    </div>
  );
}
