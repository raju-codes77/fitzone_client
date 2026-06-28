"use client";

import { approveTrainer, getTrainerApplications, rejectTrainer } from "@/lib/actions/trainer";
import React, { useEffect, useState } from "react";

export default function AdminTrainerApplication() {
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getTrainerApplications();

        setApplications(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Open modal
  const openModal = (app) => {
    setSelected(app);
    setFeedback("");
  };

  // Close modal
  const closeModal = () => {
    setSelected(null);
    setFeedback("");
  };

  // Approve handler
  const handleApprove = async () => {
    try {
      approveTrainer(selected._id);

    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  // Reject handler
  const handleReject = async () => {
    try {
    

      rejectTrainer(selected._id);

    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      
      <h2 className="text-xl font-semibold mb-4">
        Trainer Applications
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto border border-zinc-800 rounded-xl">
        
        <table className="w-full text-sm">
          
          <thead className="bg-zinc-900 text-zinc-300">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Experience</th>
              <th className="p-3 text-left">Specialty</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-3">
                    {app.userName}
                  </td>

                  <td className="p-3">
                    {app.userEmail}
                  </td>

                  <td className="p-3">
                    {app.experience} Years
                  </td>

                  <td className="p-3">
                    {app.specialty}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        app.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : app.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => openModal(app)}
                      className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-zinc-500"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          
          <div className="w-[420px] bg-zinc-900 border border-zinc-700 rounded-xl p-5">
            
            <h3 className="text-lg font-semibold mb-3">
              Applicant Details
            </h3>

            <div className="space-y-2 text-sm text-zinc-300">
              <p>
                <b>Name:</b> {selected.userName}
              </p>

              <p>
                <b>Email:</b> {selected.userEmail}
              </p>

              <p>
                <b>Experience:</b> {selected.experience}
              </p>

              <p>
                <b>Specialty:</b> {selected.specialty}
              </p>
            </div>

            {/* Feedback */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write admin feedback..."
              className="w-full mt-4 p-2 rounded bg-black border border-zinc-700 text-white text-sm"
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
              
              <button
                onClick={closeModal}
                className="px-3 py-1 rounded bg-zinc-700 text-white"
              >
                Close
              </button>

              <button
                onClick={handleReject}
                className="px-3 py-1 rounded bg-red-500/20 text-red-400"
              >
                Reject
              </button>

              <button
                onClick={handleApprove}
                className="px-3 py-1 rounded bg-green-500/20 text-green-400"
              >
                Approve
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}