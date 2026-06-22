"use client";

import { useState } from "react";

export default function AdminTrainerApplication() {
  // demo data (replace with API later)
  const [applications, setApplications] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@mail.com",
      experience: "5 years",
      specialty: "Strength Training",
      time: "Morning",
      status: "Pending",
    },
    {
      id: "2",
      name: "Sarah Khan",
      email: "sarah@mail.com",
      experience: "3 years",
      specialty: "Yoga",
      time: "Evening",
      status: "Pending",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  // open modal
  const openModal = (app) => {
    setSelected(app);
    setFeedback("");
  };

  // close modal
  const closeModal = () => {
    setSelected(null);
    setFeedback("");
  };

  // approve handler
  const handleApprove = async () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selected.id
          ? { ...app, status: "Approved", role: "Trainer" }
          : app
      )
    );

    // TODO: API call
    // await fetch("/api/admin/approve-trainer", {...})

    closeModal();
  };

  // reject handler
  const handleReject = async () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selected.id
          ? { ...app, status: "Rejected", feedback }
          : app
      )
    );

    // TODO: API call
    // await fetch("/api/admin/reject-trainer", {...})

    closeModal();
  };

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
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t border-zinc-800">
                <td className="p-3">{app.name}</td>
                <td className="p-3">{app.email}</td>
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
            ))}
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
              <p><b>Experience:</b> {selected.experience}</p>
              <p><b>Specialty:</b> {selected.specialty}</p>
              <p><b>Preferred Time:</b> {selected.time}</p>
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