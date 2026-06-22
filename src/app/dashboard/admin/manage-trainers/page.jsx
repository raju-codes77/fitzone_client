"use client";

import { useState } from "react";

export default function AdminManageTrainers() {
  // demo data (replace with API later)
  const [trainers, setTrainers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@mail.com",
      specialty: "Strength Training",
    },
    {
      id: "2",
      name: "Sarah Khan",
      email: "sarah@mail.com",
      specialty: "Yoga",
    },
  ]);

  // demote handler
  const handleDemote = (trainer) => {
    const confirm = window.confirm(
      `Are you sure you want to demote ${trainer.name} to User?`
    );

    if (!confirm) return;

    // remove from trainer list (UI update)
    setTrainers((prev) =>
      prev.filter((t) => t.id !== trainer.id)
    );

    // TODO: API call here
    // await fetch("/api/admin/demote-trainer", { method: "POST", body: JSON.stringify(trainer.id) });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">
        Active Trainers
      </h2>

      <div className="overflow-x-auto border border-zinc-800 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-300">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Specialty</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {trainers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-zinc-400"
                >
                  No active trainers found
                </td>
              </tr>
            ) : (
              trainers.map((trainer) => (
                <tr
                  key={trainer.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-3">{trainer.name}</td>
                  <td className="p-3">{trainer.email}</td>
                  <td className="p-3">{trainer.specialty}</td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDemote(trainer)}
                      className="px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      Demote to User
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}