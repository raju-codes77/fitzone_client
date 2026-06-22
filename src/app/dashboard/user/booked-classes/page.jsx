"use client";

import React, { useState } from 'react';

// Mock data representing the user's successfully booked and paid classes
const MOCK_BOOKED_CLASSES = [
  { id: 'cls_001', className: 'Advanced HIIT Blast', trainerName: 'Coach Marcus', schedule: 'Mon, Wed @ 8:00 AM', duration: '45 mins' },
  { id: 'cls_002', className: 'Power Vinyasa Flow', trainerName: 'Elena Rostova', schedule: 'Tue, Thu @ 6:30 PM', duration: '60 mins' },
  { id: 'cls_003', className: 'Olympic Weightlifting Basics', trainerName: 'David Vance', schedule: 'Sat @ 10:00 AM', duration: '90 mins' },
];

const UserBookedClasses = () => {
  const [bookedClasses] = useState(MOCK_BOOKED_CLASSES);

  // Handle viewing specific class details (e.g., open modal or navigate to route)
  const handleViewDetails = (classId, className) => {
    alert(`Redirecting to details page for: ${className} (${classId})`);
    // Example Next.js navigation: router.push(`/dashboard/classes/${classId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">My Booked Classes</h1>
        <p className="text-sm text-slate-400">Review your registered schedules and upcoming active training slots.</p>
      </div>

      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          <thead className="bg-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3">Class Name</th>
              <th scope="col" className="px-6 py-3">Trainer</th>
              <th scope="col" className="px-6 py-3">Schedule</th>
              <th scope="col" className="px-6 py-3 text-right">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {bookedClasses.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                {/* Class Name Details */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-200">{item.className}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{item.id}</div>
                </td>
                
                {/* Trainer Name */}
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                  {item.trainerName}
                </td>
                
                {/* Schedule & Duration */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-slate-200">{item.schedule}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.duration}</div>
                </td>
                
                {/* Action View Button */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleViewDetails(item.id, item.className)}
                    className="inline-flex items-center justify-center rounded bg-indigo-950/60 px-3 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {bookedClasses.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-base font-medium mb-1">No active bookings found</p>
            <p className="text-sm text-slate-600">Explore the platform directory to pick and schedule your next session.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookedClasses;