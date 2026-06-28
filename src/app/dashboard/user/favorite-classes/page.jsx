"use client";

import React, { useEffect, useState } from "react";

import { getClasses } from "@/lib/api/classes";
import {
  getFavorites,
  toggleFavorite,
} from "@/lib/actions/favorites";

import { useSession } from "@/lib/auth-client";

const UserFavoriteClasses = () => {

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [favorites, setFavorites] = useState([]);

  const [allClasses, setAllClasses] = useState([]);

  // get all classes

  useEffect(() => {

    getClasses()
      .then(data => {
        setAllClasses(data);
      });

  }, []);

  // get user favorites

  useEffect(() => {

    if(userId){

      getFavorites(userId)
        .then(data => {
          setFavorites(data);
        });

    }

  }, [userId]);

  // match favorite class ids with all classes

  const favoriteClasses = allClasses.filter(cls =>

    favorites.some(
      fav =>
        String(fav.classId) ===
        String(cls._id)
    )

  );

  // remove favorite

  const handleRemoveFavorite = async(classId) => {

    const favoriteData = {
      userId,
      classId,
    };

    const data =
      await toggleFavorite(favoriteData);

    // update UI instantly

    if(!data.favorite){

      setFavorites(prev =>
        prev.filter(
          item =>
            String(item.classId) !==
            String(classId)
        )
      );

    }

  };

  return (

    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">

      {/* Heading */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-50">
          Favorite Classes
        </h1>

        <p className="text-sm text-slate-400">
          Total Favorite Classes:
          <span className="ml-2 text-indigo-400 font-bold">
            {favoriteClasses.length}
          </span>
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
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-800">

            {
              favoriteClasses.map((item) => (

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

                  <td className="px-6 py-4 whitespace-nowrap text-slate-400">

                    {item.schedule}

                  </td>

                  {/* Remove Button */}

                  <td className="px-6 py-4 whitespace-nowrap text-right">

                    <button
                      onClick={() =>
                        handleRemoveFavorite(item._id)
                      }
                      className="inline-flex items-center justify-center rounded bg-rose-950/40 px-3 py-1.5 text-xs font-semibold text-rose-400 border border-rose-900/50 hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

        {/* Empty State */}

        {
          favoriteClasses.length === 0 && (

            <div className="text-center py-16 text-slate-500">

              <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto mb-3">

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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>

              </div>

              <p className="text-base font-medium mb-1">
                Your favorites list is empty
              </p>

              <p className="text-sm text-slate-600">
                Tap the heart icon on class pages to add favorites.
              </p>

            </div>

          )
        }

      </div>

    </div>

  );

};

export default UserFavoriteClasses;