"use client";

import { useEffect, useState } from "react";
import { getAIHistory } from "@/lib/api/ai";
import { FaHistory, FaDumbbell, FaAppleAlt, FaUtensils, FaSpinner, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function AIHistoryHub() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    getAIHistory(filter)
      .then(data => {
        if (data.success) {
          setHistory(data.history);
        }
      })
      .catch(err => console.error("Error fetching history:", err))
      .finally(() => setLoading(false));
  }, [filter]);

  const getIcon = (type) => {
    switch(type) {
      case 'workout': return <FaDumbbell className="text-emerald-400" />;
      case 'nutrition': return <FaAppleAlt className="text-teal-400" />;
      case 'meal': return <FaUtensils className="text-blue-400" />;
      default: return null;
    }
  };

  const getLink = (type, id) => {
    switch(type) {
      case 'workout': return `/ai/workout/${id}`;
      case 'nutrition': return `/ai/nutrition/${id}`;
      case 'meal': return `/ai/meal-planner/${id}`;
      default: return "#";
    }
  };

  const getTitle = (item) => {
    switch(item.type) {
      case 'workout': return item.planData?.goal ? `${item.planData.goal} Workout` : 'Workout Plan';
      case 'nutrition': return item.planData?.dailyTarget?.calories ? `${item.planData.dailyTarget.calories} kcal Nutrition` : 'Nutrition Plan';
      case 'meal': return item.planData?.days ? `${item.planData.days.length}-Day Meal Plan` : 'Meal Plan';
      default: return 'AI Plan';
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-slate-100 min-h-[calc(100vh-100px)]">
      <div className="mb-10 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-4">
          <FaHistory className="text-indigo-400" /> AI Generation History
        </h1>
        <p className="text-slate-400 text-lg">View and manage all your previously generated AI fitness plans.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center">
        {['all', 'workout', 'nutrition', 'meal'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-colors ${filter === f ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <FaSpinner className="animate-spin text-4xl text-indigo-500" />
        </div>
      ) : history.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
          <p className="text-slate-400 mb-4">You haven't generated any {filter !== 'all' ? filter : ''} plans yet.</p>
          <Link href="/ai" className="px-6 py-2.5 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-colors inline-block">
            Explore AI Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <Link href={getLink(item.type, item._id)} key={item._id} className="block group">
              <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 transition-all shadow-lg hover:shadow-indigo-500/10 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-[30px] rounded-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 text-xl">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.type}</span>
                      <h3 className="font-bold text-white text-lg leading-tight">{getTitle(item)}</h3>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex justify-between items-center relative z-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded w-max ${item.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <FaArrowRight className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
