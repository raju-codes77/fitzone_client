"use client";

import { paginationClasses } from "@/lib/api/classes";
import { Pagination } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaClock, FaFolderOpen, FaCalendarAlt, FaFire } from "react-icons/fa";

const AllClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const response = await paginationClasses(page);
        // Only approved classes
        const approvedClasses = response?.data?.filter((cls) => cls.status === "Approved") || [];
        setClasses(approvedClasses);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error("Failed to load classes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, [page]);

  // Categories
  const categories = ["All", ...new Set(classes.map((cls) => cls.category))];

  // Search + Filter
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.className.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || cls.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black pt-6 pb-6 relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Fitness Classes</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore our curated sessions and find the perfect workout routine to push your limits.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-slate-900/60 backdrop-blur-md p-4 border border-white/10 rounded-2xl shadow-xl max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search classes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-100 focus:outline-none focus:border-lime-500 transition-colors placeholder:text-slate-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-64 relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-100 focus:outline-none focus:border-lime-500 transition-colors cursor-pointer appearance-none"
            >
              {categories.map((category, index) => (
                <option key={index} value={category} className="bg-slate-900">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
          </div>
        ) : filteredClasses.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-400 text-lg">No fitness classes match your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("All");}} 
              className="mt-4 text-lime-400 hover:text-lime-300 font-medium underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClasses.map((cls) => (
                <div
                  key={cls._id}
                  className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-lime-500/30 hover:shadow-[0_8px_30px_rgb(132,204,22,0.15)] hover:-translate-y-2 flex flex-col"
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-lime-500/20 backdrop-blur-md text-lime-400 text-xs font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full border border-lime-500/30">
                    {cls.category}
                  </div>

                  {/* Image */}
                  <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10"></div>
                    <Image
                      src={cls.imageUrl}
                      alt={cls.className}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                       <span className="inline-block bg-lime-500 text-black text-sm font-extrabold px-3 py-1 rounded-lg shadow-lg">
                        ${typeof cls.price === "number" ? cls.price.toFixed(2) : cls.price}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/10">
                        <FaFire className="text-orange-500" /> {cls.difficultyLevel || "All Levels"}
                      </span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-2xl text-white mb-3 group-hover:text-lime-400 transition-colors line-clamp-1">
                      {cls.className}
                    </h3>

                    <p className="text-sm text-slate-400 line-clamp-2 mb-6 leading-relaxed flex-1">
                      {cls.description && cls.description !== "none"
                        ? cls.description
                        : "Join this professional training block designed to elevate your current performance limits and structural form."}
                    </p>

                    <div className="flex flex-col gap-2 text-xs font-medium text-slate-400 mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-lime-500 shrink-0" /> 
                        <span className="truncate">{cls.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-lime-500 shrink-0" /> 
                        <span className="truncate">{cls.schedule}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/classes/${cls._id}`}
                        className="flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(132,204,22,0.2)] hover:shadow-[0_0_30px_rgba(132,204,22,0.4)]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
    </div>
  );
};

export default AllClassesPage;
