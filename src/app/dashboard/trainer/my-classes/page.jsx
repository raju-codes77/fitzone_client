"use client";

import { getClasses } from '@/lib/api/classes';
import React, { useEffect, useState } from 'react';

const MyClassesPage = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
      const data = await getClasses();
      setClasses(data);
    };
    loadClasses();
  }, []);
  
  // Modal & Focus States
  const [activeStudentsModal, setActiveStudentsModal] = useState(null); // Holds class object
  const [activeEditModal, setActiveEditModal] = useState(null); // Holds temporary copy of class being edited
  const [pendingDeleteId, setPendingDeleteId] = useState(null); // Holds _id to safely delete

  // Delete Action Strategy (Changed 'id' to '_id')
  const handleDeleteConfirm = () => {
    if (pendingDeleteId) {
      setClasses(classes.filter(c => c._id !== pendingDeleteId));
      setPendingDeleteId(null);
    }
  };

  // Update State Strategy (Changed 'id' to '_id')
  const handleUpdateSave = (e) => {
    e.preventDefault();
    setClasses(classes.map(c => c._id === activeEditModal._id ? activeEditModal : c));
    setActiveEditModal(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      
      {/* Table Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">My Managed Classes</h1>
        <p className="text-sm text-slate-400">Review status logs, manage course rosters, or adjust instruction templates.</p>
      </div>

      {/* Main Grid Ledger / Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="p-4">Class Details</th>
                <th className="p-4">Schedule & Duration</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Management Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No template layouts discovered. Build a new class sequence to begin.
                  </td>
                </tr>
              ) : (
                classes.map((cls) => (
                  // Changed key from cls.id to cls._id
                  <tr key={cls._id} className="hover:bg-slate-900/50 transition-colors">
                    {/* Column 1: Core Meta Details */}
                    <td className="p-4">
                      <div className="font-semibold text-slate-50">{cls.className}</div>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-slate-400">{cls.category}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-indigo-400">{cls.difficultyLevel}</span>
                      </div>
                    </td>
                    
                    {/* Column 2: Timing Attributes */}
                    <td className="p-4">
                      <div className="text-slate-200">{cls.schedule}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{cls.duration}</div>
                    </td>
                    
                    {/* Column 3: Asset Price Valuation */}
                    <td className="p-4 font-medium text-slate-300">
                      ${typeof cls.price === 'number' ? cls.price.toFixed(2) : cls.price}
                    </td>
                    
                    {/* Column 4: Platform Validation State Tag */}
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold border ${
                        cls.status === "Approved" 
                          ? "bg-emerald-950/60 border-emerald-900/50 text-emerald-400" 
                          : "bg-amber-950/60 border-amber-900/50 text-amber-400"
                      }`}>
                        {cls.status}
                      </span>
                    </td>

                    {/* Column 5: Modular Interaction Panel */}
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button 
                        onClick={() => setActiveStudentsModal(cls)}
                        className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                      >
                        {/* Added safety check (cls.students?.length || 0) since 'students' is missing in your DB object */}
                        View Students ({cls.students?.length || 0})
                      </button>
                      <button 
                        onClick={() => setActiveEditModal({ ...cls })}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-xs font-medium text-indigo-400 transition-colors cursor-pointer"
                      >
                        Update
                      </button>
                      <button 
                        // Changed cls.id to cls._id
                        onClick={() => setPendingDeleteId(cls._id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/20 text-xs font-medium text-rose-400 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: VIEW ATTENDEES ROSTER */}
      {activeStudentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-50">Class Attendance Roster</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeStudentsModal.className}</p>
              </div>
              <button onClick={() => setActiveStudentsModal(null)} className="text-slate-500 hover:text-slate-300 text-xl cursor-pointer">&times;</button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {/* Added fallback for missing students array */}
              {(!activeStudentsModal.students || activeStudentsModal.students.length === 0) ? (
                <p className="text-xs text-slate-500 py-4 text-center">No current client reservations found for this block.</p>
              ) : (
                activeStudentsModal.students.map(st => (
                  <div key={st.id} className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex flex-col">
                    <span className="text-sm font-medium text-slate-200">{st.name}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{st.email}</span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-5 text-right">
              <button onClick={() => setActiveStudentsModal(null)} className="px-4 py-2 text-xs font-semibold bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRE-FILLED RECORD MUTATION (UPDATE) */}
      {activeEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleUpdateSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-slate-50">Modify Class Configuration</h3>
              <button type="button" onClick={() => setActiveEditModal(null)} className="text-slate-500 hover:text-slate-300 text-xl cursor-pointer">&times;</button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Class Name</label>
              <input 
                type="text" value={activeEditModal.className} onChange={e => setActiveEditModal({...activeEditModal, className: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500" required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Duration</label>
                <input 
                  type="text" value={activeEditModal.duration} onChange={e => setActiveEditModal({...activeEditModal, duration: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500" required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Price ($)</label>
                <input 
                  type="number" step="0.01" value={activeEditModal.price} onChange={e => setActiveEditModal({...activeEditModal, price: parseFloat(e.target.value) || 0})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500" required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Full Schedule String</label>
              <input 
                type="text" value={activeEditModal.schedule} onChange={e => setActiveEditModal({...activeEditModal, schedule: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500" required
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 text-xs font-semibold">
              <button type="button" onClick={() => setActiveEditModal(null)} className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 cursor-pointer">Save Configurations</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: SAFETY CRITICAL DELETION DIALOGUE */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-rose-950 rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-10 h-10 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center mx-auto mb-3 border border-rose-900/50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h3 className="text-base font-bold text-slate-50">Purge Class Template?</h3>
            <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
              This action is destructive. All associated scheduling structures and internal class configurations will be wiped.
            </p>
            <div className="flex justify-center gap-2 text-xs font-semibold">
              <button onClick={() => setPendingDeleteId(null)} className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer">Abort</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-600 rounded-lg text-white hover:bg-rose-500 cursor-pointer">Confirm Deletion</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyClassesPage;