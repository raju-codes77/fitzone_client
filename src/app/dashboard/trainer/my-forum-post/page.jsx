"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getForums, deleteForum } from "@/lib/api/forums";
import { useSession } from "@/lib/auth-client";

const MyForumPostsPage = () => {
const { data: session } = useSession();
const  userEmail=session?.user?.email;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Load forums
  useEffect(() => {
    const loadForums = async () => {
      try {
        const data = await getForums();

        // Always ensure array
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to load forum posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadForums();
  }, []);

  // Filter only current user's posts
  const filterPosts = Array.isArray(posts)
    ? posts.filter((post) => post.userEmail === userEmail)
    : [];

  // Delete post
  const handleConfirmDelete = async () => {
    try {
      await deleteForum(pendingDeleteId);

      // Remove deleted post from UI
      setPosts((prev) =>
        prev.filter((post) => post._id !== pendingDeleteId)
      );

      setPendingDeleteId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">
            My Forum Publications
          </h1>

          <p className="text-sm text-slate-400">
            Monitor engagement levels, audit content structures, or clear down
            past archive logs.
          </p>
        </div>

        <div className="text-xs bg-indigo-950/40 border border-indigo-900/60 rounded-lg px-3 py-1.5 text-indigo-400 font-medium self-start sm:self-center">
          Active Posts: {filterPosts.length}
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-slate-400 text-sm">
            Loading forum posts...
          </div>
        </div>
      ) : filterPosts.length === 0 ? (
        /* Empty State */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center shadow-xl">
          <svg
            className="mx-auto h-12 w-12 text-slate-600 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>

          <h3 className="text-base font-bold text-slate-400">
            No community posts deployed
          </h3>

          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Articles created using the platform forum upload form will show up
            inside this panel.
          </p>
        </div>
      ) : (
        /* Posts Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filterPosts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Date */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-semibold tracking-wider uppercase border border-slate-800/40 text-slate-400">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h2 className="text-base font-bold text-slate-50 leading-snug group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-800 mt-auto">
                {/* Stats */}
                <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    👍 {post.likes || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    💬 {post.comments || 0}
                  </span>
                </div>

                {/* Delete */}
                <button
                  onClick={() => setPendingDeleteId(post._id)}
                  className="px-3 py-1.5 rounded-md bg-rose-950/20 hover:bg-rose-600/20 border border-rose-900/30 hover:border-rose-500/40 text-[11px] font-semibold text-rose-400 transition-all cursor-pointer focus:outline-none"
                >
                  Delete Post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-rose-950/60 rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <h3 className="text-base font-bold text-slate-50">
              Purge Forum Article?
            </h3>

            <p className="text-xs text-slate-400 mt-2 mb-5 leading-relaxed">
              This will permanently delete this post and remove it from the
              public community dashboard feed.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-2 text-xs font-semibold">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 rounded-lg text-white hover:bg-rose-500 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyForumPostsPage;