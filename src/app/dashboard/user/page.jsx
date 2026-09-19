"use client";

import { userBookedClasses } from '@/lib/api/payment';
import { getFavorites } from '@/lib/actions/favorites';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTrainerApplications } from '@/lib/actions/trainer';
import { FaDumbbell, FaAppleAlt, FaRobot, FaUtensils } from 'react-icons/fa';
import { getAIDashboardSummary } from '@/lib/api/ai';

const UserDashboard = () => {

  const { data: session } = useSession();

  const userId = session?.user?.id;
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const userRole = session?.user?.role;
  const userAvatarUrl = session?.user?.image;

  const [bookedClasses, setBookedClasses] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [status, setStatus] = useState('approved');
  const [adminFeedback, setAdminFeedback] = useState('');
  
  const [aiSummary, setAiSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);

  // check user application status
  useEffect(() => {
    const checkApplication = async () => {
      if (!session?.user?.id) return;

      try {
        const applications = await getTrainerApplications();

        // Find current user's application
        const existingApplication = applications?.find(
          (app) => app.userId === session.user.id
        );

        if (existingApplication) {
          setStatus(existingApplication.status);

        }
      } catch (err) {
        console.log(err);
      }
    };

    checkApplication();
  }, [session]);

  // fetch booked classes

  useEffect(() => {

    if (userId) {

      userBookedClasses(userId)
        .then((data) => {
          setBookedClasses(data);
        });

    }

  }, [userId]);

  // fetch favorite classes

  useEffect(() => {

    if (userId) {

      getFavorites(userId)
        .then(data => {
          setFavorites(data);
        });

    }

  }, [userId]);

  // fetch AI summary
  useEffect(() => {
    if (userId) {
      getAIDashboardSummary()
        .then(data => {
          if (data.success) {
            setAiSummary(data.summary);
          }
        })
        .catch(err => console.error("Error fetching AI summary:", err))
        .finally(() => setAiLoading(false));
    }
  }, [userId]);

  // status style

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

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-slate-50">
          Welcome Back, {userName}
        </h1>

        <p className="text-sm text-slate-400">
          Manage your profile, statistics, and application milestones.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

        {/* Booked Classes */}

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg flex items-center justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Booked Classes
            </p>

            <p className="text-3xl font-bold text-slate-50 mt-1">
              {bookedClasses.length}
            </p>

          </div>

          <div className="p-3 bg-indigo-950/50 border border-indigo-900/40 rounded-lg text-indigo-400">

            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 5V3m12 2V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
              />
            </svg>

          </div>

        </div>

        {/* Favorites */}

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg flex items-center justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Favorites
            </p>

            <p className="text-3xl font-bold text-slate-50 mt-1">
              {favorites.length}
            </p>

          </div>

          <div className="p-3 bg-rose-950/40 border border-rose-900/40 rounded-lg text-rose-400">

            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>

          </div>

        </div>

      </div>

      {/* Profile + Status */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}

        <div className="md:col-span-1 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col items-center text-center">


          {userAvatarUrl ? (
            <Image
              src={userAvatarUrl}
              alt={userName || "User"}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full border-2 border-indigo-500 shadow-inner object-cover mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-indigo-500 shadow-inner bg-indigo-950 flex items-center justify-center text-indigo-400 text-3xl font-bold mb-4">
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <div className="flex items-center gap-2 mb-1">

            <h2 className="text-lg font-bold text-slate-50">
              {userName}
            </h2>

            <span className="inline-flex items-center rounded-md bg-indigo-950/80 px-2 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-800/60">
              {userRole}
            </span>

          </div>

          <p className="text-sm text-slate-400">
            {userEmail}
          </p>

        </div>

        {/* Status */}

        <div className="md:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between">

          <div>

            <div className="flex items-center justify-between mb-4">

              <h3 className="text-base font-bold text-slate-50">
                Trainer Application Status
              </h3>

              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${getStatusStyles(status)}`}>
                {status}
              </span>

            </div>

            {
              status === "Rejected" ? (

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg mt-2">

                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                    Admin Feedback
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {adminFeedback}
                  </p>

                </div>

              ) : (

                <p className="text-sm text-slate-400 leading-relaxed">

                  {
                    status === "Pending"
                      ? "Your trainer application is under review."
                      : "Congratulations! Your trainer profile has been approved."
                  }

                </p>

              )
            }

          </div>

        </div>

      </div>

      {/* AI Summary Section */}
      <div className="mt-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-50 flex items-center gap-2">
            ✨ FitZone AI 
          </h2>
          <Link href="/ai" className="text-sm text-lime-400 hover:text-lime-300 font-medium transition-colors">
            Open AI Hub &rarr;
          </Link>
        </div>

        {aiLoading ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-lime-500"></div>
          </div>
        ) : !aiSummary || (!aiSummary.workout?.hasPlan && !aiSummary.nutrition?.hasPlan && !aiSummary.meal?.hasPlan) ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-colors shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="flex-1 relative z-10">
              <h3 className="text-xl font-bold mb-2">Start Your AI Fitness Journey</h3>
              <p className="text-sm text-slate-400 mb-4">
                You don't have an active AI plan yet. Create a personalized plan based on your goals.
              </p>
            </div>
            <div className="flex gap-3 relative z-10">
              <Link href="/ai/workout" className="px-5 py-2.5 bg-lime-500 text-black font-bold rounded-xl hover:bg-lime-400 transition-colors text-sm shadow-[0_4px_14px_0_rgba(132,204,22,0.3)]">
                New Workout
              </Link>
              <Link href="/ai/meal-planner" className="px-5 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors text-sm border border-slate-700">
                New Meal Plan
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Workout Card */}
            {aiSummary.workout?.hasPlan ? (
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-lime-500/30 transition-all shadow-lg flex flex-col">
                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <FaDumbbell />
                  <span className="text-xs font-bold uppercase tracking-wider">Active Workout</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 truncate">{aiSummary.workout.title}</h3>
                <p className="text-sm text-slate-400 mb-4 flex-1">
                  {aiSummary.workout.today ? `Today: ${aiSummary.workout.today.workoutName}` : 'Rest Day'}
                </p>
                <Link href={`/ai/workout/${aiSummary.workout.planId}`} className="text-sm text-slate-300 hover:text-lime-400 font-semibold mt-auto flex items-center gap-1">
                  View Workout <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ) : (
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
                <FaDumbbell className="text-slate-600 mb-2 text-xl" />
                <p className="text-sm text-slate-500 mb-3">No Active Workout</p>
                <Link href="/ai/workout" className="text-xs text-lime-500 hover:text-lime-400 font-semibold px-3 py-1.5 rounded-lg bg-slate-800">Create Plan</Link>
              </div>
            )}

            {/* Nutrition Card */}
            {aiSummary.nutrition?.hasPlan ? (
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-all shadow-lg flex flex-col">
                <div className="flex items-center gap-2 text-orange-400 mb-3">
                  <FaAppleAlt />
                  <span className="text-xs font-bold uppercase tracking-wider">Daily Target</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {aiSummary.nutrition.calories} <span className="text-sm font-normal text-slate-400">kcal</span>
                </h3>
                <p className="text-sm text-slate-400 mb-4 flex-1">
                  {aiSummary.nutrition.macros?.protein}g Protein
                </p>
                <Link href={`/ai/nutrition/${aiSummary.nutrition.planId}`} className="text-sm text-slate-300 hover:text-orange-400 font-semibold mt-auto flex items-center gap-1">
                  View Nutrition <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ) : (
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
                <FaAppleAlt className="text-slate-600 mb-2 text-xl" />
                <p className="text-sm text-slate-500 mb-3">No Nutrition Plan</p>
                <Link href="/ai/nutrition" className="text-xs text-orange-500 hover:text-orange-400 font-semibold px-3 py-1.5 rounded-lg bg-slate-800">Set Target</Link>
              </div>
            )}

            {/* Meal Plan Card */}
            {aiSummary.meal?.hasPlan ? (
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all shadow-lg flex flex-col">
                <div className="flex items-center gap-2 text-indigo-400 mb-3">
                  <FaUtensils />
                  <span className="text-xs font-bold uppercase tracking-wider">Today's Meals</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 truncate">
                  {aiSummary.meal.today?.meals?.length || 0} Meals Today
                </h3>
                <div className="flex-1 space-y-1">
                  {aiSummary.meal.today?.meals?.slice(0,2).map((meal, idx) => (
                     <div key={idx} className="text-xs text-slate-400 flex items-center justify-between">
                       <span className="truncate w-2/3">{meal.mealCategory}: {meal.mealName}</span>
                       <span>{meal.calories} kcal</span>
                     </div>
                  ))}
                </div>
                <Link href={`/ai/meal-planner/${aiSummary.meal.planId}`} className="text-sm text-slate-300 hover:text-indigo-400 font-semibold mt-4 flex items-center gap-1">
                  View Menu <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ) : (
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
                <FaUtensils className="text-slate-600 mb-2 text-xl" />
                <p className="text-sm text-slate-500 mb-3">No Meal Plan</p>
                <Link href="/ai/meal-planner" className="text-xs text-indigo-500 hover:text-indigo-400 font-semibold px-3 py-1.5 rounded-lg bg-slate-800">Create Plan</Link>
              </div>
            )}
          </div>
        )}
      </div>

    </div>

  );

};

export default UserDashboard;