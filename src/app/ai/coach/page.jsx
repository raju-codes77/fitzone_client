"use client";

import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaLock, FaCrown } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AICoach() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(true); // Assume true until backend says 403
  const [authError, setAuthError] = useState(false);
  
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token || localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      
      const response = await fetch(`${baseUrl}/ai/coach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          messages: newMessages
        })
      });

      const data = await response.json();
      
      if (response.status === 403 && data.message === "Premium membership required") {
        setIsPremium(false);
        setLoading(false);
        return;
      }
      
      if (response.status === 401) {
        setAuthError(true);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (authError) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-zinc-400">
        Please log in to use this feature.
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="flex items-center justify-center h-[80vh] p-6">
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-600"></div>
          
          <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
            <FaCrown className="text-3xl text-yellow-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">✨ FitZone AI Coach</h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed">
            Your personal fitness assistant is available with FitZone Premium. 
            Get personalized workout guidance, nutrition advice, exercise alternatives, and more.
          </p>
          
          <Link href="/classes" className="block w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold py-3.5 px-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            Upgrade to Premium
          </Link>
          
          <button onClick={() => setIsPremium(true)} className="mt-6 text-xs text-slate-500 hover:text-slate-300 underline transition-colors">
            Try again (Developer shortcut)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto text-slate-100 p-4">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-800 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-indigo-400/20">
          <FaRobot className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            FitZone AI Coach 
            <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-md font-bold tracking-widest uppercase border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">Premium</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Your personal fitness and nutrition expert</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 pr-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10">
              <FaRobot className="text-4xl text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 relative z-10">How can I help you today?</h2>
            <p className="text-base text-slate-400 max-w-md mb-10 relative z-10">
              Ask me about workouts, nutrition, exercise alternatives, or anything fitness related.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl relative z-10">
              {["I only have 30 minutes today. What should I do?", "What should I eat after today's workout?", "What can I replace bench press with?", "I missed yesterday's workout. How should I adjust?"].map((prompt, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-left p-4 rounded-2xl text-sm text-slate-300 transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] group"
                >
                  <span className="block text-indigo-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity"><FaPaperPlane className="text-xs"/></span>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-md">
                  <FaRobot className="text-indigo-400 text-sm" />
                </div>
              )}
              <div className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-6 py-4 shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-sm' 
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-sm'
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{msg.content}</div>
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex gap-4 justify-start">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-md">
              <FaRobot className="text-indigo-400 text-sm" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl rounded-bl-sm px-6 py-5 flex gap-2 items-center shadow-lg">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="pt-4 shrink-0 relative z-10">
        <div className="text-[10px] text-center text-slate-500 mb-3 uppercase tracking-wider font-semibold">
          AI suggestions are for general informational purposes and are not a substitute for professional medical advice.
        </div>
        <form onSubmit={sendMessage} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask anything about your fitness..."
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl pl-6 pr-16 py-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 shadow-lg"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl flex items-center justify-center transition-all shadow-md disabled:shadow-none"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </form>
      </div>
    </div>
  );
}
