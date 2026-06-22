"use client";

import { createClass } from '@/lib/actions/classes';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddClassPage = () => {
  // Controlled form state attributes
  const [className, setClassName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  // Custom states for handling structured day scheduling parameters
  const [selectedDays, setSelectedDays] = useState([]);
  const [classTime, setClassTime] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleCreateClassSubmit = async(e) => {
    e.preventDefault();
    setValidationError('');

    // Field verification boundaries
    if (!className || !category || !difficulty || !duration || !price || !classTime || selectedDays.length === 0) {
      setValidationError('Please complete all fields and select at least one scheduling day.');
      return;
    }

    // Consolidated payload object mapped with forced platform moderation rules
    const newClassPayload = {
      className,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd', // Default placeholder if blank
      category,
      difficultyLevel: difficulty,
      duration: `${duration} mins`,
      price: parseFloat(price),
      description,
      schedule: `${selectedDays.join(', ')} @ ${classTime}`,
      status: "Pending" // Note requirement: Secured platform rule default
    };

    const res=await createClass(newClassPayload);
    if(res.insertedID){
       toast.success("Class added Successfully!")
    }
    setFormSubmitted(true);

    // In dynamic scenarios, wire up your async database operations here:
    // await fetch('/api/classes/create', { method: 'POST', body: JSON.stringify(newClassPayload) });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">Create New Class Template</h1>
        <p className="text-sm text-slate-400">Design an instruction block. New configurations enter the system marked as Pending validation.</p>
      </div>

      {formSubmitted ? (
        /* Success Screen State */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-50 mb-2">Class Created Successfully</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
            The curriculum is locked and its deployment parameters have been routed to platform moderators.
          </p>
          <div className="inline-flex items-center rounded-full bg-amber-950/60 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-900/50">
            Current Status: Pending Approval
          </div>
        </div>
      ) : (
        /* Creator Form Blueprint */
        <form onSubmit={handleCreateClassSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          
          {validationError && (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-lg p-3 text-sm text-rose-400">
              {validationError}
            </div>
          )}

          {/* Grid Layout Row 1: Class Name & Cover Art Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Class Name</label>
              <input 
                type="text" placeholder="e.g., Absolute Core Coreography" value={className} onChange={(e) => setClassName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Cover Image URL</label>
              <input 
                type="url" placeholder="https://example.com/cover.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Grid Layout Row 2: Category & Difficulty Metric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Category</label>
              <select 
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="" disabled>-- Select Category --</option>
                <option value="Yoga">Yoga & Mindset</option>
                <option value="Weights">Weights & Powerlifting</option>
                <option value="Cardio">Cardio & HIIT Conditioning</option>
                <option value="Calisthenics">Bodyweight Gymnastics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Difficulty Level</label>
              <select 
                value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="" disabled>-- Select Intensity Level --</option>
                <option value="Beginner">Beginner Tier</option>
                <option value="Intermediate">Intermediate Level</option>
                <option value="Advanced">Advanced Pro Tier</option>
              </select>
            </div>
          </div>

          {/* Grid Layout Row 3: Duration Allocation & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Duration (Minutes)</label>
              <input 
                type="number" min="1" placeholder="e.g., 45" value={duration} onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Price ($ USD)</label>
              <input 
                type="number" step="0.01" min="0" placeholder="e.g., 29.99" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Advanced Cluster block: Schedule Mapping Interface */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Class Schedule (Select Days)</label>
              <div className="flex flex-wrap gap-2">
                {availableDays.map(day => {
                  const isChecked = selectedDays.includes(day);
                  return (
                    <button
                      key={day} type="button" onClick={() => toggleDaySelection(day)}
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/10' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Session Start Time</label>
              <input 
                type="time" value={classTime} onChange={(e) => setClassTime(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Class Narrative Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</label>
            <textarea 
              rows="4" placeholder="Outline clear curriculum metrics, preparatory guidelines, or specific gear necessities..." 
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Submit Anchor */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:bg-indigo-700 shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer focus:outline-none"
            >
              Deploy Class Matrix
            </button>
          </div>

        </form>
      )}
    </div>
  );
};

export default AddClassPage;