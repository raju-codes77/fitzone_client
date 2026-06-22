"use client";

import React, { useState } from 'react';

// Mock profile data mimicking a standard database response
const MOCK_USER_DATA = {
  name: "Sarah Jenkins",
  email: "sarah.j@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  role: "User",
  stats: {
    totalBookedClasses: 14,
    totalFavorites: 8
  },
  trainerApplication: {
    status: "Rejected", // Can be "Pending", "Approved", or "Rejected"
    adminFeedback: "Thank you for applying! Unfortunately, we require a minimum of 2 years of active fitness certification for our professional tier. Please update your credentials and feel free to reapply."
  }
};

const UserDashboard = () => {
  const [userData] = useState(MOCK_USER_DATA);

  // Helper logic to style application badges dynamically
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50';
      case 'Rejected':
        return 'bg-rose-950/50 text-rose-400 border-rose-900/50';
      default:
        return 'bg-amber-950/50 text-amber-400 border-amber-900/50';
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      
      {/* Header Grid */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50">Welcome Back, {userData.name.split(' ')[0]}</h1>
        <p className="text-sm text-slate-400">Manage your profile, statistics, and application milestones.</p>
      </div>

      {/* Statistics Section Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Total Booked Card */}
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Booked Classes</p>
            <p className="text-3xl font-bold text-slate-50 mt-1">{userData.stats.totalBookedClasses}</p>
          </div>
          <div className="p-3 bg-indigo-950/50 border border-indigo-900/40 rounded-lg text-indigo-400">
            {/* Simple Inline SVG Calendar Icon */}
            <svg className="w-6 height-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 5V3m12 2V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>
          </div>
        </div>

        {/* Total Favorites Card */}
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Favorites</p>
            <p className="text-3xl font-bold text-slate-50 mt-1">{userData.stats.totalFavorites}</p>
          </div>
          <div className="p-3 bg-rose-950/40 border border-rose-900/40 rounded-lg text-rose-400">
            {/* Simple Inline SVG Heart Icon */}
            <svg className="w-6 height-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card details */}
        <div className="md:col-span-1 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col items-center text-center">
          <img 
            src={userData.avatarUrl} 
            alt={userData.name} 
            className="w-24 height-24 rounded-full border-2 border-indigo-500 shadow-inner object-cover mb-4"
          />
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-slate-50">{userData.name}</h2>
            {/* User Role Badge */}
            <span className="inline-flex items-center rounded-md bg-indigo-950/80 px-2 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-800/60">
              {userData.role}
            </span>
          </div>
          <p className="text-sm text-slate-400 font-normal">{userData.email}</p>
        </div>

        {/* Application Status Alert Block */}
        <div className="md:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-50">Trainer Application Status</h3>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${getStatusStyles(userData.trainerApplication.status)}`}>
                {userData.trainerApplication.status}
              </span>
            </div>

            {/* Conditionally display Admin Feedback if Application is Rejected */}
            {userData.trainerApplication.status === "Rejected" ? (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg mt-2">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Admin Feedback</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  "{userData.trainerApplication.adminFeedback}"
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-400 leading-relaxed">
                {userData.trainerApplication.status === "Pending" 
                  ? "Your request to become an official platform trainer is currently being scrutinized by an administrator. We typically reply within 48 hours."
                  : "Congratulations! Your trainer parameters have successfully cleared."
                }
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;