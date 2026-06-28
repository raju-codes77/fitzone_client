"use client";

import {
  blockUser,
  getUsers,
  promoteUser,
  unblockUser,
} from "@/lib/api/users";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaUserShield,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";

export default function AdminManageUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const data = await getUsers();

        const allUsers = data.filter(
          (user) => user.role === "user"
        );

        setUsers(allUsers);
        

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchUsers();

  }, []);

  // Block / Unblock
  const handleBlockToggle = async (user) => {

    try {

      if (user.blocked) {

        await unblockUser(user._id);
        toast.success("User unblocked successfully");

      } else {

        await blockUser(user._id);
        toast.error("User blocked successfully");

      }

      // Update UI instantly
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? {
                ...u,
                blocked: !u.blocked,
              }
            : u
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  // Make Admin
  const handleMakeAdmin = async (user) => {

    try {

      await promoteUser(user._id);
      toast.success("User promoted to admin successfully");

      // Remove from user list instantly
      setUsers((prev) =>
        prev.filter((u) => u._id !== user._id)
      );

    } catch (error) {

      console.log(error);

    }
  };

  if (loading) {

    return (
      <div className="min-h-screen bg-black p-6 text-white">
        Loading users...
      </div>
    );
  }

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

            {users.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="p-5 text-center text-zinc-400"
                >
                  No users found
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user._id}
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

                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium capitalize text-zinc-300">

                      {user.role}

                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">

                    <span
                      className={
                        user.blocked
                          ? "rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400"
                          : "rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
                      }
                    >
                      {user.blocked ? "Blocked" : "Active"}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">

                    <div className="flex items-center justify-center gap-3">

                      {/* Block / Unblock */}
                      <button
                        onClick={() => handleBlockToggle(user)}
                        className={
                          user.blocked
                            ? "flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 transition-all hover:bg-emerald-500/20"
                            : "flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20"
                        }
                      >

                        {user.blocked ? (
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
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-400 transition-all hover:bg-cyan-500/20"
                      >

                        <FaUserShield />

                        Make Admin

                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

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