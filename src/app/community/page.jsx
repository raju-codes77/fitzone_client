
"use client";

import { getForums } from "@/lib/api/forums";
import { Pagination } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CommunityForumsPage = () => {
  const [forums, setForums] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForums = async () => {
      try {
        setLoading(true);

        const response = await getForums(page);

        const sortedForums =
          response?.data?.sort(
            (a, b) =>
              new Date(b?.timestamp) -
              new Date(a?.timestamp)
          ) || [];

        setForums(sortedForums);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error("Failed to load forums:", error);
      } finally {
        setLoading(false);
      }
    };

    loadForums();
  }, [page]);

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-14">

        <p className="text-lime-400 uppercase tracking-[4px] text-sm font-semibold mb-3">
          Community Discussions
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Fitness Community Forum
        </h1>

        <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed">
          Explore discussions, fitness tips,
          transformation stories, and professional
          advice shared by our trainers and admin team.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 text-lg">
          Loading forums...
        </div>
      ) : (
        <>
          {/* Forums Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {forums?.map((post) => (
              <div
                key={post?._id}
                className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-lime-400/40 transition-all duration-300 shadow-xl flex flex-col"
              >

                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden bg-slate-800">

                  {post?.imageUrl ? (
                    <Image
                      src={post?.imageUrl}
                      alt={post?.title || "Forum Image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Author */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {post?.author || "Trainer"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">

                  {/* Date */}
                  <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider mb-2">
                    {post?.timestamp
                      ? new Date(
                          post?.timestamp
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Unknown Date"}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold leading-snug mb-3 line-clamp-2 group-hover:text-lime-400 transition-colors">
                    {post?.title || "Untitled Forum"}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
                    {post?.description ||
                      "Join this fitness discussion and explore valuable insights shared by our trainers and community members."}
                  </p>

                  {/* Read More */}
                  <Link
                    href={`/community/${post?._id}`}
                    className="mt-6"
                  >
                    <button className="w-full bg-blue-600 hover:bg-lime-300 text-black py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer">
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {forums.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              No forums found.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">

              {/* Prev Button */}
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Prev
              </button>

              {/* Pagination */}
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                color="success"
                size="lg"
              />

              {/* Next Button */}
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CommunityForumsPage;
