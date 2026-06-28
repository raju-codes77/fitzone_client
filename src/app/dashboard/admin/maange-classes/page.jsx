"use client";

import {
  approveClass,
  deleteClass,
  getClasses,
  rejectClass,
} from "@/lib/api/classes";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminManageClasses() {

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch classes
  useEffect(() => {

    const fetchClasses = async () => {

      const data = await getClasses();

      setClasses(data || []);

      setLoading(false);
    };

    fetchClasses();

  }, []);


 // APPROVE
const handleApprove = async (id) => {
  await approveClass(id);
  setClasses((prev) =>
    prev.map((c) => (c._id === id ? { ...c, status: "Approved" } : c))
  );
  toast.success("Class approved successfully");
};

// REJECT
const handleReject = async (id) => {
  await rejectClass(id);
  setClasses((prev) =>
    prev.map((c) => (c._id === id ? { ...c, status: "Rejected" } : c))
  );
  toast.success("Class rejected successfully");
};

// DELETE
const handleDelete = async (id) => {
  await deleteClass(id);
  setClasses((prev) => prev.filter((c) => c._id !== id));
  toast.success("Class deleted successfully");
};

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading classes...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">

      <h2 className="text-xl font-semibold mb-4">
        Manage Classes
      </h2>

      <div className="overflow-x-auto border border-zinc-800 rounded-xl">

        <table className="w-full text-sm">

          <thead className="bg-zinc-900 text-zinc-300">

            <tr>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

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
                  key={c._id}
                  className="border-t border-zinc-800"
                >

                  <td className="p-3">
                    {c.className}
                  </td>

                  <td className="p-3">
                    {c.category}
                  </td>

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
                      onClick={() => handleApprove(c._id)}
                      className="px-3 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(c._id)}
                      className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
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