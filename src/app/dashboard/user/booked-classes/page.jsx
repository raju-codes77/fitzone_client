"use client";

import React, { useEffect, useState } from "react";

import { getClasses } from "@/lib/api/classes";
import { userBookedClasses } from "@/lib/api/payment";
import { useSession } from "@/lib/auth-client";

const UserBookedClasses = () => {

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [bookedClasses, setBookedClasses] = useState([]);

  const [allClasses, setAllClasses] = useState([]);

  // fetch booked classes

  useEffect(() => {

    if (userId) {

      userBookedClasses(userId)
        .then((data) => {
          setBookedClasses(data);
        });

    }

  }, [userId]);

  // fetch all classes

  useEffect(() => {

    getClasses()
      .then((data) => {
        setAllClasses(data);
      });

  }, []);

  // filter booked classes

  const filteredClasses = allClasses.filter((cls) =>

    bookedClasses.some(
      (booked) =>
        String(booked.productId) === String(cls._id)
    )

  );

  // Handle viewing class details

  const handleViewDetails = (classId, className) => {

    alert(
      `Redirecting to details page for: ${className} (${classId})`
    );

  };

  return (

    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">

      {/* Heading */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-50">
          My Booked Classes
        </h1>

        <p className="text-sm text-slate-400">
          Review your registered schedules and upcoming active training slots.
        </p>

      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-xl border border-slate-800">

        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">

          <thead className="bg-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">

            <tr>

              <th className="px-6 py-3">
                Class Name
              </th>

              <th className="px-6 py-3">
                Trainer
              </th>

              <th className="px-6 py-3">
                Schedule
              </th>

              <th className="px-6 py-3 text-right">
                Options
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-800">

            {
              filteredClasses.map((item) => (

                <tr
                  key={item._id}
                  className="hover:bg-slate-800/40 transition-colors"
                >

                  {/* Class Name */}

                  <td className="px-6 py-4">

                    <div className="font-semibold text-slate-200">
                      {item.className}
                    </div>

                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {item._id}
                    </div>

                  </td>

                  {/* Trainer */}

                  <td className="px-6 py-4 whitespace-nowrap">

                    {item.trainerName}

                  </td>

                  {/* Schedule */}

                  <td className="px-6 py-4 whitespace-nowrap">

                    <div>
                      {item.schedule}
                    </div>

                    <div className="text-xs text-slate-400 mt-0.5">
                      {item.duration}
                    </div>

                  </td>

                  {/* Button */}

                  <td className="px-6 py-4 whitespace-nowrap text-right">

                    <button
                      onClick={() =>
                        handleViewDetails(
                          item._id,
                          item.className
                        )
                      }
                      className="inline-flex items-center justify-center rounded bg-indigo-950/60 px-3 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                    >
                      View Details
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

        {/* Empty State */}

        {
          filteredClasses.length === 0 && (

            <div className="text-center py-16 text-slate-500">

              <p className="text-base font-medium mb-1">
                No active bookings found
              </p>

              <p className="text-sm text-slate-600">
                Explore the platform directory to pick and schedule your next session.
              </p>

            </div>

          )
        }

      </div>

    </div>

  );
};

export default UserBookedClasses;