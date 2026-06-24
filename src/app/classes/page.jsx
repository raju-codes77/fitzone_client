"use client";

import { getClasses } from '@/lib/api/classes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AllClassesPage = () => {
       const [classes, setClasses] = useState([]);
       const [searchQuery, setSearchQuery] = useState('');
       const [selectedCategory, setSelectedCategory] = useState('All');

       useEffect(() => {
              const loadClasses = async () => {
                     const data = await getClasses();
                     // Only keep classes with an "Approved" status
                     const approvedClasses = data.filter(cls => cls.status === "Approved");
                     setClasses(approvedClasses);
              };
              loadClasses();
       }, []);

       // Generate unique categories list for the filter dropdown
       const categories = ['All', ...new Set(classes.map(cls => cls.category))];

       // Filter classes based on search query and selected category
       const filteredClasses = classes.filter(cls => {
              const matchesSearch = cls.className.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesCategory = selectedCategory === 'All' || cls.category === selectedCategory;
              return matchesSearch && matchesCategory;
       });

       return (
              <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-950 text-slate-100">

                     {/* Header Section */}
                     <div className="mb-8 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-50 tracking-tight">Available Fitness Classes</h1>
                            <p className="text-sm text-slate-400 mt-2">Explore our approved sessions and find the perfect workout routine for you.</p>
                     </div>

                     {/* Search and Filter Panel */}
                     <div className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-900 p-4 border border-slate-800 rounded-xl shadow-md">
                            {/* Search Input */}
                            <div className="flex-1">
                                   <input
                                          type="text"
                                          placeholder="Search classes by name..."
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                                   />
                            </div>

                            {/* Category Filter Dropdown */}
                            <div className="w-full md:w-64">
                                   <select
                                          value={selectedCategory}
                                          onChange={(e) => setSelectedCategory(e.target.value)}
                                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                                   >
                                          {categories.map((category, index) => (
                                                 <option key={index} value={category}>
                                                        {category}
                                                 </option>
                                          ))}
                                   </select>
                            </div>
                     </div>

                     {/* Classes Grid Display */}
                     {filteredClasses.length === 0 ? (
                            <div className="text-center py-16 bg-slate-900/40 border border-slate-850 rounded-xl">
                                   <p className="text-slate-500 text-sm">No fitness classes match your criteria at the moment.</p>
                            </div>
                     ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                   {filteredClasses.map((cls) => (
                                          <div
                                                 key={cls._id}
                                                 className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-slate-700 transition-all group"
                                          >
                                                 {/* Class Image Aspect Box */}
                                                 <div className="relative h-48 bg-slate-950 overflow-hidden">
                                                        <Image
                                                               src={cls.imageUrl}
                                                               alt={cls.className}
                                                               fill
                                                               className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        <span className="absolute top-3 left-3 bg-indigo-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                                                               {cls.category}
                                                        </span>
                                                 </div>

                                                 {/* Class Technical Details */}
                                                 <div className="p-5 flex-1 flex flex-col justify-between">
                                                        <div>
                                                               <div className="flex justify-between items-start gap-2 mb-2">
                                                                      <h3 className="font-bold text-lg text-slate-50 leading-snug group-hover:text-indigo-400 transition-colors">
                                                                             {cls.className}
                                                                      </h3>
                                                                      <span className="text-emerald-400 font-bold text-lg whitespace-nowrap">
                                                                             ${typeof cls.price === 'number' ? cls.price.toFixed(2) : cls.price}
                                                                      </span>
                                                               </div>

                                                               {/* Metadata Tags */}
                                                               <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-400 mb-4">
                                                                      <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-indigo-400 font-medium">
                                                                             {cls.difficultyLevel}
                                                                      </span>
                                                                      <span>•</span>
                                                                      <span>{cls.duration}</span>
                                                                      <span>•</span>
                                                                      <span>{cls.schedule}</span>
                                                               </div>

                                                               {/* Short Description */}
                                                               <p className="text-xs text-slate-400 line-clamp-2 mb-5 leading-relaxed">
                                                                      {cls.description && cls.description !== 'none' ? cls.description : 'Join this professional training block designed to elevate your current performance limits and structural form.'}
                                                               </p>
                                                        </div>

                                                        {/* Call To Action Button */}
                                                        <Link href={`/classes/${cls._id}`} className="w-full text-center py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md transition-colors cursor-pointer">
                                                               View Details
                                                        </Link>
                                                 </div>
                                          </div>
                                   ))}
                            </div>
                     )}

              </div>
       );
};

export default AllClassesPage;