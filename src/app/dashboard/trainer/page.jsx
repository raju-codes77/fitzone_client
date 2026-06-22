"use client";

import React from 'react';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';


const TrainerDashboard = () => {
  const { data: session, status } = useSession();

  // Handle the loading state while the session is fetching
  if (status === 'loading') {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">
        <p className="animate-pulse text-sm">Loading trainer profile context...</p>
      </div>
    );
  }

  // Fallback structural object if the session or user properties are entirely empty
  const trainer = session?.user || {
    name: "Instructor Name",
    email: "trainer@platform.com",
    image: "/fallback-avatar.png",
    role: "Trainer"
  };

  // Metrics related specifically to this trainer's creation/enrollment history
  const stats = {
    totalClassesCreated: 8,
    totalStudentsEnrolled: 142
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50">Trainer Management Console</h1>
        <p className="text-sm text-slate-400">Track your class performance, active rosters, and profile metrics.</p>
      </div>

      {/* Statistics Section Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        
        {/* Total Classes Created Card */}
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Classes Created</p>
            <p className="text-3xl font-bold text-slate-50 mt-1">{stats.totalClassesCreated}</p>
          </div>
          <div className="p-3 bg-indigo-950/50 border border-indigo-900/40 rounded-lg text-indigo-400">
            {/* Folder / Add Layer Vector Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Total Students Enrolled Card */}
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Students Enrolled</p>
            <p className="text-3xl font-bold text-slate-50 mt-1">{stats.totalStudentsEnrolled}</p>
          </div>
          <div className="p-3 bg-emerald-950/50 border border-emerald-900/40 rounded-lg text-emerald-400">
            {/* Multiple Users / Group Vector Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Profile Details Block */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg max-w-md">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Instructor Profile</h3>
        <div className="flex items-center gap-4">
          
          {/* Profile Picture using Next.js Image Component */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image 
              src={trainer.image || "/fallback-avatar.png"} 
              alt={trainer.name || "Trainer Avatar"} 
              width={64}
              height={64}
              className="rounded-full border border-slate-700 object-cover shadow-inner"
              priority
            />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-50">{trainer.name}</h2>
              
              {/* Trainer Role Badge */}
              <span className="inline-flex items-center rounded-md bg-emerald-950/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-800/60">
                {trainer.role || 'Trainer'}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-0.5 font-normal">{trainer.email}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TrainerDashboard;