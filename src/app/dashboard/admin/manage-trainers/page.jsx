"use client";

import { demoteTrainer, getUsers } from "@/lib/api/users";
import React, { useEffect, useState } from "react";

export default function AdminManageTrainers() {

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const users = await getUsers();

        const allUsers = users.filter(
          (user) => user.role === "trainer"
        );

        setTrainers(allUsers);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Demote handler
  const handleDemote = async (trainer) => {

    try {
      await demoteTrainer(trainer._id);

      // Update UI instantly
      setTrainers((prev) =>
        prev.filter((t) => t._id !== trainer._id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading trainers...
      </div>
    );
  }

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
              <th className="p-3 text-left">Role</th>
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
                  key={trainer._id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-3">
                    {trainer.name}
                  </td>

                  <td className="p-3">
                    {trainer.email}
                  </td>

                  <td className="p-3 capitalize">
                    {trainer.role}
                  </td>

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