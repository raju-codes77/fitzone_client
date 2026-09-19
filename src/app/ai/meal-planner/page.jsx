"use client";

import { useState } from "react";
import { FaUtensils, FaSpinner, FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AIMealPlanner() {
  const [country, setCountry] = useState("");
  const [duration, setDuration] = useState("3");
  const [calories, setCalories] = useState("2000");
  const [dietary, setDietary] = useState("None");
  const [budget, setBudget] = useState("Medium");
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const generatePlan = async () => {
    if (!country) {
      setError("Please select a country to get localized meal options.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token || localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      
      const response = await fetch(`${baseUrl}/ai/meal-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          requirements: { country, duration, calories, dietary, budget }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429 || response.status === 503 || data.code === "AI_QUOTA_EXCEEDED" || data.code === "AI_SERVICE_UNAVAILABLE") {
          throw new Error("QUOTA_EXCEEDED");
        }
        throw new Error(data.message || "Failed to generate plan");
      }
      
      if (data.plan?._id) {
        router.push(`/ai/meal-planner/${data.plan._id}`);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const countries = [
    "Bangladesh", "India", "Pakistan", "United States", "United Kingdom",
    "Canada", "Australia", "Japan", "South Korea", "Germany", "Brazil", "Mexico"
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-slate-100 min-h-[calc(100vh-100px)]">
      <div className="mb-10 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-4">
          <FaUtensils className="text-blue-400" /> AI Meal Planner
        </h1>
        <p className="text-slate-400 text-lg">Generate practical, country-aware meal plans based on your local cuisine and budget.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none"></div>
        
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
            <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2"><FaMapMarkerAlt /> Country</label>
            <select 
              value={country} onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-200"
            >
              <option value="">Select your country...</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2"><FaCalendarAlt /> Duration</label>
              <select 
                value={duration} onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-200"
              >
                <option value="3">3 Days</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2"><FaMoneyBillWave /> Budget</label>
              <select 
                value={budget} onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-200"
              >
                <option value="Low">Low / Affordable</option>
                <option value="Medium">Medium / Standard</option>
                <option value="High">High / Premium</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Daily Calories</label>
              <input 
                type="number" 
                value={calories} onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-200"
                placeholder="e.g. 2000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Dietary Preference</label>
              <select 
                value={dietary} onChange={(e) => setDietary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-200"
              >
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescatarian">Pescatarian</option>
                <option value="Halal">Halal</option>
                <option value="Keto">Keto</option>
              </select>
            </div>
          </div>

          <button
            onClick={generatePlan}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex justify-center items-center gap-2"
          >
            {loading ? <><FaSpinner className="animate-spin" /> Building your country-specific meal plan...</> : 'Generate Meal Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}
