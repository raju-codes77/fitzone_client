"use client";

import React, { useState } from 'react';

// Mock data representing the user's favorite classes
const MOCK_FAVORITES = [
  { id: 'fav_01', className: 'Sunrise Yoga Flow', trainerName: 'Elena Rostova', schedule: 'Mon, Wed @ 6:00 AM' },
  { id: 'fav_02', className: 'Barbell Strength & Conditioning', trainerName: 'David Vance', schedule: 'Tue, Thu @ 5:30 PM' },
  { id: 'fav_03', className: 'Core & Mobility Express', trainerName: 'Coach Marcus', schedule: 'Fri @ 12:00 PM' },
];

const UserFavoriteClasses = () => {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  // Handle removing a class from the favorites array
  const handleRemoveFavorite = (id, className) => {
    setFavorites(favorites.filter(item => item.id !== id));
    // In production, sync with your API here:
    // await fetch(`/api/favorites/${id}`, { method: 'DELETE' });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">Favorite Classes</h1>
        <p className="text-sm text-slate-400">Quickly access and manage the sessions you enjoy training with most.</p>
      </div>

      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          <thead className="bg-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3">Class Name</th>
              <th scope="col" className="px-6 py-3">Trainer</th>
              <th scope="col" className="px-6 py-3">Schedule</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {favorites.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                {/* Class Details */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-200">{item.className}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{item.id}</div>
                </td>
                
                {/* Trainer */}
                <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                  {item.trainerName}
                </td>
                
                {/* Schedule */}
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                  {item.schedule}
                </td>
                
                {/* Action Buttons */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleRemoveFavorite(item.id, item.className)}
                    className="inline-flex items-center justify-center rounded bg-rose-950/40 px-3 py-1.5 text-xs font-semibold text-rose-400 border border-rose-900/50 hover:bg-rose-600 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
                    title="Remove from favorites"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {favorites.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <p className="text-base font-medium mb-1">Your favorites list is empty</p>
            <p className="text-sm text-slate-600">Tap the heart icon on standard class pages to curate your list.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFavoriteClasses;