'use client'
import { getClasses } from '@/lib/api/classes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const FeaturedClasses = () => {
       const [filterClass, setFilterClass] = useState([]);
       useEffect(() => {
              const loadClasses = async () => {
                     const allClasses = await getClasses();
                     const filterClasses = allClasses.sort((a, b) => b.bookingCount - a.bookingCount).slice(0, 6);
                     setFilterClass(filterClasses);
              }
              loadClasses();
       }, [])
       return (
              <div className="p-6  bg-slate-950 text-slate-100">
                     {/* Section Title */}
                     <div className='flex justify-between items-center'>
                            <div className="mb-8 text-center">
                                   <h2 className="text-2xl font-bold text-slate-50">Featured Classes</h2>
                                   <p className="text-sm text-lime-300 mt-1">Our most booked fitness sessions</p>
                            </div>

                            <Link href={"/classes"} className="bg-lime-400 text-black font-bold px-4 py-3 rounded-xl hover:bg-lime-300 transition shadow-[0_0_25px_rgba(163,230,53,0.25)] hover:shadow-[0_0_40px_rgba(163,230,53,0.35)] hover:scale-[1.03]">View All Classes</Link>

                     </div>
                     {/* Grid Container */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filterClass.map((classes) => (
                                   <div
                                          key={classes._id}
                                          className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col group relative"
                                   >
                                          {/* Booking Count Badge */}
                                          <div className="absolute top-3 right-3 z-10 bg-lime-700 text-slate-200 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                                                 🔥 {classes.bookingCount || 0} Booked
                                          </div>

                                          {/* Image */}
                                          <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                                                 <Image
                                                        src={classes.imageUrl}
                                                        alt={classes.className}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        priority={false} // Set to true if this section is at the very top of the homepage (Above the fold)
                                                 />
                                          </div>

                                          {/* Content Details */}
                                          <div className="p-5 flex-1 flex flex-col justify-between">
                                                 <div>
                                                        <div className="flex justify-between items-start gap-2 mb-2">
                                                               <h3 className="font-bold text-lg text-slate-50 group-hover:text-indigo-400 transition-colors">
                                                                      {classes.className}
                                                               </h3>
                                                               <span className="text-emerald-400 font-bold text-lg">
                                                                      ${typeof classes.price === 'number' ? classes.price.toFixed(2) : classes.price}
                                                               </span>
                                                        </div>

                                                        <p className="text-xs text-slate-400 mb-2">
                                                               Trainer: <span className="text-slate-200 font-medium">{classes.trainerName || "Expert Coach"}</span>
                                                        </p>

                                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                                               <span>⏱️ {classes.duration}</span>
                                                               <span>•</span>
                                                               <span>📂 {classes.category}</span>
                                                        </div>
                                                 </div>

                                                 {/* Action Button */}
                                                 <Link href={`/classes/${classes._id}`} className="w-full text-center py-2 rounded-lg bg-lime-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide transition-colors cursor-pointer">
                                                        View Details
                                                 </Link>
                                          </div>
                                   </div>
                            ))}
                     </div>
              </div>
       );
};

export default FeaturedClasses;