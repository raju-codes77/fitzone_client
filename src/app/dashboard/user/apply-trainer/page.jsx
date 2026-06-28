"use client";

import { applyTrainer, getTrainerApplications } from '@/lib/actions/trainer';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';

const UserApplyTrainer = () => {
  // Manage form submission state variables
  const [experience, setExperience] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('Not Applied'); // 'Not Applied' | 'Pending'
  const [error, setError] = useState('');

  const { data: session } = useSession();
  // validate user applied
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
          setApplicationStatus(existingApplication.status);

          // Optional: set previous data
          setExperience(existingApplication.experience);
          setSpecialty(existingApplication.specialty);
        }
      } catch (err) {
        console.log(err);
      } 
    };

    checkApplication();
  }, [session]);
  // Form submission handler
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');

    // Basic Validation check
    if (!experience || !specialty) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    if (isNaN(experience) || parseInt(experience) < 0) {
      setError('Please enter a valid number of years.');
      return;
    }

    const applicationData={
      experience,
      specialty,
      userId:session?.user?.id,
      userEmail:session?.user?.email,
      userName:session?.user?.name,
    };
    const data=await applyTrainer(applicationData);

    // Set status to pending on successful submit
    setApplicationStatus('Pending');
    
    // In production, you would dispatch your API call here:
    // await fetch('/api/trainers/apply', { method: 'POST', body: JSON.stringify({ experience, specialty }) });
  };
  

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">Trainer Application Portal</h1>
        <p className="text-sm text-slate-400">Share your expertise and apply to become an official platform trainer.</p>
      </div>

      {applicationStatus === 'Pending' ? (
        /* Status Display: Rendered post-submission */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-amber-950/50 border border-amber-900/50 flex items-center justify-center text-amber-400 mx-auto mb-4 animate-pulse">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-50 mb-1">Application Status: Pending</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Your application details (<strong>{experience} years</strong> in <strong>{specialty}</strong>) have been saved successfully. An administrator will review your credentials shortly.
          </p>
        </div>
      ) : (
        /* Application Form */
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
          {error && (
            <div className="bg-rose-950/40 border border-rose-900/50 rounded-lg p-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          {/* Experience Field */}
          <div>
            <label htmlFor="experience" className="block text-sm font-semibold text-slate-300 mb-2">
              Years of Experience
            </label>
            <input
              id="experience"
              type="number"
              min="0"
              placeholder="e.g., 3"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Specialty Dropdown */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-semibold text-slate-300 mb-2">
              Primary Specialty
            </label>
            <select
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              <option value="" disabled className="text-slate-600">-- Select a Specialty --</option>
              <option value="Yoga & Mobility" className="bg-slate-900">Yoga & Mobility</option>
              <option value="Weight Training" className="bg-slate-900">Weight Training / Powerlifting</option>
              <option value="Cardio & HIIT" className="bg-slate-900">Cardio & HIIT</option>
              <option value="Calisthenics" className="bg-slate-900">Calisthenics / Bodyweight</option>
              <option value="Nutrition Coaching" className="bg-slate-900">Nutrition Coaching</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:bg-indigo-700 shadow-md hover:shadow-indigo-500/10 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserApplyTrainer;