"use client";

import { deleteClass, getClasses } from "@/lib/api/classes";
import { useSession } from "@/lib/auth-client";
import React, { useEffect, useMemo, useState } from "react";

const MyClassesPage = () => {
  // Session
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // States
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [activeStudentsModal, setActiveStudentsModal] = useState(null);
  const [activeEditModal, setActiveEditModal] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Delete Loading
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load Classes
  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);

        const data = await getClasses();

        // Ensure array
        let classData = [];

        if (Array.isArray(data)) {
          classData = data;
        } else if (Array.isArray(data?.data)) {
          classData = data.data;
        }

        setClasses(classData);
      } catch (error) {
        console.error("Failed to load classes:", error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  // Filter Classes
  const filterClasses = useMemo(() => {
    if (!Array.isArray(classes)) return [];

    return classes.filter(
      (cls) => cls?.uploadedBy === user?.email
    );
  }, [classes, user?.email]);

  // Delete Class
  const handleDeleteConfirm = async () => {
    if (!pendingDeleteId) return;

    try {
      setDeleteLoading(true);

      await deleteClass(pendingDeleteId);

      // Remove deleted class instantly
      setClasses((prev) =>
        prev.filter((cls) => cls._id !== pendingDeleteId)
      );

      // Close modal
      setPendingDeleteId(null);

    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Update Save
  const handleUpdateSave = async (e) => {
    e.preventDefault();

    try {
      // TODO: update API call here

      // Update local UI instantly
      setClasses((prev) =>
        prev.map((cls) =>
          cls._id === activeEditModal._id
            ? activeEditModal
            : cls
        )
      );

      // Close modal
      setActiveEditModal(null);

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-slate-950 text-slate-100">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">
          My Managed Classes
        </h1>

        <p className="text-sm text-slate-400">
          Review status logs, manage course rosters, or adjust instruction templates.
        </p>
      </div>

      {/* Loading */}
      {loading || isPending ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-slate-400 text-sm animate-pulse">
            Loading classes...
          </p>
        </div>
      ) : !user ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center shadow-xl">
          <h3 className="text-lg font-semibold text-slate-300">
            You are not logged in
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Please sign in to view your classes.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">

            {/* Table */}
            <table className="w-full text-left border-collapse">

              {/* Table Head */}
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-4">Class Details</th>
                  <th className="p-4">Schedule & Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Management Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-800 text-sm">

                {filterClasses.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-slate-500"
                    >
                      No template layouts discovered.
                    </td>
                  </tr>
                ) : (
                  filterClasses.map((cls) => (
                    <tr
                      key={cls?._id}
                      className="hover:bg-slate-900/50 transition-colors"
                    >

                      {/* Details */}
                      <td className="p-4">
                        <div className="font-semibold text-slate-50">
                          {cls?.className}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <span className="text-slate-400">
                            {cls?.category}
                          </span>

                          <span className="text-slate-600">•</span>

                          <span className="text-indigo-400">
                            {cls?.difficultyLevel}
                          </span>
                        </div>
                      </td>

                      {/* Schedule */}
                      <td className="p-4">
                        <div className="text-slate-200">
                          {cls?.schedule}
                        </div>

                        <div className="text-xs text-slate-500 mt-0.5">
                          {cls?.duration}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-medium text-slate-300">
                        $
                        {typeof cls?.price === "number"
                          ? cls.price.toFixed(2)
                          : cls?.price}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold border ${
                            cls?.status === "Approved"
                              ? "bg-emerald-950/60 border-emerald-900/50 text-emerald-400"
                              : "bg-amber-950/60 border-amber-900/50 text-amber-400"
                          }`}
                        >
                          {cls?.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">

                        {/* Students */}
                        <button
                          onClick={() => setActiveStudentsModal(cls)}
                          className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                        >
                          View Students ({cls?.students?.length || 0})
                        </button>

                        {/* Update */}
                        <button
                          onClick={() =>
                            setActiveEditModal({ ...cls })
                          }
                          className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-xs font-medium text-indigo-400 transition-colors cursor-pointer"
                        >
                          Update
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            setPendingDeleteId(cls?._id)
                          }
                          className="px-3 py-1.5 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/20 text-xs font-medium text-rose-400 transition-colors cursor-pointer"
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
      )}

      {/* Students Modal */}
      {activeStudentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-50">
                  Class Attendance Roster
                </h3>

                <p className="text-xs text-slate-400 mt-0.5">
                  {activeStudentsModal?.className}
                </p>
              </div>

              <button
                onClick={() => setActiveStudentsModal(null)}
                className="text-slate-500 hover:text-slate-300 text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Students */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">

              {!activeStudentsModal?.students ||
              activeStudentsModal.students.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  No current client reservations found.
                </p>
              ) : (
                activeStudentsModal.students.map((st) => (
                  <div
                    key={st?.id}
                    className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex flex-col"
                  >
                    <span className="text-sm font-medium text-slate-200">
                      {st?.name}
                    </span>

                    <span className="text-xs text-slate-500 mt-0.5">
                      {st?.email}
                    </span>
                  </div>
                ))
              )}

            </div>

            {/* Footer */}
            <div className="mt-5 text-right">
              <button
                onClick={() => setActiveStudentsModal(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Update Modal */}
      {activeEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <form
            onSubmit={handleUpdateSave}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-slate-50">
                Modify Class Configuration
              </h3>

              <button
                type="button"
                onClick={() => setActiveEditModal(null)}
                className="text-slate-500 hover:text-slate-300 text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Class Name */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Class Name
              </label>

              <input
                type="text"
                value={activeEditModal.className}
                onChange={(e) =>
                  setActiveEditModal({
                    ...activeEditModal,
                    className: e.target.value,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3">

              {/* Duration */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Duration
                </label>

                <input
                  type="text"
                  value={activeEditModal.duration}
                  onChange={(e) =>
                    setActiveEditModal({
                      ...activeEditModal,
                      duration: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Price ($)
                </label>

                <input
                  type="number"
                  step="0.01"
                  value={activeEditModal.price}
                  onChange={(e) =>
                    setActiveEditModal({
                      ...activeEditModal,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

            </div>

            {/* Schedule */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Full Schedule String
              </label>

              <input
                type="text"
                value={activeEditModal.schedule}
                onChange={(e) =>
                  setActiveEditModal({
                    ...activeEditModal,
                    schedule: e.target.value,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Footer */}
            <div className="pt-3 flex justify-end gap-2 text-xs font-semibold">

              <button
                type="button"
                onClick={() => setActiveEditModal(null)}
                className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 cursor-pointer"
              >
                Save Configurations
              </button>

            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

          <div className="bg-slate-900 border border-rose-950 rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">

            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center mx-auto mb-3 border border-rose-900/50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-base font-bold text-slate-50">
              Purge Class Template?
            </h3>

            <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
              This action is destructive. All associated scheduling structures
              and internal class configurations will be wiped.
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-2 text-xs font-semibold">

              <button
                onClick={() => setPendingDeleteId(null)}
                disabled={deleteLoading}
                className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer disabled:opacity-50"
              >
                Abort
              </button>

              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="px-4 py-2 bg-rose-600 rounded-lg text-white hover:bg-rose-500 cursor-pointer disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Confirm Deletion"}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyClassesPage;