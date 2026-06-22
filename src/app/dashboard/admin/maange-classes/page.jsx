"use client";

import { useState } from "react";

export default function AdminManageClasses() {
  // demo data (replace with API later)
  const [classes, setClasses] = useState([
    {
      id: "1",
      title: "Morning Yoga Flow",
      trainer: "Sarah Khan",
      status: "Pending",
    },
    {
      id: "2",
      title: "Strength Training Basics",
      trainer: "John Doe",
      status: "Approved",
    },
    {
      id: "3",
      title: "HIIT Burn Session",
      trainer: "Alex Roy",
      status: "Pending",
    },
  ]);

  // APPROVE
  const handleApprove = (id) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "Approved" } : c
      )
    );

    // TODO: API call
    // await fetch("/api/admin/approve-class", ...)
  };

  // REJECT
  const handleReject = (id) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "Rejected" } : c
      )
    );

    // TODO: API call
  };

  // DELETE
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirm) return;

    setClasses((prev) =>
      prev.filter((c) => c.id !== id)
    );

    // TODO: API call
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">
        Manage Classes
      </h2>

      <div className="overflow-x-auto border border-zinc-800 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-300">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Trainer</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-zinc-400"
                >
                  No classes found
                </td>
              </tr>
            ) : (
              classes.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-3">{c.title}</td>
                  <td className="p-3">{c.trainer}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : c.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleApprove(c.id)}
                      className="px-3 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(c.id)}
                      className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
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
  );
}