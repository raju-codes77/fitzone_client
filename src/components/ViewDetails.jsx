import { getFavorites, toggleFavorite } from '@/lib/actions/favorites';
import { userBookedClasses } from '@/lib/api/payment';
import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ViewDetails =({ viewClass }) => {
  const [favorites, setFavorites] = useState([]);
 
    const { data: session } = useSession();

const userId = session?.user?.id;

const [bookedClasses, setBookedClasses] = useState([]);

useEffect(() => {

  if(userId){

    userBookedClasses(userId)
      .then(data => {
        setBookedClasses(data);
      });

  }

}, [userId]);

useEffect(() => {

  if(userId){

    getFavorites(userId)
      .then(data => {
        setFavorites(data);
      });

  }

}, [userId]);

const isBooked = bookedClasses.find(
  item =>
    String(item.productId) ===
    String(viewClass?._id)
);

const isFavorite = favorites.find(
  item =>
    String(item.classId) ===
    String(viewClass?._id)
);
  
const handleFavoriteToggle = async () => {

  const favoriteData = {
    userId,
    classId: viewClass?._id,
  };

  const data =
    await toggleFavorite(favoriteData);

  // remove from UI

  if(!data.favorite){

    const remainingFavorites =
      favorites.filter(
        item =>
          String(item.classId) !==
          String(viewClass?._id)
      );

    setFavorites(remainingFavorites);

  }

  // add to UI

  else {

    setFavorites([
      ...favorites,
      {
        classId: viewClass?._id,
      },
    ]);

  }

};
  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-slate-950 text-slate-100 flex items-center">

      {/* Back Layout Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 shadow-2xl">

        {/* Left Column: Visual Asset Display */}
        <div className="relative h-72 lg:h-full min-h-[320px] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
          {viewClass?.imageUrl && (
            <Image
              src={viewClass?.imageUrl}
              alt={viewClass?.className}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute top-4 left-4 bg-indigo-600 px-3 py-1 rounded-md text-xs font-semibold shadow-md">
            {viewClass?.category}
          </div>
        </div>

        {/* Right Column: Meta Manifest & Structural Specs */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            {/* Title Matrix */}
            <div className="flex justify-between items-start gap-4 mb-3">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-50 tracking-tight leading-tight">
                {viewClass?.className}
              </h1>
              <div className="text-right">
                <span className="text-emerald-400 text-2xl font-black block">
                  ${typeof viewClass?.price === 'number' ? viewClass?.price.toFixed(2) : viewClass?.price}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">Single Pass</span>
              </div>
            </div>

            {/* Micro Tags Ledger */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-6">
              <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-indigo-400 font-medium">
                {viewClass?.difficultyLevel}
              </span>
              <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-slate-300">
                ⏱️ {viewClass?.duration}
              </span>
              <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-slate-300">
                🔥 {viewClass?.bookingCount || 0} Booked
              </span>
            </div>

            {/* Schedule Segment */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Weekly Slot Schedule</h3>
              <p className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
                📅 {viewClass?.schedule}
              </p>
            </div>

            {/* Core Description Text */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Overview Description</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {viewClass?.description && viewClass?.description !== 'none'
                  ? viewClass?.description
                  : 'No custom blueprint summary provided. This training module features state-of-the-art structural mechanics designed to build baseline capabilities and expand individual athletic limits under specialized operational oversight.'}
              </p>
            </div>
          </div>

          {/* Core Action Callouts */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
            {/* Book Now Action Trigger */}
            {isBooked?(
               <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all duration-200 cursor-pointer"
                >
                  Already Booked
                </button>
            ):(
                 <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="price" value={viewClass?.price ?? ''} />
              <input type="hidden" name="title" value={viewClass?.className ?? ''} />
              <input type="hidden" name="productId" value={viewClass?._id ?? ''} />
              <section className="w-full">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all duration-200 cursor-pointer"
                >
                  Book Session Now
                </button>
              </section>
            </form>
            )}
           


            {/* Add to Favorites Toggle */}

            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-3 rounded-xl border font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${isFavorite
                ? 'bg-rose-950/40 border-rose-800 text-rose-400 shadow-inner'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
            >
              <span>{isFavorite ? '❤️' : '🤍'}</span>
              <span className="sm:hidden lg:inline">
                {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
              </span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ViewDetails;