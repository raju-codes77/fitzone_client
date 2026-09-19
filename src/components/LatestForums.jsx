"use client"
import { getForums, manageForums } from '@/lib/api/forums';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaComments } from 'react-icons/fa';

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
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
                <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                    Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Discussions</span>
                </h2>
                <p className="text-slate-400 text-lg">Stay updated with community trends and tips.</p>
            </div>
            <Link href={"/community"} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95">
                Visit Community &rarr;
            </Link>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filterForums.map((post) => (
            <Link
              href={`/community/${post._id}`}
              key={post._id}
              className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-lime-500/30 hover:shadow-[0_8px_20px_rgb(132,204,22,0.1)] hover:-translate-y-1 flex flex-col"
            >
              {/* Next.js Optimized Image Container */}
              <div className="relative h-40 w-full bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent z-10"></div>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Readable Timestamp */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 text-xs font-semibold text-lime-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-lime-500/20">
                  <FaCalendarAlt />
                  {new Date(post.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-white leading-snug mb-2 line-clamp-2 group-hover:text-lime-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {post.description && post.description !== 'none'
                    ? post.description
                    : 'Read this community discussion to share perspectives and tips with fellow fitness enthusiasts.'}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-300 group-hover:text-lime-400 transition-colors">
                    Read More &rarr;
                  </span>
                  <FaComments className="text-slate-600 group-hover:text-lime-500/50 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestForums;