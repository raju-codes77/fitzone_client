"use client";

import { useState } from "react";
import {
  FaUserShield,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "trainer",
    status: "blocked",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "user",
    status: "active",
  },
];

export default function AdminManageUsers() {

  const [users, setUsers] = useState(initialUsers);

  // Block / Unblock
  const handleBlockToggle = (id) => {

    const updatedUsers = users.map((user) => {

      if (user.id === id) {

        return {
          ...user,
          status:
            user.status === "active"
              ? "blocked"
              : "active",
        };
      }

      return user;
    });

    setUsers(updatedUsers);
  };

  // Make Admin
  const handleMakeAdmin = (id) => {

    const updatedUsers = users.map((user) => {

      if (user.id === id) {

        return {
          ...user,
          role: "admin",
        };
      }

      return user;
    });

    setUsers(updatedUsers);
  };

  return (
    <div className="min-h-screen bg-black p-4">

      {/* Header */}
      <div className="mb-5">

        <h1 className="text-2xl font-bold text-white">
          Manage Users
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Control user roles and permissions
        </p>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">

        <table className="w-full">

          {/* Table Head */}
          <thead className="border-b border-zinc-800 bg-zinc-950">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Name
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Email
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Role
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Status
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-zinc-300">
                Actions
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b border-zinc-800 transition-all hover:bg-zinc-800/40"
              >

                {/* Name */}
                <td className="px-5 py-4">

                  <h3 className="font-medium text-white">
                    {user.name}
                  </h3>

                </td>

                {/* Email */}
                <td className="px-5 py-4 text-sm text-zinc-400">
                  {user.email}
                </td>

                {/* Role */}
                <td className="px-5 py-4">

                  <span
                    className={
                      user.role === "admin"
                        ? "rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium capitalize text-cyan-400"
                        : user.role === "trainer"
                        ? "rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium capitalize text-purple-400"
                        : "rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium capitalize text-zinc-300"
                    }
                  >
                    {user.role}
                  </span>

                </td>

                {/* Status */}
                <td className="px-5 py-4">

                  <span
                    className={
                      user.status === "blocked"
                        ? "rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium capitalize text-red-400"
                        : "rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium capitalize text-emerald-400"
                    }
                  >
                    {user.status}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-5 py-4">

                  <div className="flex items-center justify-center gap-3">

                    {/* Block / Unblock */}
                    <button
                      onClick={() => handleBlockToggle(user.id)}
                      className={
                        user.status === "blocked"
                          ? "flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 transition-all hover:bg-emerald-500/20"
                          : "flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20"
                      }
                    >

                      {user.status === "blocked" ? (
                        <>
                          <FaLockOpen />
                          Unblock
                        </>
                      ) : (
                        <>
                          <FaLock />
                          Block
                        </>
                      )}

                    </button>

                    {/* Make Admin */}
                    {user.role !== "admin" && (

                      <button
                        onClick={() => handleMakeAdmin(user.id)}
                        className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-400 transition-all hover:bg-cyan-500/20"
                      >

                        <FaUserShield />

                        Make Admin

                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Info Box */}
      <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">

        <p className="text-sm leading-6 text-yellow-300">
          Blocked users can still browse the platform,
          but backend protection should prevent them
          from booking classes, applying as trainer,
          or posting comments.
        </p>

      </div>

    </div>
  );
}