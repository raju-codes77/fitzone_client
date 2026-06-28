"use client";

import { deleteForum, getForums } from "@/lib/api/forums";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminForumPostManage = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchForums = async () => {

      const data = await getForums();

      setPosts(data || []);

      setLoading(false);

    };

    fetchForums();

  }, []);

  // delete post
  const handleDeletePost = async (postId) => {

    const res = await deleteForum(postId);

    if (res.success) {

      setPosts(posts.filter((post) => post._id !== postId));

      toast.success("Forum deleted successfully");

    }

  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-slate-50">
            Forum Content Moderation
          </h1>

          <p className="text-sm text-slate-400">
            Review and remove inappropriate posts.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-md text-sm">
          Active Posts:
          <span className="font-bold text-indigo-400 ml-2">
            {posts.length}
          </span>
        </div>

      </div>

      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-xl border border-slate-800">

        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">

          <thead className="bg-slate-950">

            <tr>

              <th className="px-6 py-3">
                Title
              </th>

              <th className="px-6 py-3">
                Description
              </th>

              <th className="px-6 py-3">
                Date
              </th>

              <th className="px-6 py-3 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {posts.map((post) => (

              <tr
                key={post._id}
                className="border-t border-slate-800"
              >

                <td className="px-6 py-4 font-semibold">
                  {post.title}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {post.description}
                </td>

                <td className="px-6 py-4 text-xs text-slate-500">
                  {new Date(post.timestamp).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right">

                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="rounded bg-red-500/20 px-3 py-1 text-red-400 hover:bg-red-500/30"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminForumPostManage;