'use client'
import { getClasses } from '@/lib/api/classes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaClock, FaFolderOpen, FaFire, FaUserTie } from 'react-icons/fa';

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
        <section className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-6'>
                    <div>
                        <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Classes</span>
                        </h2>
                        <p className="text-slate-400 text-lg">Join our most popular fitness sessions.</p>
                    </div>

                    <Link href={"/classes"} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95">
                        Explore All Classes &rarr;
                    </Link>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filterClass.map((classes) => (
                        <div
                            key={classes._id}
                            className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-lime-500/30 hover:shadow-[0_8px_30px_rgb(132,204,22,0.15)] hover:-translate-y-2 flex flex-col"
                        >
                            {/* Booking Count Badge */}
                            <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-lime-400 text-xs font-bold px-3 py-1.5 rounded-full border border-lime-500/20 shadow-lg flex items-center gap-1.5">
                                <FaFire className="text-orange-500" /> {classes.bookingCount || 0} Booked
                            </div>

                            {/* Image */}
                            <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                                <Image
                                    src={classes.imageUrl}
                                    alt={classes.className}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <span className="inline-block bg-lime-500 text-black text-sm font-extrabold px-3 py-1 rounded-lg shadow-lg">
                                        ${typeof classes.price === 'number' ? classes.price.toFixed(2) : classes.price}
                                    </span>
                                </div>
                            </div>

                            {/* Content Details */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-lime-400 transition-colors line-clamp-1">
                                    {classes.className}
                                </h3>
                                
                                <p className="flex items-center gap-2 text-sm text-slate-400 mb-5">
                                    <FaUserTie className="text-slate-500" /> 
                                    By <span className="text-slate-200 font-semibold">{classes.trainerName || "Expert Coach"}</span>
                                </p>

                                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-8 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-1.5">
                                        <FaClock className="text-lime-500" /> {classes.duration}
                                    </div>
                                    <div className="w-px h-4 bg-slate-700"></div>
                                    <div className="flex items-center gap-1.5 line-clamp-1">
                                        <FaFolderOpen className="text-lime-500" /> {classes.category}
                                    </div>
                                </div>

                                <div className="mt-auto pt-2">
                                    <Link href={`/classes/${classes._id}`} className="flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(132,204,22,0.2)] hover:shadow-[0_0_30px_rgba(132,204,22,0.4)]">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedClasses;