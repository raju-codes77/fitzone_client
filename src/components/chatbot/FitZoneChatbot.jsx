"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { sendChatMessage, getChatHistory, getChatMessages } from "@/lib/api/ai";
import { FaTimes, FaComment, FaPaperPlane, FaDumbbell, FaAppleAlt, FaUtensils, FaFire, FaHistory, FaPlus, FaSpinner, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChatbotIcon = () => (
  <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]">
    <FaRobot className="text-white text-xl z-10" />
    <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse shadow-[0_0_5px_rgba(253,224,71,0.8)]"></div>
  </div>
);

export default function FitZoneChatbot() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historySessions, setHistorySessions] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const loadHistory = async () => {
    if (!session?.user) return;
    setHistoryLoading(true);
    try {
      const data = await getChatHistory();
      setHistorySessions(data.conversations || []);
    } catch (error) {
      console.error("Failed to load history", error);
    }
    setHistoryLoading(false);
  };

  useEffect(() => {
    if (isOpen && session?.user && showHistory) {
      loadHistory();
    }
  }, [isOpen, session, showHistory]);

  const startNewChat = () => {
    setConversationId(null);
    setMessages([]);
    setShowHistory(false);
  };

  const openConversation = async (id) => {
    setConversationId(id);
    setShowHistory(false);
    setIsLoading(true);
    try {
      const data = await getChatMessages(id);
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
    setIsLoading(false);
  };

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage(text, conversationId, messages);
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: "Sorry, I couldn't process that right now. Please try again.", isError: true }
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const suggestedActions = [
    { label: "Today's Workout", icon: <FaDumbbell />, prompt: "What is my workout today?" },
    { label: "Nutrition Help", icon: <FaAppleAlt />, prompt: "What are my daily nutrition targets?" },
    { label: "Meal Ideas", icon: <FaUtensils />, prompt: "Give me some meal ideas based on my active meal plan." },
    { label: "Fat Loss Tips", icon: <FaFire />, prompt: "What are some general tips for fat loss?" }
  ];

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open FitZone AI"
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 transition-transform hover:scale-105 active:scale-95 ${isOpen ? 'hidden md:block' : 'block'}`}
      >
        {!isOpen && (
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[20px] opacity-40 animate-pulse"></div>
        )}
        {isOpen ? (
          <div className="flex items-center justify-center w-14 h-14 bg-slate-800 rounded-full shadow-lg border border-slate-700">
            <FaTimes className="text-white text-xl" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-indigo-600 to-emerald-500 rounded-full shadow-lg relative">
            <FaComment className="text-white text-2xl" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full"></div>
          </div>
        )}
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 z-[100] w-full h-[100dvh] md:w-[420px] md:h-[650px] md:max-h-[calc(100vh-140px)] bg-slate-950 md:border md:border-slate-800 rounded-none md:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 md:slide-in-from-bottom-10">
          
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 p-3 md:p-4 flex items-center justify-between pt-[max(12px,env(safe-area-inset-top))]">
            <div className="flex items-center gap-3">
              <ChatbotIcon />
              <div>
                <h3 className="font-bold text-white leading-tight">FitZone AI</h3>
                <p className="text-xs text-emerald-400 font-medium">Your personal fitness assistant</p>
              </div>
            </div>
            <div className="flex gap-2">
              {session?.user && (
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Toggle History"
                >
                  <FaHistory />
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close FitZone AI"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex flex-col min-h-0">
            {/* History Overlay */}
            {showHistory && (
              <div className="absolute inset-0 bg-slate-950/95 z-20 backdrop-blur-sm flex flex-col">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                  <h4 className="font-bold text-white">Chat History</h4>
                  <button onClick={startNewChat} className="text-xs flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-500/30">
                    <FaPlus /> New Chat
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {historyLoading ? (
                    <div className="text-center p-6 text-slate-500"><FaSpinner className="animate-spin inline mr-2"/> Loading...</div>
                  ) : historySessions.length === 0 ? (
                    <div className="text-center p-6 text-slate-500 text-sm">No recent conversations</div>
                  ) : (
                    historySessions.map((session, idx) => (
                      <button 
                        key={idx}
                        onClick={() => openConversation(session._id)}
                        className="w-full text-left p-3 hover:bg-slate-900 rounded-xl mb-1 flex flex-col gap-1 border border-transparent hover:border-slate-800 transition-colors"
                      >
                        <span className="font-semibold text-sm text-slate-200 truncate">{session.title}</span>
                        <span className="text-xs text-slate-500">{new Date(session.updatedAt).toLocaleString()}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <ChatbotIcon />
                  <h4 className="font-bold text-white text-lg mt-4 mb-2">Hey! 👋 I'm FitZone AI</h4>
                  <p className="text-sm text-slate-400 mb-6 max-w-[250px]">
                    I can help you with workouts, nutrition, meals, recovery, and your FitZone AI plans.
                  </p>
                  
                  {!session?.user && (
                    <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl mb-6 w-full">
                      <p className="text-xs text-indigo-300 mb-3">Sign in to ask personalized questions about your plans.</p>
                      <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-lg text-sm transition-colors text-center">
                        Sign In
                      </Link>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 w-full mt-auto mb-2">
                    {suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(action.prompt)}
                        className="flex flex-col items-center justify-center p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800 transition-all text-xs text-slate-300 gap-2"
                      >
                        <span className="text-emerald-400 text-base">{action.icon}</span>
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user' 
                          ? 'bg-indigo-600 text-white rounded-br-sm' 
                          : msg.isError 
                            ? 'bg-red-500/20 text-red-200 border border-red-500/30 rounded-bl-sm'
                            : 'bg-slate-800 text-slate-200 rounded-bl-sm shadow-md'
                      }`}>
                        {msg.role === 'assistant' && !msg.isError ? (
                          <div className="text-slate-200 [&>p]:mb-3 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:ml-4 [&>ol]:mb-3 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h2]:text-base [&>h2]:font-bold [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-bold [&>h3]:mb-1 [&>strong]:text-emerald-400">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        )}
                        
                        {msg.isError && (
                          <button onClick={() => handleSend(messages[messages.length-2].content)} className="mt-2 text-xs font-bold bg-slate-900 px-3 py-1.5 rounded text-white hover:bg-slate-700">
                            Try Again
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start w-full">
                      <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 shadow-md">
                        <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-full shadow-inner mr-1">
                          <FaRobot className="text-white text-[10px]" />
                        </div>
                        <span className="text-sm text-slate-400 font-medium">Thinking</span>
                        <div className="flex gap-1 ml-1">
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-slate-900 border-t border-slate-800 relative z-10 shrink-0 pb-[max(12px,env(safe-area-inset-bottom))]">
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask FitZone AI..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none custom-scrollbar"
                  rows="1"
                  style={{ minHeight: "44px", maxHeight: "120px" }}
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 bottom-2 p-2 bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:bg-slate-700 disabled:text-slate-500 transition-colors"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
