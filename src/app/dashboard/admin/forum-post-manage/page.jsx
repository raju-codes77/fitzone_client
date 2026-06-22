"use client";

import React, { useState } from 'react';

// Mock data representing platform community forum posts
const MOCK_POSTS = [
  { id: 'post_101', username: 'alex_dev', email: 'alex@example.com', title: 'Is Next.js 16 stable enough for production?', category: 'Tech', date: '2026-06-20 09:15' },
  { id: 'post_102', username: 'crypto_king', email: 'spammer@scam.com', title: '!!! BUY NOW !!! FAST CRYPTO REWARDS 100% REAL !!!', category: 'Finance', date: '2026-06-20 14:22' },
  { id: 'post_103', username: 'sarah_m', email: 'sarah.m@outlook.com', title: 'Best practices for organizing Tailwind utility classes?', category: 'Design', date: '2026-06-20 18:02' },
  { id: 'post_104', username: 'troll_face', email: 'troll@anonymous.com', title: 'React is completely dead and everyone should use jQuery', category: 'General', date: '2026-06-20 21:45' },
];

const AdminForumPostManage = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);

  // Handle deleting a post from the state/platform
  const handleDeletePost = (postId, postTitle) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete the post: "${postTitle}"?`);
    
    if (confirmDelete) {
      setPosts(posts.filter(post => post.id !== postId));
      // In a real application, you would also make an API call here:
      // await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Forum Content Moderation</h1>
          <p className="text-sm text-slate-400">Review and remove inappropriate or spam community posts across the platform.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-md text-sm">
          Active Posts: <span className="font-bold text-indigo-400">{posts.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-slate-900 rounded-lg shadow-xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          <thead className="bg-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3">Author</th>
              <th scope="col" className="px-6 py-3">Post Details</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Posted Date</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-800/40 transition-colors group">
                {/* Author Info */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-200">@{post.username}</div>
                  <div className="text-xs text-slate-500">{post.email}</div>
                </td>
                
                {/* Post Title / Context */}
                <td className="px-6 py-4 max-w-md">
                  <div className="text-slate-100 font-medium line-clamp-2" title={post.title}>
                    {post.title}
                  </div>
                  <div className="text-xs font-mono text-slate-600 mt-0.5">{post.id}</div>
                </td>
                
                {/* Category Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400 border border-slate-700">
                    {post.category}
                  </span>
                </td>
                
                {/* Date */}
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap text-xs">
                  {post.date}
                </td>
                
                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeletePost(post.id, post.title)}
                    className="inline-flex items-center justify-center rounded bg-rose-950/40 px-3 py-1.5 text-xs font-semibold text-rose-400 border border-rose-900/50 hover:bg-rose-600 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {posts.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg font-medium mb-1">Queue cleared!</p>
            <p className="text-sm text-slate-600">There are no community posts to moderate right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminForumPostManage;