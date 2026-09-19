import Link from "next/link";
import { FaDumbbell, FaCarrot, FaUtensils, FaRobot, FaArrowRight } from "react-icons/fa";

export default function AILandingPage() {
  const features = [
    {
      title: "AI Workout Planner",
      description: "Create personalized workout plans based on your goals, experience, and available equipment.",
      icon: FaDumbbell,
      href: "/ai/workout",
      color: "from-emerald-400 to-teal-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      textColor: "text-emerald-400"
    },
    {
      title: "AI Nutrition Planner",
      description: "Generate personalized daily macro and nutrition guidance tailored to your fitness objectives.",
      icon: FaCarrot,
      href: "/ai/nutrition",
      color: "from-orange-400 to-amber-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      textColor: "text-orange-400"
    },
    {
      title: "AI Meal Planner",
      description: "Get hyper-local, country-specific meal plans that fit your budget, diet, and local cuisine.",
      icon: FaUtensils,
      href: "/ai/meal-planner",
      color: "from-blue-400 to-cyan-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      textColor: "text-blue-400"
    },
    {
      title: "AI Coach",
      description: "Conversational fitness assistant for real-time advice and adjustments.",
      icon: FaRobot,
      href: "/ai/coach",
      color: "from-indigo-400 to-purple-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      textColor: "text-indigo-400",
      premium: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 md:py-20 text-slate-100">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10">
          FitZone <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">AI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto relative z-10">
          Your Personal AI Fitness Assistant. Generate highly personalized plans powered by advanced intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Link 
              key={idx}
              href={feature.href}
              className={`group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:-translate-y-1`}
            >
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.border} border`}>
                  <Icon className={`text-2xl ${feature.textColor}`} />
                </div>
                {feature.premium && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] uppercase font-bold tracking-widest shadow-sm">
                    Premium
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-6 h-12">{feature.description}</p>
              
              <div className={`flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:${feature.textColor}`}>
                Launch {feature.title.split(' ')[1]} <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
