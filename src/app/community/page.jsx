"use client";

import { getForums } from "@/lib/api/forums";
import { Pagination } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaComments } from "react-icons/fa";

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
    <section className="min-h-screen bg-black pt-24 pb-16 relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lime-400 uppercase tracking-[4px] text-sm font-semibold mb-3">
            Community Discussions
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Fitness <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Community</span> Forum
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore discussions, fitness tips, transformation stories, and professional advice shared by our trainers and members.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
          </div>
        ) : (
          <>
            {/* Forums Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {forums?.map((post) => (
                <Link
                  href={`/community/${post?._id}`}
                  key={post?._id}
                  className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-lime-500/30 hover:shadow-[0_8px_20px_rgb(132,204,22,0.1)] hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent z-10"></div>
                    {post?.imageUrl ? (
                      <Image
                        src={post?.imageUrl}
                        alt={post?.title || "Forum Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                    
                    {/* Timestamp Badge */}
                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 text-xs font-semibold text-lime-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-lime-500/20">
                      <FaCalendarAlt />
                      {post?.timestamp
                        ? new Date(post?.timestamp).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Unknown Date"}
                    </div>

                    {/* Author Badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {post?.author || "Trainer"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="font-bold text-xl text-white leading-snug mb-3 line-clamp-2 group-hover:text-lime-400 transition-colors">
                      {post?.title || "Untitled Forum"}
                    </h2>

                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                      {post?.description ||
                        "Join this fitness discussion and explore valuable insights shared by our trainers and community members."}
                    </p>

                    <div className="mt-auto flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-300 group-hover:text-lime-400 transition-colors">
                        Read More &rarr;
                      </span>
                      <FaComments className="text-slate-600 group-hover:text-lime-500/50 transition-colors text-sm" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {forums.length === 0 && (
              <div className="text-center py-24 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl mt-8">
                <div className="text-5xl mb-4">💬</div>
                <p className="text-slate-400 text-lg">No forums found.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Prev
                </button>
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={setPage}
                  color="success"
                  size="lg"
                />
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CommunityForumsPage;
