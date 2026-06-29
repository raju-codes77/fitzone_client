"use client"
import { getForums, manageForums } from '@/lib/api/forums';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const LatestForums = () => {
  const [filterForums, setFilterForums] = useState([]);
  useEffect(() => {
    const loadForums = async () => {
      const allForums = await manageForums();
      const filterForums = allForums.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 4);
      setFilterForums(filterForums);
    }
    loadForums();
  }, [])
  return (
    <div className="p-6  bg-slate-950 text-slate-100">

      {/* Section Header */}
      <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight">
        Latest Forum Posts
      </h2>
      <div className="mb-10 text-center">

        <p className="text-sm text-lime-400 mt-2 max-w-md mx-auto">
          Stay updated with the newest trends, tips, and discussions from our fitness community.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filterForums.map((post) => (
          <div
            key={post._id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-slate-700 transition-all group"
          >
            {/* Next.js Optimized Image Container */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Post Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Readable Timestamp */}
                <span className="text-[11px] text-indigo-400 font-semibold tracking-wider uppercase">
                  {new Date(post.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>

                <h3 className="font-bold text-base text-slate-50 leading-snug mt-1 mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.description && post.description !== 'none'
                    ? post.description
                    : 'Read this community discussion to share perspectives and tips with fellow fitness enthusiasts.'}
                </p>
              </div>

              {/* Details Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-800/60">
                <Link
                  href={`/community/${post._id}`}
                  className="block w-full text-center py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                >
                  Read Discussion
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LatestForums;